async function drop(star_cluster, preview_cluster_option = false) {
  keys_enabled = false
  if(!preview_cluster_option) {
    UPDATE_TIMER = false
  }

  if(!GAME_OVER) {
    // Detach cluster from background hexagons and register initial coordinates.
    // TODO: Refactor this to get the element by the `event`
    var flare_star_html = document.getElementsByClassName("flare_star")[0]
    for (var i = 0; i < star_cluster.length; i++) {
      var star_in_order = orderCluster(star_cluster, i)
      star_in_order.dataset["x"] = star_in_order.parentNode.dataset["x"]
      star_in_order.dataset["y"] = star_in_order.parentNode.dataset["y"]
      flare_star_html.appendChild(star_in_order)
    }

    var center_of_gravity = getCenterOfGravity(star_cluster)
    var gravitation_direction = getGravitationDirection(center_of_gravity)

    // Check initially if we can drop it, and then proceed to gravitate in a loop if so.
    if(starClusterCanGravitateToCore(star_cluster, gravitation_direction)) {
      do {
        // TODO: Refactor to only gravitateCluster(star_cluster, gravitation_direction, preview_cluster_option)
        if(preview_cluster_option) {
          await gravitateCluster(star_cluster, gravitation_direction, preview_cluster_option)
        } else {
          await gravitateCluster(star_cluster, gravitation_direction)
        }

        // Update hexagon full data.
        if(!preview_cluster_option) {
          for (var star_count = 0; star_count < star_cluster.length; star_count++) {
            var ordered_star = orderCluster(star_cluster, star_count)
            emptyPreviousBackgroundHexagon(ordered_star)
          }

          for (var star_count = 0; star_count < star_cluster.length; star_count++) {
            var ordered_star = orderCluster(star_cluster, star_count)
            fillBackgroundHexagon(ordered_star)
          }
        }

        gravitation_direction = getGravitationDirection(center_of_gravity)
      } while(gravitation_direction != null && starClusterCanGravitateToCore(star_cluster, gravitation_direction))

      // Reset
      FLIP_FACTOR = 0

      if(!preview_cluster_option) {
        for(var i = 0; i < 4; i++) {
          star_cluster[0].classList.add("main_cluster")
          star_cluster[0].classList.remove("floating_cluster")
        }
      }
    } else {
      result = true
    }
  }

  // 💫🔥
  if(result != true) { var result = await processStarsAfterDrop(preview_cluster_option) }

  if(result == true && !preview_cluster_option) {
    GAME_OVER = true

    // Make sure the last floating cluster stays in place.
    for (var i = 0; i < floating_cluster.length; i++) {
      var star_in_order = orderCluster(floating_cluster, i)
      star_in_order.style.left = star_in_order.dataset["x"] + "px"
      star_in_order.style.top = star_in_order.dataset["y"] + "px"
    }

    alert("Game Over.\nRefresh the page to play again.")
    keys_enabled = false
  } else if(!preview_cluster_option) {
    var current_score = result["current_score"]
    var tallied_score = result["tallied_score"]

    // TODO: Do an animation when changing the score.
    PLAYER_SCORE += tallied_score
    document.getElementById("score").innerHTML = PLAYER_SCORE

    star_cluster_name = randomStarClusterType()
    generateStarCluster(star_cluster_name)
    generatePreviewStarCluster(floating_cluster)
    var preview_cluster = document.getElementsByClassName("preview_cluster")
    drop(preview_cluster, true)
  }
  if(!GAME_OVER) { keys_enabled = true }
}


async function gravitateCluster(star_cluster, gravitation_direction, preview_cluster_option = false) {
  for (var i = 0; i < 4; i++) {
    var star_in_order = orderCluster(star_cluster, i)
    gravitate(star_in_order, gravitation_direction, preview_cluster_option)
  }
  FLIP_FACTOR = FLIP_FACTOR == 0 ? 1 : 0
  if(!preview_cluster_option) {
    await sleep(25)
  }
}

// 🌠
function gravitate(star, direction = null, preview_cluster_option = false) {
  if(!GAME_OVER) {
    var current_background_hexagon = getBackgroundHexagonFromStar(star)

    if(!preview_cluster_option) {
      star.dataset["previous_x"] = current_background_hexagon.dataset["x"]
      star.dataset["previous_y"] = current_background_hexagon.dataset["y"]
    }

    if(direction == null) { direction = getGravitationDirection(star) }
    var map = [[direction, 1]]
    var new_position = getCoordinatesByMap(map, star)
    var new_x = new_position[0]
    var new_y = new_position[1]
    star.style.left = `${new_x}px`
    star.style.top = `${new_y}px`
    star.dataset["x"] = new_x
    star.dataset["y"] = new_y

    var parent_hexagon = getBackgroundHexagonFromStar(star)
    star.dataset["ring_level"] = parent_hexagon.dataset["ring_level"]
    star.dataset["ring_value"] = parent_hexagon.dataset["value"]
  }
}

function getCenterOfGravity(star_cluster) {
  for(var star_num = 0; star_num < star_cluster.length; star_num++) {
    var star = star_cluster[star_num]
    if(star.dataset["center_of_gravity"] === "true") {
      return star
    }
  }
}

function getGravitationDirection(center_of_gravity) {
  // if(center_of_gravity == undefined) { return null }
  var coe_hexagon = directChildOfFlareStar(center_of_gravity) ? getBackgroundHexagonFromStar(center_of_gravity) : center_of_gravity.parentNode
  if(onCore(center_of_gravity)) {
    return null
  } else {
    var coe_parent_hexagon = getHexagonToGravitateTowards(center_of_gravity)
    // if(coe_parent_hexagon == null) { return null }
    return calculateDirectionFromCoordinates(coe_hexagon, coe_parent_hexagon)
  }
}

function getHexagonToGravitateTowards(star, direction = null) {
  // If the direction is null, the star is either the center of gravity of
  // a star cluster, or an individual star from the main cluster.
  if(!direction) {
    if(star.classList.contains("preview_cluster")) {
      var star_parent_hexagon = getBackgroundHexagonFromStar(star)
    } else {
      var star_parent_hexagon = directChildOfFlareStar(star) ? getBackgroundHexagonFromStar(star) : star.parentNode
    }

    // TODO: Is this needed?
    // if(star_parent_hexagon == undefined) { return null }

    var star_parent_hexagon_ring = parseInt(star_parent_hexagon.dataset["ring_level"])
    var star_parent_hexagon_value = parseInt(star_parent_hexagon.dataset["value"])

    // We don't have to worry about this ever becoming -1 because we check if
    // the center of gravity is on the core in another portion of the code.
    var parent_ring_parent_level = star_parent_hexagon_ring - 1

    var parent_ring_parent_values = findParentRingParents(flare_star, star_parent_hexagon_ring, star_parent_hexagon_value)
    var parent_ring_parent_value = determineParentToGravitateTo(parent_ring_parent_values)
    return findElementFromData(parent_ring_parent_level, parent_ring_parent_value)
  } else {
    var map = [[direction, 1]]
    return getHexagonByMap(star, map)
  }
}

function onCore(star) {
  return star.dataset["x"] == "0" && star.dataset["y"] == "0"
}

function getBackgroundHexagonFromStar(star) {
  var x = star.dataset["x"]
  var y = star.dataset["y"]

  var elements = flare_star_ui.querySelectorAll(`[data-x = '${x}'][data-y = '${y}']`)
  for (var elements_counter = 0; elements_counter < elements.length; elements_counter++) {
    if(elements[elements_counter].classList.contains("background_hexagon")) {
      return elements[elements_counter]
    }
  }
}

function directChildOfFlareStar(star) {
  // TODO: Are these undefined checks needed?
  // if(star == undefined) { return undefined }
  // if(star.parentNode == undefined) { return undefined }

  return star.parentNode.classList.contains("flare_star")
}

function emptyPreviousBackgroundHexagon(star_to_update) {
  var previous_x = parseInt(star_to_update.dataset["previous_x"])
  var previous_y = parseInt(star_to_update.dataset["previous_y"])

  // TODO: This should be fine, but it would be better to
  // pass "background_hexagon" to make sure that's what we're getting.
  // The function already accepts a class name as a third argument.
  var previous_hexagon = getAllElementsFromCoordinates(previous_x, previous_y)[0]
  previous_hexagon.dataset["full"] = false
}

function fillBackgroundHexagon(star_to_update) {
  var current_hexagon = getBackgroundHexagonFromStar(star_to_update)
  current_hexagon.dataset["full"] = true
}

// Shuffle Bug
function orderCluster(cluster, counter) {
  for (var k = 0; k < cluster.length; k++) {
    var star_num = cluster[k].dataset["value"]
    var pattern = `hexagon_${counter + 1}`
    if(star_num.match(pattern)) {
      star_in_order = cluster[k]
    }
  }
  return star_in_order
}
