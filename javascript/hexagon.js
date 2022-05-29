function applyHexagonDimensions(hexagon, color, options = {}) {
  var top_divs = hexagon.getElementsByClassName("hexagon_top")
  var center_divs = hexagon.getElementsByClassName("hexagon_center")
  var bottom_divs = hexagon.getElementsByClassName("hexagon_bottom")
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

    if(options["inner_flare_star_hexagon_opacity"]) {
      if(parseInt(hexagon.dataset["ring_level"]) % 2 == 0) {
        top_divs[i].style.opacity = options["inner_flare_star_hexagon_opacity"]
        center_divs[i].style.opacity = options["inner_flare_star_hexagon_opacity"]
        bottom_divs[i].style.opacity = options["inner_flare_star_hexagon_opacity"]
      } else {
        var dim_opacity_factor = 1.5
        top_divs[i].style.opacity = options["inner_flare_star_hexagon_opacity"] / dim_opacity_factor
        center_divs[i].style.opacity = options["inner_flare_star_hexagon_opacity"] / dim_opacity_factor
        bottom_divs[i].style.opacity = options["inner_flare_star_hexagon_opacity"] / dim_opacity_factor
      }
    }

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
