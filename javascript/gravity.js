async function drop(star_cluster) {
  // TODO: Turn of all button press logic (drop, rotate, move along corona, etc.)
  // disableGameplayButtons() //enableGameplayButtons()

  while(starClusterCanGravitateToCore(star_cluster, gravitation_direction)) {
    // Determine which direction the Star Cluster will gravitate
    // according to the center of gravity and the FLIP_FACTOR
    var center_of_gravity = getCenterOfGravity(star_cluster)
    var gravitation_direction = getGravitationDirection(center_of_gravity)
    gravitate(star_cluster, gravitation_direction)
    FLIP_FACTOR = FLIP_FACTOR == 0 ? 1 : 0
    await sleep(25)
  }

  // Reset
  FLIP_FACTOR = 0

  for(var i = 0; i < star_cluster.length; i++) {
    var star_in_order = orderCluster(star_cluster, i)
    star_in_order.parentNode.dataset["full"] = true
  }

  // Writing things like this because star clusters get popped off each time the class is deleted.
  for(var i = 0; i < 4; i++) {
    star_cluster[0].classList.add("main_cluster")
    star_cluster[0].classList.remove("floating_cluster")
  }

  processStarsAfterDrop()

  // ↓ Move the following to flare.js
  // End game if there are any stars in the Corona
  star_cluster_name = randomStarClusterType() // This variable is declared in index.html
  generateStarCluster(star_cluster_name)
}

function starClusterCanGravitateToCore(star_cluster_to_gravitate, direction) {
  var center_of_gravity = getCenterOfGravity(star_cluster_to_gravitate)
  if(onCore(center_of_gravity)) { console.log("On core, returning false"); return false }

  var map = [[direction, 1]]
  for (var i = 0; i < star_cluster_to_gravitate.length ; i++) {
    var star_in_order = orderCluster(star_cluster_to_gravitate, i)
    var star_to_gravitate_to = getHexagonToGravitateTowards(star_in_order)
    // var star_to_gravitate_to = getHexagonByMap(star_in_order, map)
    var can_gravitate = starCanGravitateToCore(star_in_order, star_to_gravitate_to)
    if(!can_gravitate) { return false }
  }
  return true
}

// TODO: A lot of this logic might not even work.
// Look over this again and see if it needs tweaking.
// To deal with this, I added the saveLastPosition and moveToLastPosition functions.
function starCanGravitateToCore(original_star, target_star) {
  if(target_star == undefined) { return false }
  if(target_star.dataset["full"] == "true" || target_star.querySelectorAll(".main_cluster").length > 0) {
    return false
  }
  if(target_star.querySelectorAll(".floating_cluster").length > 0) {
    return true
  }
  return true
}

// 🌠
function gravitate(star_cluster, direction = null) {
  var move_back = false // In case main_cluster shows up twice in a hexagon

  if(star_cluster != null && star_cluster.length == 4) {
    var map = [[direction, 1]]
    for (var i = 0; i < star_cluster.length; i++) {
      var star_in_order = orderCluster(star_cluster, i) // Shuffle bug
      saveLastPosition(star_in_order)
      var star_to_gravitate_to = getHexagonByMap(star_in_order, [[direction, 1]])

      star_to_gravitate_to.appendChild(star_in_order)

      // Move back to previous position if there's already a main_cluster in the star_to_gravitate_to
      if(star_to_gravitate_to.querySelectorAll(".main_cluster").length > 0) {
        move_back = true
      }
    }
  } else {
    // This is for individual stars in the inner Flare Star.
  }

  if(move_back) {
    console.log("moving back");
    for (var i = 0; i < star_cluster.length; i++) {
      var star_in_order = orderCluster(star_cluster, i)
      moveToLastPosition(star_in_order)
      // If this doesnt work, get main_cluster.length == 2 and move the second one back
    }
  }
}

// Shuffle Bug:
// When a star is appended after reaching the core, for some reason appendChild shuffles the star_cluster array.
// Check with console.log() before and after `star_to_gravitate_to.appendChild()` in gravitate() → (use star_cluster[i].dataset["value"]).
// This hook makes sure we're processing the array in order.
function orderCluster(cluster, counter) {
  for (var k = 0; k < cluster.length; k++) {
    var star_num = cluster[k].dataset["value"]
    var pattern = `hexagon_${counter + 1}`
    if(star_num.match(pattern)) {
      star_in_order = cluster[k]
    }
  }
  return star_in_order
}

function getHexagonToGravitateTowards(star, direction = null) {
  // If we have the direction, that means we already got the center of gravity.
  // TODO: Does this need to be an if statement? Do we need the logic there?
  if(direction) {
    var map = [[direction, 1]]
    return getHexagonByMap(star, map)
  } else {
    var star_parent_hexagon = star.parentNode
    var star_parent_hexagon_ring = parseInt(star_parent_hexagon.dataset["ring_level"])
    var star_parent_hexagon_value = parseInt(star_parent_hexagon.dataset["value"])
    var parent_ring_parent_level = star_parent_hexagon_ring - 1
    var parent_ring_parent_values = findParentRingParents(flare_star, star_parent_hexagon_ring, star_parent_hexagon_value)
    var parent_ring_parent_value = determineParentToGravitateTo(parent_ring_parent_values)
    return findElementFromData(parent_ring_parent_level, parent_ring_parent_value)
  }
}

// We only need this for star clusters, not individual stars
function getGravitationDirection(center_of_gravity) {
  var coe_hexagon = center_of_gravity.parentNode
  var coe_parent_hexagon = getHexagonToGravitateTowards(center_of_gravity)
  return calculateDirectionFromCoordinates(coe_hexagon, coe_parent_hexagon)
}

function calculateDirectionFromCoordinates(original_hexagon, target_hexagon) {
  var original_x = parseInt(original_hexagon.dataset["x"])
  var original_y = parseInt(original_hexagon.dataset["y"])
  var target_x = parseInt(target_hexagon.dataset["x"])
  var target_y = parseInt(target_hexagon.dataset["y"])

  // Not so bad!
  if(original_x < target_x && original_y == target_y) {
    return "right"
  } else if (original_x < target_x && original_y < target_y) {
    return "down_right"
  } else if (original_x > target_x && original_y < target_y) {
    return "down_left"
  } else if (original_x > target_x && original_y == target_y) {
    return "left"
  } else if (original_x > target_x && original_y > target_y) {
    return "up_left"
  } else if (original_x < target_x && original_y > target_y) {
    return "up_right"
  }
}

function getCenterOfGravity(star_cluster) {
  for(var star_num = 0; star_num < star_cluster.length; star_num++) {
    var star = star_cluster[star_num]
    if(star.dataset["center_of_gravity"] === "true") {
      return center_of_gravity = star
    }
  }
}

function onCore(star) {
  if(star.closest(".core") == null){
    return false
  } else {
    return true;
  }
}

function saveLastPosition(star_cluster_to_save) {
  star_cluster_to_save.dataset["last_x"] = star_cluster_to_save.parentNode.dataset["x"]
  star_cluster_to_save.dataset["last_y"] = star_cluster_to_save.parentNode.dataset["y"]
}

function moveToLastPosition(star_to_move_back) {
  var last_x = parseInt(star_to_move_back.dataset["last_x"])
  var last_y = parseInt(star_to_move_back.dataset["last_y"])
  var previous_hexagon = searchByCoordinates([last_x, last_y])
  previous_hexagon.appendChild(star_to_move_back)
}

// We might not even need this.
// What we can probably do is make a preview cluster from the original star cluster,
// and just drop/delete it every time the player moves or rotates the cluster and don't update the hexagons to data-full=true
// Then when they go to drop the actual star cluster, just delete the preview cluster altogether.
function calculateStarClusterDestination(star_cluster) {}

// https://code-paper.com/javascript/examples-sleep-1-second-javascript
// TODO: This can go somewhere else
function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}
