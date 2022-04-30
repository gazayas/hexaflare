function processStarsAfterDrop() {
  var flare_star_rings = document.getElementsByClassName("ring")

  if(fullRingExists(flare_star_rings)) {
    // Check which rings are full, flare the rings, gravitate the stars, and flare until no full rings

    // Go through each ring and destroy its stars
    // This should all happen in one go, so make sure
    // any animation added goes in the right place.
    for (var i = 0; i < flare_star_rings.length; i++) {
      if(ringIsFull(flare_star_rings[i])){
        flare(flare_star_rings[i])
        if(parseInt(flare_star_rings[i].dataset["level"]) == 1) {
          flareCore()
        }
      }
    }
    // TODO: Flare the core if the first ring is full

    // Get all the stars, gravitate them toward the center
  }

  // stars in corona ? end game : generateStarCluster
}

// TODO: We don't need a `full` dataset for ring if we check this way.
function ringIsFull(ring) {
  var ring_hexagons = ring.children
  for (var i = 1; i < ring_hexagons.length; i++) {
    if(ring_hexagons[i].dataset["full"] == "false") { return false }
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

function flareCore() {
  console.log("here");
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
