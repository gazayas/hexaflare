function generateFlareStar(number_of_rings) {
  // Generate Core
  var core = 1
  var flare_star = [[core]]

  // The rings start from the second step
  level = core + number_of_rings

  for(var i = 1; i < level; i++) {
    // Generate new ring
    var ring = []
    for(var value = 1; value <= i * 6; value++) {
      ring.push(value)
    }
    flare_star[i] = ring
  }
  return flare_star
}

// Ring Level * Corner Position + 1
function ringCorners(flare_star, ring_level) {
  var ring_corners = []
  var core = 1
  var ring = flare_star[core + ring_level]
  for (var i = 0; i < 6; i++) {
    ring_corners[i] = (ring_level * i + (1))
  }
  return ring_corners
}

function isCorner(flare_star, ring_level, value) {
  var ring = ringCorners(flare_star, ring_level)
  return ring.includes(value)
}

function findParentCornerInRing(flare_star, ring_level, value) {
  var ring_corners = ringCorners(flare_star, ring_level)

  for(var i = 0; i < 6; i++) {
    // If we've reached the last value in the loop, it has to be the last corner
    if(i == 5) {
      return ring_corners[i]
    } else {
      if(ring_corners[i] <= value && value < ring_corners[i + 1]) {
        return ring_corners[i]
      }
    }
  }
}

// Returns the position that the corner is in.
function cornerPosition(flare_star, ring_level, value) {
  var ring_corners = ringCorners(flare_star, ring_level)
  return ring_corners.indexOf(value)
}

// If corner: Value - Level Difference * Corner Position
// If side: TODO
function findParentRingParents(flare_star, ring_level, value) {
  // Only one value if the value is a corner.
  if(isCorner(flare_star, ring_level, value)) {
    var level_difference = 1 // We're only searching for the direct parent, so we just use 1.
    return value - level_difference * cornerPosition(flare_star, ring_level, value)
  } else {
    var level_difference = 1 // We're only searching for the direct parent, so we just use 1.
    var current_value_parent = findParentCornerInRing(flare_star, ring_level, value)
    var larger_parent = value - level_difference * cornerPosition(flare_star, ring_level, current_value_parent)
    var smaller_parent = larger_parent - 1

    // From here, all we need to do is search the parent ring to see if the new calculation has the value
    // If not, put in either the highest value of the ring, or the lowest value, respectively

    // Since we're finding hexagons, we should probably return them as hexagons
    // hexagon = {"ring": 2, "value": 4}, etc.
    return [smaller_parent, larger_parent]
  }
}
