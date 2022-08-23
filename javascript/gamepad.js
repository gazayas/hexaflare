/*window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index]
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length
    )
})
*/

var current_button = null

// TODO: The letters might be different for the Switch controller.
// TODO: Use the X button to save a floating cluster.
var b_button = 0
var a_button = 1
var y_button = 2
var x_button = 3

var moves_to_left_by_gamepad = 0
var moves_to_right_by_gamepad = 0

var moving_left_with_gamepad = false
var moving_right_with_gamepad = false
var rotating_clockwise_with_gamepad = false
var rotating_counter_clockwise_with_gamepad = false

var b_button_down = false
var left_button_down = false
var right_button_down = false
var up_button_down = false
var down_button_down = false
var reset_left_button = false
var reset_right_button = false
var start_button_down = false

var waiting_for_start_button_release = false

// `gp` needs to be declared in each setInterval loop here because
// its state is renewed by the time each loop is run
function gamepadHandler(event, connecting) {
  // Make sure the initial move to left or right along corona happens quickly,
  // then ensure that all consequent moves happen with the longer time interval
  // below as long as the button is pressed.
  setInterval(function() {
    var gp = navigator.getGamepads()[event.gamepad.index]

    if(VIEWING_HOW_TO_PLAY) {
      if(gp.buttons[9].pressed && !up_button_down && !waiting_for_start_button_release) {
        returnToTitleScreen()
        waiting_for_start_button_release = true
      }
    } else if(ON_TITLE_SCREEN) {
      if(gp.buttons[12].pressed && !up_button_down) {
        moveTitleScreenCursor("up")
        up_button_down = true
      } else if(gp.buttons[13].pressed && !down_button_down) {
        moveTitleScreenCursor("down")
        down_button_down = true
      } else if(gp.buttons[9].pressed && !up_button_down && !waiting_for_start_button_release) {
        // displayChooseLevelContainer()
        var option_chosen_on_title_screen = getTitleScreenOption()
        switch(option_chosen_on_title_screen) {
          case "start_game_button":
            displayChooseLevelContainer()
            break
          case "how_to_play_button":
            displayHowToPlayScreen()
            break
        }
        waiting_for_start_button_release = true
      }
    }

    if(CHOOSING_LEVEL) {
      if(gp.buttons[12].pressed && !up_button_down) {
        moveChooseLevelCursor("up")
        up_button_down = true
      } else if(gp.buttons[13].pressed && !down_button_down) {
        moveChooseLevelCursor("down")
        down_button_down = true
      }

      if(gp.buttons[9].pressed && (GAME_OVER == true || GAME_OVER == undefined) && !start_button_down && !waiting_for_start_button_release) {
        var level_to_start_with = document.getElementById("choose_level_container").innerHTML
        startGame(level_to_start_with)
        CHOOSING_LEVEL = false
        start_button_down = true
      }
    }

    if(!CHOOSING_LEVEL && !ON_TITLE_SCREEN) {
      if(gp.buttons[9].pressed && GAME_OVER == true && !onTitleScreen() && !start_button_down && !waiting_for_start_button_release) {
        returnToTitleScreen()
        start_button_down = true
        waiting_for_start_button_release = true
      } else if(gp.buttons[9].pressed && (GAME_OVER == true || GAME_OVER == undefined) && start_button_down == false && ON_TITLE_SCREEN) {
        // TODO: Remove this else if
      } else if (gp.buttons[9].pressed && GAME_OVER == false && !start_button_down && !waiting_for_start_button_release) {
        togglePauseMenu()
        start_button_down = true
        waiting_for_start_button_release = true
      }
  
      if(keys_enabled && !GAME_PAUSED) {
        if(gp.buttons[4].pressed && !moving_left_with_gamepad) {
          moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
          moving_left_with_gamepad = true
        } else if (gp.buttons[5].pressed && !moving_right_with_gamepad) {
          moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
          moving_right_with_gamepad = true
        }
  
        
      }
      if(!gp.buttons[b_button].pressed) { b_button_down = false}
    }

    if(!gp.buttons[4].pressed) { moving_left_with_gamepad = false }
    if(!gp.buttons[5].pressed) { moving_right_with_gamepad = false }
    if(!gp.buttons[9].pressed) { start_button_down = false }
    if(!gp.buttons[12].pressed) { up_button_down = false }
    if(!gp.buttons[13].pressed) { down_button_down = false }

    if(!gp.buttons[9].pressed) { waiting_for_start_button_release = false }
  }, 1)

  setInterval(function(){
    var gp = navigator.getGamepads()[event.gamepad.index]
    if(keys_enabled && GAME_OVER != true && GAME_OVER != undefined && !GAME_PAUSED) {
      if (gp.buttons[14].pressed) {
        moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (gp.buttons[15].pressed) {
        moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
      }

      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    }
  }, 65)

  setInterval(function() {
    if(keys_enabled && GAME_OVER != true && !GAME_PAUSED) {
      var gp = navigator.getGamepads()[event.gamepad.index]
      if (gp.buttons[y_button].pressed) {
        if(current_button != y_button) {
          rotate("counter-clockwise", floating_cluster, star_cluster_name)
          resetPreviewClusterToStarCluster(floating_cluster)
          var preview_cluster = document.getElementsByClassName("preview_cluster")
          drop(preview_cluster, true)
        }
        current_button = y_button
      } else if (gp.buttons[a_button].pressed) {
        if(current_button != a_button) {
          rotate("clockwise", floating_cluster, star_cluster_name)
          resetPreviewClusterToStarCluster(floating_cluster)
          var preview_cluster = document.getElementsByClassName("preview_cluster")
          drop(preview_cluster, true)
        }
        current_button = a_button
      } else if (gp.buttons[b_button].pressed) {
        if(current_button != b_button) {
          UPDATE_TIMER = false
          drop(floating_cluster)
          // current_prog = 100
        }
        current_button = b_button
      }

      if(keys_enabled) { UPDATE_TIMER = true }

      if(!gp.buttons[a_button].pressed && !gp.buttons[y_button].pressed && !gp.buttons[b_button].pressed) {
        current_button = null
      }
    }
  }, 20)
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
