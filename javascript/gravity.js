// TODO: There's a lot of async stuff going on here.
// Only keep what's necessary and delete the rest.

async function drop(star_cluster) {
  // TODO: Turn off all button press logic (drop, rotate, move along corona, etc.)
  // disableGameplayButtons() enableGameplayButtons()
  var center_of_gravity = getCenterOfGravity(star_cluster)
  var gravitation_direction = getGravitationDirection(center_of_gravity)
  var flare_star_html = document.getElementsByClassName("flare_star")[0]

  // Save position and detach from background hexagons.
  for (var i = 0; i < star_cluster.length; i++) {
    var star_in_order = orderCluster(star_cluster, i)
    saveLastPosition(star_in_order)
    star_in_order.dataset["x"] = star_in_order.parentNode.dataset["x"]
    star_in_order.dataset["y"] = star_in_order.parentNode.dataset["y"]
    flare_star_html.appendChild(star_in_order)
  }

  while(starClusterCanGravitateToCore(star_cluster, gravitation_direction)) {
    var center_of_gravity = getCenterOfGravity(star_cluster)
    var gravitation_direction = getGravitationDirection(center_of_gravity)
    await gravitateCluster(star_cluster, gravitation_direction)
  }

  // TODO: Might not need this anymore.
  //moveBackCluster(star_cluster)
  //moveBackCluster(star_cluster)

  // Reset
  FLIP_FACTOR = 0

  for(var i = 0; i < 4; i++) {
    star_cluster[0].classList.add("main_cluster")
    star_cluster[0].classList.remove("floating_cluster")
  }

  // processStarsAfterDrop()

  // ↓ Move the following to flare.js
  // End game if there are any stars in the Corona
  star_cluster_name = randomStarClusterType() // This variable is declared in index.html
  generateStarCluster(star_cluster_name)
}

async function gravitateCluster(star_cluster, gravitation_direction) {
  for (var i = 0; i < 4; i++) {
    var star_in_order = orderCluster(star_cluster, i)
    gravitate(star_in_order, gravitation_direction)
  }
  FLIP_FACTOR = FLIP_FACTOR == 0 ? 1 : 0
  await sleep(25)
}

// TODO: this shouldn't be here in the first place.
function moveBackCluster(star_cluster) {
  // Double check the position just in case
  var move_back = false
  for (var i = 0; i < star_cluster.length; i++) {
    var star_in_order = orderCluster(star_cluster, i)
    var hexagons_to_check = getAllElementsFromCoordinates(star_in_order.dataset["x"], star_in_order.dataset["y"], "main_cluster")
    if(hexagons_to_check.length > 0) {
      console.log("Too many");
      console.log(hexagons_to_check);
      move_back = true
    }
  }

  if(move_back) {
    for (var i = 0; i < star_cluster.length; i++) {
      console.log("Moving back.");
      var star_in_order = orderCluster(star_cluster, i)
      moveToLastPosition(star_in_order)
    }
  }
}

// 🌠
async function gravitate(star, direction = null) {
  if(direction == null) { direction = getGravitationDirection(star) }
  var map = [[direction, 1]]
  star.dataset["last_x"] = star.dataset["x"]
  star.dataset["last_y"] = star.dataset["y"]
  var star_x = parseInt(star.dataset["x"])
  var star_y = parseInt(star.dataset["y"])

  var new_position = getCoordinatesByMap(map, null, star_x, star_y)
  var new_x = new_position[0]
  var new_y = new_position[1]
  star.style.left = `${new_x}px`
  star.style.top = `${new_y}px`
  star.dataset["x"] = new_x
  star.dataset["y"] = new_y

  var parent_hexagon = getBackgroundHexagonFromStar(star)
  star.dataset["ring_level"] = parent_hexagon.dataset["ring_level"]
  star.dataset["ring_value"] = parent_hexagon.dataset["value"]
}

function starClusterCanGravitateToCore(star_cluster_to_gravitate, direction) {
  var center_of_gravity = getCenterOfGravity(star_cluster_to_gravitate)
  if(onCore(center_of_gravity)) { console.log("On core, returning false"); return false }

  for (var i = 0; i < star_cluster_to_gravitate.length; i++) {
    var star_in_order = orderCluster(star_cluster_to_gravitate, i)
    // We have to get the hexagon differently if the star to gravitate is on the core.
    if(onCore(star_in_order)) {
      var star_to_gravitate_to = getHexagonByMap(star_in_order, [[direction, 1]])
    } else {
      var star_to_gravitate_to = getHexagonToGravitateTowards(star_in_order)
    }

    var target_hexagon_x = star_to_gravitate_to.dataset["x"]
    var target_hexagon_y = star_to_gravitate_to.dataset["y"]
    var stars_in_target = getAllElementsFromCoordinates(target_hexagon_x, target_hexagon_y)
    var main_cluster_stars = []
    for (var stl = 0; stl < stars_in_target.length; stl++) {
      if(stars_in_target[stl].classList.contains("main_cluster")) {
        main_cluster_stars.push(stars_in_target[stl])
      }
    }

    if(main_cluster_stars.length > 0) {
      return false
    }
  }
  return true
}

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

// Determine which direction the Star Cluster will gravitate
// according to the center of gravity and the FLIP_FACTOR
function getHexagonToGravitateTowards(star, direction = null) {
  if(direction) {
    var map = [[direction, 1]]
    return getHexagonByMap(star, map)
  } else {
    var star_parent_hexagon = directChildOfFlareStar(star) ? getBackgroundHexagonFromStar(star) : star.parentNode
    var star_parent_hexagon_ring = parseInt(star_parent_hexagon.dataset["ring_level"])
    var star_parent_hexagon_value = parseInt(star_parent_hexagon.dataset["value"])

    // This turns into -1 when on the core.
    // For that reason, we skip getHexagonToGravitateTowards
    // earlier on in starClusterCanGravitateToCore.
    var parent_ring_parent_level = star_parent_hexagon_ring - 1
    var parent_ring_parent_values = findParentRingParents(flare_star, star_parent_hexagon_ring, star_parent_hexagon_value)
    var parent_ring_parent_value = determineParentToGravitateTo(parent_ring_parent_values)
    return findElementFromData(parent_ring_parent_level, parent_ring_parent_value)
  }
}

function getGravitationDirection(center_of_gravity) {
  if(directChildOfFlareStar(center_of_gravity)) {
    var coe_hexagon = getBackgroundHexagonFromStar(center_of_gravity)
  } else {
    var coe_hexagon = center_of_gravity.parentNode
  }
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
      return star
    }
  }
}

function onCore(star) {
  if(star.dataset["x"] == "0" && star.dataset["y"] == "0") {
    return true
  } else {
    return false
  }
}

function directChildOfFlareStar(star) {
  return star.parentNode.classList.contains("flare_star")
}

function getBackgroundHexagonFromStar(star) {
  var x = star.dataset["x"]
  var y = star.dataset["y"]
  var elements = flare_star_ui.querySelectorAll(`[data-x = '${x}'][data-y = '${y}']`);
  for (var i = 0; i < elements.length; i++) {
    if(elements[i].classList.contains("background_hexagon")) {
      return elements[i]
    }
  }
}
