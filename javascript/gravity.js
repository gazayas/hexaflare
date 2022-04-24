function drop(star_cluster) {
  var center_of_gravity = getCenterOfGravity(star_cluster)
  var gravitation_direction = getGravitationDirection(center_of_gravity)

  // Test gravitate by calling it 3 or 4 times before putting it into the loop below.
  for (var j = 0; j < 4; j++) {
    for (var i = 0; i < star_cluster.length; i++) {
      gravitate(star_cluster[i], gravitation_direction)
    }
  }

  // The sleep function should probably go in here after each iteration of #gravitate.
  // while(starClusterCanGravitateToCore(star_cluster, direction)) {}

  // Even if the star cluster can't gravitiate to the core, either way we continue with dropping it.
  // Then we just remove the classes (i.e. - `floating_cluster`).

  // End game if there are any stars in the Corona.
  // We haven't generated a new star cluster yet, so the Corona should be empty at this point.
}

// Gravitate a star towards the core.
function gravitate(star, direction) {
  // Update FLIP_FACTOR here.
}

// We only need this for star clusters, not individual stars
function getGravitationDirection(center_of_gravity) {
  var coe_parent_hexagon = center_of_gravity.parentNode
  var coe_ring = parseInt(coe_parent_hexagon.dataset["ring_level"])
  var coe_value = parseInt(coe_parent_hexagon.dataset["value"])

  // In Hexaflare, we're only concerned with getting the parents from one level up.
  var parent_ring_level = coe_ring - 1
  var parent_ring_parent_values = findParentRingParents(flare_star, coe_ring, coe_value)

  // Only get one parent based on the flip factor
  // TODO: This could potentially go in flare_star.js
  if (parent_ring_parent_values.length == 2) {
    var parent_ring_parent_value = parent_ring_parent_values[FLIP_FACTOR]
  } else {
    var parent_ring_parent_value = parent_ring_parent_values[0]
  }
  var flare_star_parent_hexagon = findElementFromData(parent_ring_level, parent_ring_parent_value)

  return calculateDirectionFromCoordinates(coe_parent_hexagon, flare_star_parent_hexagon)
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

// TODO: Redo this?
// Is this needed?
function starClusterCanGravitateToCore(star_cluster, direction) {
  var center_of_gravity = getCenterOfGravity(star_cluster)
  if(onCore(center_of_gravity)) { return false }

  var can_gravitate = true
  for (var i = 0; i < star_cluster.length; i++) {
    // set can_gravitate to false if star_cluster[i] doesn't meet the requirements.
  }
  return can_gravitate
}

// TODO: Redo this?
// Is this needed?
function starCanGravitateToCore(star, direction) {
  var parent_hexagon = star.parentNode

  var ring_level = parseInt(parent_hexagon.dataset["ring_level"])
  var value = parseInt(parent_hexagon.dataset["value"])
  var parents_values = findParentRingParents(flare_star, ring_level, value)

  var parent_elements = []
  for (var i = 0; i < coe_parents_values.length; i++) {
    parent_elements.push(searchByRingLevelAndValue(ring_level - 1, parents_values[i]))
  }

  // If there are two parents, decide which one based on the flip factor

  // If the hexagon is a floating cluster,
  // if floating cluster, return true
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

// We might need to put the logic in #drop here instead.
function calculateStarClusterDestination(star_cluster) {}
