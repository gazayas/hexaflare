async function processStarsAfterDrop() {
  var flare_star_rings = document.getElementsByClassName("ring")

  // TODO: Make sure main cluster stars gravitate to the core with overlapping.
  while(fullRingExists(flare_star_rings)) {
    for (var i = 0; i < flare_star_rings.length; i++) {
      if(ringIsFull(flare_star_rings[i])){
        flare(flare_star_rings[i])
        if(parseInt(flare_star_rings[i].dataset["level"]) == 1) { flareTheCore() }
      }
    }
    // Gravitate each individual star from ring level 1 and up
    for (i = 0; i < flare_star_rings.length; i++) {
      // TODO: Stop if you're in the Corona
      var ring_hexagons = flare_star_rings[i].querySelectorAll(".background_hexagon")
      for (var j = 0; j < ring_hexagons.length; j++) {
        var star_in_hexagon = ring_hexagons[j].querySelector(".main_cluster")
        if(star_in_hexagon != null) {
          await sleep(25)
          gravitate(star_in_hexagon)
        }
      }
      updateHexagonFullData()
    }
  }

  // stars in corona ? end game : generateStarCluster
}

// TODO: We don't need a `full` dataset for ring if we check this way.
function ringIsFull(ring) {
  var ring_hexagons = ring.children
  for (var i = 1; i < ring_hexagons.length; i++) {
    if(ring_hexagons[i].dataset["full"] == "false" || ring_hexagons[i].dataset["full"] == null) { return false }
  }
  return true
}

function fullRingExists(flare_star_rings) {
  for (var i = 0; i < flare_star_rings.length; i++) {
    if(ringIsFull(flare_star_rings[i])) { return true }
  }
  return false
}

function flare(flare_star_ring) {
  // TODO: Add up score

  var stars_to_flare = flare_star_ring.querySelectorAll(".main_cluster")
  for (var i = 0; i < stars_to_flare.length; i++) {
    stars_to_flare[i].parentNode.dataset["full"] = false
    stars_to_flare[i].remove()
  }
}

function flareTheCore() {
  var core_element = document.getElementsByClassName("core")[0]
  core_element.children[0].dataset["full"] = false // children[0] is background_hexagon

  // TODO: Remove this and uncomment code below after writing collision logic.
  var starz_in_core = core_element.querySelectorAll(".main_cluster")
  for (var i = 0; i < starz_in_core.length; i++) {
    starz_in_core[i].remove()
  }

  // Should actually be this, uncomment after finished testing
  // var star_in_core = core_element.querySelectorAll(".main_cluster")[0]
  // star_in_core.remove()
}
