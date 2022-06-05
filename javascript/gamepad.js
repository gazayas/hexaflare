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

function gamepadHandler(event, connecting) {
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
  }, 95)

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
          drop(floating_cluster)
        }
        current_button = b_button
      }

      if(!gp.buttons[a_button].pressed && !gp.buttons[y_button].pressed && !gp.buttons[b_button].pressed) {
        current_button = null
      }
    }
  }, 20)
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
