function starClusterCanGravitateToCore(star_cluster_to_gravitate, direction) {
  var center_of_gravity = getCenterOfGravity(star_cluster_to_gravitate)

  for (var can_counter = 0; can_counter < star_cluster_to_gravitate.length; can_counter++) {
    var star_in_order = orderCluster(star_cluster_to_gravitate, can_counter)
    var star_to_gravitate_to = getHexagonByMap(star_in_order, [[direction, 1]])

    var target_hexagon_x = star_to_gravitate_to.dataset["x"]
    var target_hexagon_y = star_to_gravitate_to.dataset["y"]
    var stars_in_target = getAllElementsFromCoordinates(target_hexagon_x, target_hexagon_y)

    var main_cluster_stars = []
    for (var stl = 0; stl < stars_in_target.length; stl++) {
      if(stars_in_target[stl].classList.contains("main_cluster")) {
        main_cluster_stars.push(stars_in_target[stl])
      }
    }
    if(main_cluster_stars.length > 0) {
      return false
    }
  }
  return true
}

// TODO: This file might not be needed if we're not moving the cluster back.
function saveLastPosition(star_cluster_to_save, floating_cluster_star = false) {
  if(star_cluster_to_save.parentNode.classList.contains("hexagon")) {
    star_cluster_to_save.dataset["last_x"] = star_cluster_to_save.parentNode.dataset["x"]
    star_cluster_to_save.dataset["last_y"] = star_cluster_to_save.parentNode.dataset["y"]
  } else {
    star_cluster_to_save.dataset["last_x"] = star_cluster_to_save.dataset["x"]
    star_cluster_to_save.dataset["last_y"] = star_cluster_to_save.dataset["y"]
  }
}
