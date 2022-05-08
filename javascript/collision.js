// TODO: Change this to check if two HTML elements with the same coordinates exist
function collisionOccured(star) {
  var parent_hexagon_of_star = star.parentNode
  var number_of_stars_in_hexagon = parent_hexagon_of_star.querySelectorAll(".star").length
  if(number_of_stars_in_hexagon == 1) {
    return false
  } else if(number_of_stars_in_hexagon > 1) {
    return true
  }
}

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
  console.log("X, Y: " + last_x + "," + last_y);
  var previous_hexagon = searchByCoordinates([last_x, last_y])
  previous_hexagon.appendChild(star_to_move_back)
}
