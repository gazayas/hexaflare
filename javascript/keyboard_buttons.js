// Left key:  Move counter-clockwise once
// J Key:     Move counter-clockwise once
// Right Key: Move clockwise once
// L Key:     Move clockwise once
// S Key:     Move counter-clockwise continuously
// D Key:     Move counter-clockwise continuously

// X Key:     Rotate counter-clockwise
// C Key:     Rotate clockwise
// Z Key:     Drop

// Keys that move star clusters continuously are placed in a loop
// where the frame is updated continuously.

var key_state = {}
var keys_enabled = true

window.addEventListener('keydown', function(e) {
  key_state[e.keycode || e.which] = true
}, true)
window.addEventListener('keyup', function(e) {
  key_state[e.keycode || e.which] = false
})

// TODO: I think there's an actual way to just get
// something like "left_arrow" from the `event` object.
var x_key = 88
var c_key = 67
var space_key = 32
var z_key = 90

var left_key = 37
var right_key = 39
var up_key = 38
var down_key = 40
var j_key = 74
var l_key = 76
var i_key = 73
var k_key = 75

var s_key = 83
var d_key = 68

var enter_key = 13

// The player should only move once even if they hold the button down
// when moving left or right, unless they're using the s or d keys.
var moving_left = false
var moving_right = false
var rotating_clockwise = false
var rotating_counter_clockwise = false

var enter_key_down = false
var i_key_down = false
var k_key_down = false
var up_key_down = false
var down_key_down = false
var waiting_for_start_button_release = false

window.addEventListener('keydown', (event) => {
  if(ON_TITLE_SCREEN) {
    if(event.keyCode == up_key || event.keyCode == i_key) {
      moveTitleScreenCursor("up")
    } else if(event.keyCode == down_key || event.keyCode == k_key) {
      moveTitleScreenCursor("down")
    } else if(event.keyCode == enter_key && !enter_key_down) {
      displayChooseLevelContainer()
      waiting_for_start_button_release = true
    }
  }

  if(CHOOSING_LEVEL) {
    if(event.keyCode == up_key || event.keyCode == i_key) {
      moveChooseLevelCursor("up")
    } else if (event.keyCode == down_key || event.keyCode == k_key) {
      moveChooseLevelCursor("down")
    } else if(event.keyCode == enter_key && !waiting_for_start_button_release) {
      var level_to_start_with = document.getElementById("choose_level_container").innerHTML
      startGame(level_to_start_with)
      CHOOSING_LEVEL = false
      enter_key_down = true
      waiting_for_start_button_release = true
    }
  }

  if(!ON_TITLE_SCREEN && !CHOOSING_LEVEL) {
    if(event.keyCode == enter_key && GAME_OVER == true && !enter_key_down) {
      returnToTitleScreen()
      enter_key_down = true
    } else if(event.keyCode == enter_key && GAME_OVER != true && !waiting_for_start_button_release) {
      togglePauseMenu()
      enter_key_down = true
      waiting_for_start_button_release = true
    } else if(event.keyCode == enter_key && GAME_OVER != true && !waiting_for_start_button_release) {
      
    }
  
    if(keys_enabled && !GAME_PAUSED) {
      if(GAME_OVER != true){
        // Drop and Rotate logic
        if(event.keyCode == z_key || event.keyCode == space_key) {
          UPDATE_TIMER = false
          drop(floating_cluster)
          // current_prog = 100
        } else {
          // TODO: Switch case.
          if(event.keyCode == x_key && !rotating_counter_clockwise) {
            rotate("counter-clockwise", floating_cluster, star_cluster_name)
            rotating_counter_clockwise = true
          } else if (event.keyCode == c_key && !rotating_clockwise) {
            rotate("clockwise", floating_cluster, star_cluster_name)
            rotating_clockwise = true
          } else if ((event.keyCode == s_key) && !moving_left) {
            moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
            moving_left = true
          } else if ((event.keyCode == d_key) && !moving_right) {
            moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
            moving_right = true
          }
  
          resetPreviewClusterToStarCluster(floating_cluster)
          var preview_cluster = document.getElementsByClassName("preview_cluster")
          drop(preview_cluster, true)
        }
      }
    }
  }
 
})

function keyboardButtonFrameUpdate() {
  if(keys_enabled && (GAME_OVER != true && GAME_OVER != undefined) && !GAME_PAUSED) {
    if(key_state[left_key] || key_state[right_key] || key_state[j_key] || key_state[l_key]) {
      // Move continuously according to the frame rate declared below.
      if (key_state[left_key] || key_state[j_key]) {
        moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (key_state[right_key] || key_state[l_key]) {
        moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
      }

      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    }
  }
  // TODO: Consider if `keys_enabled` = true should go here or not.
  // Same for the gamepad logic.
  return 1;
}

window.onkeyup = function(event) {
  if (event.keyCode == s_key) {
    moving_left = false
  } else if (event.keyCode == d_key) {
    moving_right = false
  } else if (event.keyCode == x_key) {
    rotating_counter_clockwise = false
  } else if (event.keyCode == c_key) {
    rotating_clockwise = false
  } else if (event.keyCode != enter_key) {
    enter_key_down = false
  }

  if(event.keyCode == enter_key) {
    waiting_for_start_button_release = false
  }
}
