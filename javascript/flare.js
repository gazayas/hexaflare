async function processStarsAfterDrop(preview_cluster_option = false) {
  var flare_star_rings = document.getElementsByClassName("inner_flare_star_ring")

  var flare_combo = 0
  var current_flare_count = 0

  // We don't want the preview cluster to be visible while we're doing flares, so we delete them here.
  if(!preview_cluster_option) {
    var preview_cluster_divs = document.getElementsByClassName("preview_cluster")
    if(preview_cluster_divs.length > 0) {
      for (var i = 0; i < 4; i++) {
        preview_cluster_divs[0].remove()
      }
    }
  }

  while(fullRingExists(flare_star_rings)) {

    // Flare 💫🔥
    for (var i = 0; i < flare_star_rings.length; i++) {
      if(ringIsFull(flare_star_rings[i])){
        flare(flare_star_rings[i])

        current_flare_count += 1
        TOTAL_FLARE_COUNT += 1

        // Level up here.
        if(TOTAL_FLARE_COUNT >= 12 && TOTAL_FLARE_COUNT % 12 == 0 && CURRENT_LEVEL < 24) {
          CURRENT_LEVEL += 1
          document.getElementById("level").innerHTML = CURRENT_LEVEL
        }

        if(parseInt(flare_star_rings[i].dataset["level"]) == 1) { flareTheCore() }
      }
    }

    // The flare combo will at least be 1, because it will
    // reset the score if we initialize it with 0 and multiply it to the score.
    flare_combo += 1

    // Gravitate 🌠
    while(gravitatableStarExists()) {
      for (i = 0; i < flare_star_rings.length; i++) {
        var ring_hexagons = flare_star_rings[i].children
        for (var j = 0; j < ring_hexagons.length; j++) {
          var hex_x = ring_hexagons[j].dataset["x"]
          var hex_y = ring_hexagons[j].dataset["y"]
          var star_to_gravitate = getAllElementsFromCoordinates(hex_x, hex_y, "main_cluster")[0]

          if(star_to_gravitate != null) {
            await sleep(10)
            if(starCanGravitateToCore(star_to_gravitate)) {
              gravitate(star_to_gravitate)

              // Update hexagon full data
              emptyPreviousBackgroundHexagon(star_to_gravitate)
              fillBackgroundHexagon(star_to_gravitate)
            }
          }
        }
      }
    }
  }

  if(!preview_cluster_option) {
    if(starInCorona()) { return true }
    var current_score = PLAYER_SCORE
    var tallied_score = tallyUpScore(current_flare_count, flare_combo)
    return {"current_score": current_score, "tallied_score": tallied_score}
  }
}

// 💫🔥
function flare(flare_star_ring) {
  var background_hexagons = flare_star_ring.children
  for (var i = 0; i < background_hexagons.length; i++) {
    var hex_x = background_hexagons[i].dataset["x"]
    var hex_y = background_hexagons[i].dataset["y"]
    var star_to_flare = getAllElementsFromCoordinates(hex_x, hex_y, "main_cluster")[0]
    star_to_flare.remove()
    background_hexagons[i].dataset["full"] = false
  }
}

function flareTheCore() {
  flare(document.getElementsByClassName("core")[0])
}

function tallyUpScore(flare_count, combo_count) {
  // If we do 1 * 0.5 and parse it, it'll just give us 0.
  if(current_prog == 1) {
    var prog_factor = 1
  } else {
    prog_factor = 0.5
  }

  // Players should be able to rack up points by simply dropping star clusters.
  if(flare_count == 0 || combo_count == 0) {
    var tallied_score = parseInt(current_prog * prog_factor) * CURRENT_LEVEL
  } else {
    var tallied_score = flare_count^combo_count + parseInt(current_prog * prog_factor) * CURRENT_LEVEL
  }

  current_prog = 100
  return tallied_score
}

function starInCorona() {
  var first_corona_ring = document.getElementsByClassName("corona_ring")[0]
  var first_ring_hexagons = first_corona_ring.getElementsByClassName("hexagon")
  var star_in_hexagon = false

  for(var i = 0; i < first_ring_hexagons.length; i++) {
    if(first_ring_hexagons[i].dataset["full"] == "true") {
      return true
    }
  }
}

// TODO: Put these in ring.js
function ringIsFull(ring) {
  var ring_hexagons = ring.querySelectorAll(".background_hexagon")
  for (var ring_children_counter = 0; ring_children_counter < ring_hexagons.length; ring_children_counter++) {
    if(ring_hexagons[ring_children_counter].dataset["full"] == "false" || ring_hexagons[ring_children_counter].dataset["full"] == null) { return false }
  }
  return true
}

function fullRingExists(flare_star_rings) {
  for (var i = 0; i < flare_star_rings.length; i++) {
    if(ringIsFull(flare_star_rings[i])) { return true }
  }
  return false
}
