function generateFlareStar(number_of_rings) {
  // Generate Core
  var core = 1
  var flare_star = [[core]]

  // The rings start from the second step
  // TODO: Change name of variable `level` to `depth`
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

// We should run this when pressing the start button.
function generateFlareStarUI(number_of_rings) {
  for(var ring = 1; ring <= number_of_rings; ring++) {
    var ring_div = document.createElement("div")
    ring_div.classList.add("ring")
    ring_div.style.position = "absolute"
    ring_div.dataset["level"] = ring
    var flare_star_div = document.getElementsByClassName("flare_star")[0]
    flare_star_div.appendChild(ring_div)

    for(var corner_hex_position = 1; corner_hex_position <= 6; corner_hex_position++){
      var value = getValue(ring, corner_hex_position)
      generateHexagon(ring_div, ring, value, corner_hex_position, "corner")
    }
  }

  // Get the last 4 rings to make the Corona
  var corona_indices = []
  for(var i = 0; i < number_of_rings; i++) { corona_indices[i] = i + 1 }
  for(i = 0; i < number_of_rings - 4; i++) { corona_indices.shift() }
  var flare_star_div = document.getElementsByClassName("flare_star")[0]
  var rings = flare_star_div.children
  var corona_rings = [
    rings[corona_indices[0]],
    rings[corona_indices[1]],
    rings[corona_indices[2]],
    rings[corona_indices[3]]
  ]

  // Apply corona class to all hexagons
  for(i = 0; i < corona_rings.length; i++) {
    corona_rings[i].classList.add("corona")

    // TODO: We may not need this
    // var corona_ring_hexagons = corona_rings[i].children
    // for(var j = 0; j < corona_ring_hexagons.length; j++) {
    //   corona_ring_hexagons[j].classList.add("corona")
    // }
  }

  // Generate the cursor at the first hexagon in the Corona.
  // It is not a hexagon itself, but refers to the hexagon it's nested inside.
  var first_corona_ring = document.getElementsByClassName("ring")[number_of_rings - 4]
  var cursor_div = document.createElement("div")
  cursor_div.classList.add("cursor")
  cursor_div.style.position = "absolute"
  cursor_div.dataset["corner_position"] = 1
  first_corona_ring.children[0].appendChild(cursor_div)
}

function generateHexagon(ring_div, ring, value, corner_hex_position, hexagon_type, current_side_number = 1, append_to = false) {
  var hex_div =  document.createElement("div")
  hex_div.classList.add("hexagon")
  hex_div.classList.add(hexagon_type)
  hex_div.style.position = "absolute"

  if(hexagon_type == "corner" || hexagon_type == "cursor") {
    hex_div.classList.add("background_hexagon")
    var new_dimensions = newCornerDimensions(corner_hex_position, ring)
  } else if (hexagon_type == "side") {
    hex_div.classList.add("background_hexagon")
    var new_dimensions = newSideDimensions(corner_hex_position, current_side_number, ring)
  } else if (hexagon_type == "star") {
    hex_div.classList.add("floating_cluster")
    // This should always be initialized with 1 because it refers to position_1 in its rotation pattern, aka the initialization_map
    hex_div.dataset["rotation_position"] = 1
    new_dimensions = [0, 0]
  }

  // Always relative to the core, whose x and y are always 0.
  hex_div.dataset["x"] = 0 + new_dimensions[0]
  hex_div.dataset["y"] = 0 + new_dimensions[1]

  // Add dataset values
  hex_div.dataset["ring_level"] = ring
  hex_div.dataset["value"] = value
  hex_div.style.left = hex_div.dataset["x"] + "px"
  hex_div.style.top = hex_div.dataset["y"] + "px"

  // Create hexagon parts
  var hexagon_top = document.createElement("div")
  var hexagon_center = document.createElement("div")
  var hexagon_bottom = document.createElement("div")
  hexagon_top.classList.add("hexagon_top")
  hexagon_center.classList.add("hexagon_center")
  hexagon_bottom.classList.add("hexagon_bottom")
  hex_div.appendChild(hexagon_top)
  hex_div.appendChild(hexagon_center)
  hex_div.appendChild(hexagon_bottom)

  if(append_to) {
    append_to.appendChild(hex_div)
  } else {
    ring_div.appendChild(hex_div)
  }

  // Generate the side hexagons for each corner
  if (hexagon_type == "corner") {
    var number_of_side_hexagons_under_parent_corner = ring - 1
    for(current_side_number; current_side_number <= number_of_side_hexagons_under_parent_corner; current_side_number++) {
      value = getValue(ring, corner_hex_position, current_side_number)
      generateHexagon(ring_div, ring, value, corner_hex_position, "side", current_side_number)
    }
  }
}

// TODO: This could use some refactoring. Refer to the calculations in cases 3 and 6 in newSideDimensions.
// Return new dimensions for creating the next corner.
function newCornerDimensions(corner_position, ring_level) {
  switch (corner_position) {
    case 1:
      return [ring_level * -(REAL_X), 0]
    case 2:
      return [ring_level * -(REAL_X / 2), ring_level * -(REAL_Y)]
    case 3:
      return [ring_level * (REAL_X / 2), ring_level * -(REAL_Y)]
    case 4:
      return [ring_level * REAL_X, 0]
    case 5:
      return [ring_level * (REAL_X / 2), ring_level * REAL_Y]
    case 6:
      return [ring_level * -(REAL_X / 2), ring_level * REAL_Y]
    default:
      break;
  }
}

function newSideDimensions(corner_position, current_side_number, ring_level) {
  switch(corner_position) {
    case 1:
      return [ring_level * -(REAL_X) + (REAL_X / 2 * current_side_number), -(REAL_Y) * current_side_number]
    case 2:
      return [(ring_level * -(REAL_X / 2)) + (REAL_X * current_side_number), ring_level * -(REAL_Y)]
    case 3:
      return [ring_level * (REAL_X / 2) + (REAL_X / 2 * current_side_number), ring_level * -(REAL_Y) + (REAL_Y * current_side_number)]
    case 4:
      return [ring_level * (REAL_X) + (-(REAL_X) / 2 * current_side_number), REAL_Y * current_side_number]
    case 5:
      return [(ring_level * REAL_X / 2) + (-(REAL_X) * current_side_number), ring_level * REAL_Y]
    case 6:
      return [ring_level * (-(REAL_X / 2)) - (REAL_X / 2 * current_side_number), ring_level * REAL_Y - (REAL_Y * current_side_number)]
    default:
      break;
  }
}

function numberOfRings(flare_star) {
  var core = 1
  return flare_star.length - core
}

// TODO: Double check this. Make simpler if needed.
// Gets value within Flare Star structure
function getValue(ring, corner_position, side_position = 0) {
  return (ring * (corner_position - 1)) + 1 + side_position;
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
