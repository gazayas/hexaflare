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
