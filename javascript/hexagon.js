function applyHexagonDimensions() {
  var top_divs = document.getElementsByClassName("hexagon_top")
  var center_divs = document.getElementsByClassName("hexagon_center")
  var bottom_divs = document.getElementsByClassName("hexagon_bottom")

  var invisible_style = HEX_INVISIBLE_BORDERS + "px solid transparent"

  for(var i = 0; i < top_divs.length; i++) {
    top_divs[i].style.borderBottom = HEX_TOP_BOTTOM_BORDER_HEIGHT + "px solid " + HEX_COLOR
    top_divs[i].style.borderLeft = invisible_style
    top_divs[i].style.borderRight = invisible_style

    center_divs[i].style.height = HEX_CENTER_HEIGHT + "px"
    center_divs[i].style.width = HEX_CENTER_WIDTH + "px"
    center_divs[i].style.backgroundColor = HEX_COLOR

    bottom_divs[i].style.borderTop = HEX_TOP_BOTTOM_BORDER_HEIGHT + "px solid " + HEX_COLOR
    bottom_divs[i].style.borderLeft = invisible_style
    bottom_divs[i].style.borderRight = invisible_style
  }
}

// Example:
// var hexagon_map = [
//   ["left", 2],
//   ["down_left", 1]
// ]
//
// We calculate the x and y for each direction one hexagon at a time.
// So the example here means move 2 hexagons left, and 1 hexagon down left.
// That's where we'll put the hexagon next.
function generateStarsfromData(star_cluster_data, reference_div) {
  var cursor_hexagon = reference_div.parentNode

  // Cycle through all the hexagons
  for(var i = 1; i <= Object.keys(star_cluster_data).length; i++) {
    // Get the coordinates from the map
    var coordinates = getCoordinatesByMap(star_cluster_data[`hexagon_${i}`]["initialization_map"], cursor_hexagon)

    // Search the hexagon by the coordinates that the map returns
    var hexagon_div = searchByCoordinates(coordinates, false)

    // Call generateHexagon => append_to is the hexagon found with the coordinates
    generateHexagon(null, null, null, null, "star", 1, hexagon_div)
  }

  var floating_cluster = document.getElementsByClassName("floating_cluster")

  // Apply background
  // TODO: applyHexagonDimensions() needs to be refactored: applyHexagonDimensions(hexagons, color, opacity)
  var invisible_style = HEX_INVISIBLE_BORDERS + "px solid transparent"
  for (var i = 0; i < floating_cluster.length; i++) {
    // Get floating cluster hexagon parts
    console.log(floating_cluster[i].querySelector(".hexagon_top"))
    floating_cluster[i].querySelector(".hexagon_top").style.borderBottom = HEX_TOP_BOTTOM_BORDER_HEIGHT + "px solid " + "navy"
    floating_cluster[i].querySelector(".hexagon_top").style.borderLeft = invisible_style
    floating_cluster[i].querySelector(".hexagon_top").style.borderRight = invisible_style
    floating_cluster[i].querySelector(".hexagon_top").style.opacity = 1

    floating_cluster[i].querySelector(".hexagon_center").style.height = HEX_CENTER_HEIGHT + "px"
    floating_cluster[i].querySelector(".hexagon_center").style.width = HEX_CENTER_WIDTH + "px"
    floating_cluster[i].querySelector(".hexagon_center").style.backgroundColor = "navy"
    floating_cluster[i].querySelector(".hexagon_center").style.opacity = 1

    floating_cluster[i].querySelector(".hexagon_bottom").style.borderTop = HEX_TOP_BOTTOM_BORDER_HEIGHT + "px solid " + "navy"
    floating_cluster[i].querySelector(".hexagon_bottom").style.borderLeft = invisible_style
    floating_cluster[i].querySelector(".hexagon_bottom").style.borderRight = invisible_style
    floating_cluster[i].querySelector(".hexagon_bottom").style.opacity = 1
  }
}

function getCoordinatesByMap(hexagon_map, reference_div) {
  var new_x = parseInt(reference_div.dataset["x"])
  var new_y = parseInt(reference_div.dataset["y"])

  if(hexagon_map[0] == null) {
    return [new_x, new_y]
  }

  for(var i = 0; i < hexagon_map.length; i++) {
    switch (hexagon_map[i][0]) {
      case "left":
        new_x += -(REAL_X) * hexagon_map[i][1]
        break;
      case "up_left":
        new_x += -(REAL_X / 2) * hexagon_map[i][1]
        new_y += -(REAL_Y) * hexagon_map[i][1]
        break;
      case "up_right":
        new_x += (REAL_X / 2) * hexagon_map[i][1]
        new_y += -(REAL_Y) * hexagon_map[i][1]
        break;
      case "right":
        new_x += REAL_X * hexagon_map[i][1]
        break;
      case "down_right":
        new_x += (REAL_X / 2) * hexagon_map[i][1]
        new_y += REAL_Y * hexagon_map[i][1]
        break;
      case "down_left":
        new_x += -(REAL_X) / 2 * hexagon_map[i][1]
        new_y += REAL_Y * hexagon_map[i][1]
        break;
      default:
    }

    return [new_x, new_y]
  }
}

// At this stage, we're only searching by coordinates in Corona
// We might need to do this in gravityPull as well,
// but for that we can potentially make an if statement to save on power
function searchByCoordinates(coordinates, corona = true) {
  if(corona) {
    // Search with corona rings only
  } else {
    var background_hexagon_div = null
    var background_hexagons = document.getElementsByClassName("background_hexagon")
    for (var i = 0; i < background_hexagons.length; i++) {
      if(parseInt(background_hexagons[i].dataset["x"]) == coordinates[0] &&
         parseInt(background_hexagons[i].dataset["y"]) == coordinates[1]) {
        return background_hexagons[i]
      }
    }
  }
}
