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

// At this stage, we're only searching by coordinates in Corona
// We might need to do this in gravityPull as well,
// but for that we can potentially make an if statement to save on power
function searchByCoordinates(x, y, corona = true) {
  if(corona) {
    // Search with corona rings only
  } else {
    // Search flare star rings only
  }
}
