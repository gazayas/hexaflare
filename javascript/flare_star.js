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
  var core = document.getElementsByClassName("core")[0]
  var core_hexagon = core.querySelector(".hexagon")

  var x = core_hexagon.dataset["x"]
  var y = core_hexagon.dataset["y"]

  for(var ring = 1; ring <= number_of_rings; ring++) {
    var number_of_side_hexagons_under_parent_corner = ring - 1

    for(var corner_hex_position = 1; corner_hex_position <= 6; corner_hex_position++){
      // Create corner
      var corner_hex_div =  document.createElement("div")
      corner_hex_div.classList.add("hexagon")
      corner_hex_div.classList.add("corner")
      corner_hex_div.style.position = "absolute"

      // Add dataset values
      // data-ring-level
      // data-value
      // data-x
      // data-y

      // Create hexagon parts
      var hexagon_top = document.createElement("div")
      var hexagon_center = document.createElement("div")
      var hexagon_bottom = document.createElement("div")
      hexagon_top.classList.add("hexagon_top")
      hexagon_center.classList.add("hexagon_center")
      hexagon_bottom.classList.add("hexagon_bottom")

      var new_dimensions = newCornerDimensions(corner_hex_position, ring)
      corner_hex_div.dataset["x"] = parseInt(x) + new_dimensions[0]
      corner_hex_div.dataset["y"] = parseInt(y) + new_dimensions[1]
      corner_hex_div.style.left = corner_hex_div.dataset["x"] + "px"
      corner_hex_div.style.top = corner_hex_div.dataset["y"] + "px"

      corner_hex_div.appendChild(hexagon_top)
      corner_hex_div.appendChild(hexagon_center)
      corner_hex_div.appendChild(hexagon_bottom)

      // TODO: Should we be appending this to the core?
      // I want to append it to its own ring
      document.getElementsByClassName("core")[0].appendChild(corner_hex_div)

      var previous_hex_dimensions = [corner_hex_div.dataset["x"], corner_hex_div["y"]]

      // Create sides here before moving on to the new corner
      for(var current_side_number = 1; current_side_number <= number_of_side_hexagons_under_parent_corner; current_side_number++) {
        var side_hex_div =  document.createElement("div")
        side_hex_div.classList.add("hexagon")
        side_hex_div.classList.add("side")
        side_hex_div.style.position = "absolute"

        // Add dataset values
        // data-ring-level
        // data-value
        // data-x
        // data-y

        // Create hexagon parts
        var hexagon_top = document.createElement("div")
        var hexagon_center = document.createElement("div")
        var hexagon_bottom = document.createElement("div")
        hexagon_top.classList.add("hexagon_top")
        hexagon_center.classList.add("hexagon_center")
        hexagon_bottom.classList.add("hexagon_bottom")

        var new_side_dimensions = newSideDimensions(corner_hex_position, current_side_number, ring)
        side_hex_div.dataset["x"] = parseInt(x) + new_side_dimensions[0]
        side_hex_div.dataset["y"] = parseInt(y) + new_side_dimensions[1]
        side_hex_div.style.left = side_hex_div.dataset["x"] + "px"
        side_hex_div.style.top = side_hex_div.dataset["y"] + "px"

        side_hex_div.appendChild(hexagon_top)
        side_hex_div.appendChild(hexagon_center)
        side_hex_div.appendChild(hexagon_bottom)

        previous_hex_dimensions = [side_hex_div.dataset["x"], side_hex_div.dataset["y"]]

        // TODO: Append it to its own ring
        document.getElementsByClassName("core")[0].appendChild(side_hex_div)
      }
    }
  } // End of ring for loop
}

// It might BEHOOVE ME to write a function for calculating the pixels
// Return new dimensions for creating the next corner.
function newCornerDimensions(corner_position, ring_level) {
  switch (corner_position) {
    case 1:
      return [ring_level * -(HEX_CENTER_WIDTH + HEX_X_MARGIN), 0]
    case 2:
      return [ring_level * -((HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2), ring_level * -(HEX_TOTAL_HEIGHT - HEX_Y_MARGIN)]
    case 3:
      return [ring_level * ((HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2), ring_level * -(HEX_TOTAL_HEIGHT - HEX_Y_MARGIN)]
    case 4:
      return [ring_level * (HEX_CENTER_WIDTH + HEX_X_MARGIN), 0]
    case 5:
      return [ring_level * ((HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2), ring_level * (HEX_TOTAL_HEIGHT - HEX_Y_MARGIN)]
    case 6:
      return [ring_level * -((HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2), ring_level * (HEX_TOTAL_HEIGHT - HEX_Y_MARGIN)]
    default:
      break;
  }
}

function newSideDimensions(corner_position, current_side_number, ring_level) {
  console.log(ring_level);
  switch(corner_position) {
    case 1:
      return [ring_level * -(HEX_CENTER_WIDTH + HEX_X_MARGIN) + ((HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2 * current_side_number), -(HEX_TOTAL_HEIGHT - HEX_Y_MARGIN) * current_side_number]
    case 2:
      return [(ring_level * -((HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2)) + ((HEX_CENTER_WIDTH + HEX_X_MARGIN) * current_side_number), ring_level * -(HEX_TOTAL_HEIGHT - HEX_Y_MARGIN)]
    case 3:
      return [ring_level * (HEX_CENTER_WIDTH + HEX_X_MARGIN) + (-(HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2 * current_side_number), -(HEX_TOTAL_HEIGHT - HEX_Y_MARGIN) * current_side_number]
    case 4:
      return [ring_level * (HEX_CENTER_WIDTH + HEX_X_MARGIN) + (-(HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2 * current_side_number), (HEX_TOTAL_HEIGHT - HEX_Y_MARGIN) * current_side_number]
    case 5:
      return [(ring_level * (HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2) + (-(HEX_CENTER_WIDTH + HEX_X_MARGIN) * current_side_number), ring_level * (HEX_TOTAL_HEIGHT - HEX_Y_MARGIN)]
    case 6:
      return [ring_level * -(HEX_CENTER_WIDTH + HEX_X_MARGIN) + ((HEX_CENTER_WIDTH + HEX_X_MARGIN) / 2 * current_side_number), (HEX_TOTAL_HEIGHT - HEX_Y_MARGIN) * current_side_number]
    default:
      break;
  }
}


// TODO: Implement to clean up newCornerDimensions and newSideDimensions
function newX() {
    return HEX_CENTER_WIDTH + HEX_X_MARGIN
}

function newY() {
  return HEX_TOTAL_HEIGHT - HEX_Y_MARGIN
}

function numberOfRings(flare_star) {
  var core = 1
  return flare_star.length - core
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
