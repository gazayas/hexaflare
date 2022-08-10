window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
})

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

var left_button_down = false
var right_button_down = false
var reset_left_button = false
var reset_right_button = false

// `gp` needs to be declared in each setInterval loop here because
// its state is renewed by the time each loop is run
function gamepadHandler(event, connecting) {
  // Make sure the initial move to left or right along corona happens quickly,
  // then ensure that all consequent moves happen with the longer time interval
  // below as long as the button is pressed.
  setInterval(function() {
    var gp = navigator.getGamepads()[event.gamepad.index]

    if(gp.buttons[4].pressed && !moving_left_with_gamepad) {
      moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
      moving_left_with_gamepad = true
    } else if (gp.buttons[5].pressed && !moving_right_with_gamepad) {
      moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
      moving_right_with_gamepad = true
    }

    if(!gp.buttons[4].pressed) { moving_left_with_gamepad = false }
    if(!gp.buttons[5].pressed) { moving_right_with_gamepad = false }
  }, 1)

  setInterval(function(){
    var gp = navigator.getGamepads()[event.gamepad.index]
    if(keys_enabled) {
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
    if(keys_enabled) {
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
          current_prog = 100
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
