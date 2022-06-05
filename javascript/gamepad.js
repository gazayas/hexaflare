window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
});
function gamepadHandler(event, connecting) {
  setInterval(function(){
    var gp = navigator.getGamepads()[event.gamepad.index];

    if(keys_enabled) {
      if(gp.buttons[0].pressed) {
        // XBox: A Button
        drop(floating_cluster)
      } else {
        if (gp.buttons[1].pressed) {
          // XBox: B Button
          rotate("clockwise", floating_cluster, star_cluster_name)
        } else if (gp.buttons[2].pressed) {
          // XBox: X Button
          rotate("counter-clockwise", floating_cluster, star_cluster_name)
        } else if (gp.buttons[3].pressed) {
          // XBox: Y Button
          // TODO: Save Cluster
        } else if (gp.buttons[4].pressed) {
          // XBox: Left Bumper
          // TODO: moveToCorner("counter-clockwise")
        } else if (gp.buttons[5].pressed) {
          // XBox: Right Bumper
          // TODO: moveToCorner("clockwise")
        } else if (gp.buttons[14].pressed) {
          moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
        } else if (gp.buttons[15].pressed) {
          moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
        }

        resetPreviewClusterToStarCluster(floating_cluster)
        var preview_cluster = document.getElementsByClassName("preview_cluster")
        drop(preview_cluster, true)
      }
    }
  }, 93)
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
