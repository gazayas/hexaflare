function applyHexagonDimensions(hexagon_class_name, color, options = {}) {
  var top_divs = document.querySelectorAll(`.${hexagon_class_name} .hexagon_top`)
  var center_divs = document.querySelectorAll(`.${hexagon_class_name} .hexagon_center`)
  var bottom_divs = document.querySelectorAll(`.${hexagon_class_name} .hexagon_bottom`)
  var invisible_style = HEX_INVISIBLE_BORDERS + "px solid transparent"

  for(var i = 0; i < top_divs.length; i++) {
    // Top triangle in hexagon
    top_divs[i].style.borderBottom = HEX_TOP_BOTTOM_BORDER_HEIGHT + "px solid " + color
    top_divs[i].style.borderLeft = invisible_style
    top_divs[i].style.borderRight = invisible_style

    // Body (square) in hexagon
    center_divs[i].style.height = HEX_CENTER_HEIGHT + "px"
    center_divs[i].style.width = HEX_CENTER_WIDTH + "px"
    center_divs[i].style.backgroundColor = color

    // Bottom triangle in hexagon
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

function searchByCoordinates(coordinates) {
  var flare_star_element = document.getElementsByClassName("flare_star")[0]
  return flare_star_element.querySelector(`.background_hexagon[data-x = '${coordinates[0]}'][data-y = '${coordinates[1]}']`)
}

function searchByRingLevelAndValue(ring_level, value) {
  var flare_star_element = document.getElementsByClassName("flare_star")[0]
  return flare_star_element.querySelector(`.background_hexagon[data-ring_level = '${ring_level}'][data-value = '${value}']`)
}

// TODO: Is this needed?
// We use this whenever there is a flare.
function updateHexagonFullData() {
  var background_hexagons = document.getElementsByClassName("background_hexagon")
  for (var i = 0; i < background_hexagons.length; i++) {
    var main_cluster_star = background_hexagons[i].querySelector(".main_cluster")
    background_hexagons[i].dataset["full"] = main_cluster_star != null
  }
}
