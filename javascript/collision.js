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

function starCanGravitateToCore(star) {
  var background_hexagon_to_gravitate_to = getHexagonToGravitateTowards(star)

  // TODO: We do this if the star is on the core.
  // There's probably a better way to handle this.
  if(background_hexagon_to_gravitate_to == undefined) { return false }

  var hex_x = background_hexagon_to_gravitate_to.dataset["x"]
  var hex_y = background_hexagon_to_gravitate_to.dataset["y"]
  var main_cluster = getAllElementsFromCoordinates(hex_x, hex_y, "main_cluster")
  return main_cluster.length == 0
}

function gravitatableStarExists() {
  var main_cluster_stars = document.getElementsByClassName("main_cluster")
  for (var i = 0; i < main_cluster_stars.length; i++) {
    if(starCanGravitateToCore(main_cluster_stars[i])) {
      return true
    }
  }
  return false
}
