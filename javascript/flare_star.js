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

// Returns a boolean
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

  // TODO: First check if the value is a corner.
  // If not, return null
  var ring_corners = ringCorners(flare_star, ring_level)
  return ring_corners.indexOf(value)
}

function ringLength(flare_star, ring_level) {
  return flare_star[ring_level].length
}

// Finding a corner parent: Value - Level Difference * Corner Position
// Finding side parents:
//    Right Parent: Value - (Level Difference * Parent Corner Position)
//    Left Parent:  Value - (Level Difference * Parent Corner Position) - 1
// level_difference here is 1 because, in Hexaflare,
// we are only concerned with finding the parent one level up.
function findParentRingParents(flare_star, ring_level, value) {
  var level_difference = 1

  if(isCorner(flare_star, ring_level, value)) {
    return [value - level_difference * cornerPosition(flare_star, ring_level, value)]
  } else {
    var current_value_parent = findParentCornerInRing(flare_star, ring_level, value)
    var right_parent = value - level_difference * cornerPosition(flare_star, ring_level, current_value_parent)
    var left_parent = right_parent - 1

    // At the end of a ring, the hexagon's parent on the right is the first initial corner,
    // so we loop the back to the beginning of the array (which in this case will always be one).
    var parent_ring_length = ringLength(flare_star, ring_level - 1)
    if(right_parent > parent_ring_length) {
      right_parent -= parent_ring_length
    }

    return [left_parent, right_parent] // TODO: hexagon = {"ring": 2, "value": 4}
  }
}
