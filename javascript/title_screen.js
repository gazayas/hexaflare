// Get title screen cursor's parent, highlight the color.
function initializeTitleScreenCursor() {
  var start_button = document.getElementById("start_game_button")
  start_button.dataset["highlighted"] = "true"
  start_button.style.color = "white"
}

// Highlight the next option, unhighlight the previous option
function moveTitleScreenCursor(direction_of_movement) {
  var title_screen_buttons = document.getElementsByClassName("title_screen_button")

  // TODO: Change this to "button_to_change"
  var currently_highlighted_button
  var current_button_idx
  for(var i = 0; i < title_screen_buttons.length; i ++) {
    if(title_screen_buttons[i].dataset["highlighted"] == "true") {
      currently_highlighted_button = title_screen_buttons[i]
      currently_highlighted_button.dataset["highlighted"] = "false"
      current_button_idx = i

      if(direction_of_movement == "down") {
        current_button_idx += 1
      } else if(direction_of_movement == "up") {
        current_button_idx -= 1
      }
    }
  }

  if(current_button_idx < 0) {
    current_button_idx += title_screen_buttons.length
  } else if(current_button_idx >= title_screen_buttons.length) {
    current_button_idx = 0
  }
  
  currently_highlighted_button.style.color = "#52565F"
  title_screen_buttons[current_button_idx].style.color = "white"
  title_screen_buttons[current_button_idx].dataset["highlighted"] = "true"
}

function displayChooseLevelContainer() {
  document.getElementById("title_screen").style.visibility = "hidden"
  document.getElementById("choose_level_information").style.visibility = "visible"
  ON_TITLE_SCREEN = false
  CHOOSING_LEVEL = true
}

function moveChooseLevelCursor(direction_of_movement) {
  var choose_level_container = document.getElementById("choose_level_container")
  var level_to_adjust = parseInt(choose_level_container.innerHTML)

  if(direction_of_movement == "up") {
    level_to_adjust += 1
  } else if (direction_of_movement == "down") {
    level_to_adjust -= 1
  }

  if(level_to_adjust > 12) {
    return 0
  } else if (level_to_adjust < 1) {
    return 0
  }

  choose_level_container.innerHTML = level_to_adjust
}

function togglePauseMenu() {
  if(GAME_PAUSED) {
    GAME_PAUSED = false
  } else {
    GAME_PAUSED = true
  }

  var pause_screen = document.getElementById("pause_screen")
  if(pause_screen.style.visibility == "hidden" || pause_screen.style.visibility == '') {
    pause_screen.style.visibility = "visible"
  } else {
    pause_screen.style.visibility = "hidden"
  }
}

function movePauseScreenCursor(direction_of_movement) {
  var pause_screen = document.getElementById("pause_screen")
  var option_to_change = document.get

  if(direction_of_movement == "up") {
    level_to_adjust += 1
  } else if (direction_of_movement == "down") {
    level_to_adjust -= 1
  }

  if(level_to_adjust > 12) {
    return 0
  } else if (level_to_adjust < 1) {
    return 0
  }

  choose_level_container.innerHTML = level_to_adjust
}


function returnToTitleScreen() {
  // TODO: Move this to next to generateFlareStarUI
  resetFlareStar()

  document.getElementById("title_screen").style.visibility = "visible"
  document.getElementById("level_container").style.visibility = "hidden"
  document.getElementById("score_container").style.visibility = "hidden"
  document.getElementById("flare_count_container").style.visibility = "hidden"

  // Showing in resetFlareStar and the hiding here, is that ok?
  document.getElementsByClassName("timer")[0].style.visibility = "hidden"

  // Make sure to hide the core too, because it's techincally still there
  var flare_star_to_hide = document.getElementsByClassName("flare_star")[0]
  flare_star_to_hide.style.visibility = "hidden"

  ON_TITLE_SCREEN = true
}

function resetFlareStar() {
  floating_cluster = []
  preview_cluster = []
  if(flare_star_ui != undefined) {
    var current_rings = flare_star_ui.getElementsByClassName("ring")
    var main_cluster_stars = flare_star_ui.getElementsByClassName("main_cluster")
    var stale_floating_clusters = flare_star_ui.getElementsByClassName("floating_cluster")
    var stale_preview_clusters = flare_star_ui.getElementsByClassName("preview_cluster")
    while(current_rings.length > 0) { current_rings[0].remove() }
    while(main_cluster_stars.length > 0) { main_cluster_stars[0].remove() }
    while(stale_floating_clusters.length > 0) { stale_floating_clusters[0].remove() }
    while(stale_preview_clusters.length > 0) { stale_preview_clusters[0].remove() }
  }
  document.getElementsByClassName("timer")[0].style.visibility = "visible"
  document.getElementById("message_container").innerHTML = ""
  document.getElementsByClassName("flare_star")[0].style.visibility = "visible"
}

// Call this on every button press when onTitleScreen
function onTitleScreen() {
  return document.getElementById("title_screen").style.visibility == "visible"
}
