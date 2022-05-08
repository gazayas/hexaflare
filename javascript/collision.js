function saveLastPosition(star_cluster_to_save, floating_cluster_star = false) {
  if(star_cluster_to_save.parentNode.classList.contains("hexagon")) {
    star_cluster_to_save.dataset["last_x"] = star_cluster_to_save.parentNode.dataset["x"]
    star_cluster_to_save.dataset["last_y"] = star_cluster_to_save.parentNode.dataset["y"]
  } else {
    star_cluster_to_save.dataset["last_x"] = star_cluster_to_save.dataset["x"]
    star_cluster_to_save.dataset["last_y"] = star_cluster_to_save.dataset["y"]
  }
}

function moveToLastPosition(star_to_move_back, floating_cluster_star = false) {
  var last_x = parseInt(star_to_move_back.dataset["last_x"])
  var last_y = parseInt(star_to_move_back.dataset["last_y"])
  star_to_move_back.style.left = last_x + "px"
  star_to_move_back.style.top = last_y + "px"
  star_to_move_back.dataset["x"] = last_x + "px"
  star_to_move_back.dataset["y"] = last_y + "px"
}
