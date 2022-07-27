// TODO: Document this.

var key_state = {}
var keys_enabled = true

window.addEventListener('keydown', function(e) {
  key_state[e.keycode || e.which] = true
}, true)
window.addEventListener('keyup', function(e) {
  key_state[e.keycode || e.which] = false
})

var x_key = 88
var c_key = 67
var space_key = 32
var z_key = 90

var left_key = 37
var right_key = 39
var j_key = 74
var l_key = 76

var moves_to_left = 0
var moves_to_right = 0

// TODO: Add a check to see if the input is from the keyboard or a USB controller.
// Then change the setTimeout time value according to that.
window.onkeydown = function(event) {
  if(keys_enabled) {
    // Drop and Rotate logic
    if(event.keyCode == 32 || event.keyCode == z_key) {
      drop(floating_cluster)
    } else {
      if(event.keyCode == x_key) {
        rotate("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (event.keyCode == c_key) {
        rotate("clockwise", floating_cluster, star_cluster_name)
      }
      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    }

    // Move along Corona logic (logic for initial move over one space).
    // This is implemented because the timeout with the loop below might start at weird time and
    // not pick up on a single button press. This will ensure the first move DOES happen,
    // and then all consequent moves in that direction will be taken care of in the loop
    // as long as the player is still pressing down the same button
    if(event.keyCode == left_key && moves_to_left == 0) {
      moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
      moves_to_left++
      console.log("moved once.")
    } else if (event.keyCode == right_key && moves_to_right == 0) {
      moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
      moves_to_right++
    }
  }
}

function keyboardButtonFrameUpdate() {
  if(keys_enabled) {
    if(
       key_state[left_key] || key_state[j_key] || key_state[right_key] || key_state[l_key]) {
      if (key_state[left_key] || key_state[j_key]) {
        if(moves_to_left > 1) { moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name) }
        moves_to_left++
      } else if (key_state[right_key] || key_state[l_key]) {
        if(moves_to_right > 1) { moveAlongCorona("clockwise", floating_cluster, star_cluster_name) }
        moves_to_right++
      }
      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    }
  }
  // TODO: Consider if keys_enabled = true should go here or not.
  // Same for the gamepad logic.
  setTimeout(keyboardButtonFrameUpdate, 90);
}

window.onkeyup = function(event) {
  moves_to_left = 0
  moves_to_right = 0
}
