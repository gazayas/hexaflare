function applyHexagonDimensions(hexagon_class_name, color, options = {}) {
  var top_divs = document.querySelectorAll(`.${hexagon_class_name} .hexagon_top`)
  var center_divs = document.querySelectorAll(`.${hexagon_class_name} .hexagon_center`)
  var bottom_divs = document.querySelectorAll(`.${hexagon_class_name} .hexagon_bottom`)
  var invisible_style = HEX_INVISIBLE_BORDERS + "px solid transparent"

  for(var i = 0; i < top_divs.length; i++) {
    top_divs[i].style.borderBottom = HEX_TOP_BOTTOM_BORDER_HEIGHT + "px solid " + color
    top_divs[i].style.borderLeft = invisible_style
    top_divs[i].style.borderRight = invisible_style

    center_divs[i].style.height = HEX_CENTER_HEIGHT + "px"
    center_divs[i].style.width = HEX_CENTER_WIDTH + "px"
    center_divs[i].style.backgroundColor = color

    bottom_divs[i].style.borderTop = HEX_TOP_BOTTOM_BORDER_HEIGHT + "px solid " + color
    bottom_divs[i].style.borderLeft = invisible_style
    bottom_divs[i].style.borderRight = invisible_style

    if(options["opacity"]) {
      top_divs[i].style.opacity = options["opacity"]
      center_divs[i].style.opacity = options["opacity"]
      bottom_divs[i].style.opacity = options["opacity"]
    }
  }
}

function getCoordinatesByMap(hexagon_map, reference_div, x = null, y = null) {
  if(x != null) {
    var new_x = x
    var new_y = y
  } else {
    var new_x = parseInt(reference_div.dataset["x"])
    var new_y = parseInt(reference_div.dataset["y"])
  }

  if(hexagon_map[0] == null) { return [new_x, new_y] }

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
  }
  return [new_x, new_y]
}

function getHexagonByMap(star_cluster_star, map) {
  if(star_cluster_star.parentNode.classList.contains("hexagon")) {
    var new_star_coordinates = getCoordinatesByMap(map, star_cluster_star.parentNode)
  } else {
    var new_star_coordinates = getCoordinatesByMap(map, star_cluster_star)
  }
  return searchByCoordinates(new_star_coordinates)
}

// TODO: Use the corona hook
function searchByCoordinates(coordinates, corona = true) {
  var background_hexagon_div = null
  var background_hexagons = document.getElementsByClassName("background_hexagon")
  for (var i = 0; i < background_hexagons.length; i++) {
    if(parseInt(background_hexagons[i].dataset["x"]) == coordinates[0] &&
       parseInt(background_hexagons[i].dataset["y"]) == coordinates[1]) {
      return background_hexagons[i]
    }
  }
}

function searchByRingLevelAndValue(ring_level, value) {
  var background_hexagons = document.getElementsByClassName("background_hexagon")
  for (var i = 0; i < background_hexagons.length; i++) {
    if(parseInt(background_hexagons[i].dataset["ring_level"]) == ring_level &&
       parseInt(background_hexagons[i].dataset["value"]) == value) {
      return background_hexagons[i]
    }
  }
}

// We use this whenever there is a flare.
//
function updateHexagonFullData() {
  var background_hexagons = document.getElementsByClassName("background_hexagon")
  for (var i = 0; i < background_hexagons.length; i++) {
    var main_cluster_star = background_hexagons[i].querySelector(".main_cluster")
    background_hexagons[i].dataset["full"] = main_cluster_star != null
  }
}
