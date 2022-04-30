async function drop(star_cluster) {
  // TODO: Turn of all button press logic (drop, rotate, move along corona, etc.)
  // Set all button press codes to 0?
  // disableGameplayButtons() //enableGameplayButtons()

  // 🌠
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

  for(var i = 0; i < star_cluster.length; i++) { star_cluster[i].parentNode.dataset["full"] = true }

  // Writing things like this because star clusters get popped off each time the class is deleted.
  for(var i = 0; i < 4; i++) {
    star_cluster[0].classList.add("main_cluster")
    star_cluster[0].classList.remove("floating_cluster")
  }

  processStarsAfterDrop()

  // ↓ Move the following to flare.js
  // End game if there are any stars in the Corona
  star_cluster_name = randomStarClusterType() // This variable is declared in index.html
  console.log(generateStarCluster(star_cluster_name));
}

function starClusterCanGravitateToCore(star_cluster, direction) {
  var center_of_gravity = getCenterOfGravity(star_cluster)
  if(onCore(center_of_gravity)) { console.log("On core, returning false"); return false }

  var map = [[direction, 1]]
  for (var i = 0; i < star_cluster.length ; i++) {
    // var star_to_gravitate_to = getHexagonByMap(star_cluster[i].parentNode, map)
    // var can_gravitate = starCanGravitateToCore(star_cluster[i], star_to_gravitate_to)
    // if(!can_gravitate) { return false }
  }
  return true
}

function starCanGravitateToCore(original_star, target_star) {
  // if the hexagon's dataset["full"] is true, check if its a floating cluster
  //   if one of its classes is floating cluster, were still good
  //   else, return false
}

// Gravitate a star towards the core 🌠
function gravitate(star_cluster, direction = null) {
  if(star_cluster != null && star_cluster.length == 4) {
    var map = [[direction, 1]]
    for (var i = 0; i < star_cluster.length; i++) {
      // Shuffle bug
      var star_in_order = orderCluster(star_cluster, i)


      var star_to_gravitate_to = getHexagonByMap(star_in_order, [[direction, 1]])
      star_to_gravitate_to.appendChild(star_in_order)
    }
  } else {
    // This is for individual stars in the inner Flare Star.
    // You probably don't have to think about this too much.
    // Just check the collision, append until there IS a collision,
    // And make sure the animation for each iteration happens ALL AT ONCE.
    // The animation for each time it goes down a RING is the same as a star cluster.

    // Get parent according to FLIP_FACTOR.
    // Append.
  }
  // Update FLIP_FACTOR here.
}

// Shuffle Bug:
// When a star is appended after reaching the core, for some reason appendChild shuffles the star_cluster array.
// Check with console.log() before and after `star_to_gravitate_to.appendChild()` below (use star_cluster[i].dataset["value"]).
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
