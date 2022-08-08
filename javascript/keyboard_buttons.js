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
var j_key = 74
var l_key = 76

var s_key = 83
var d_key = 68

// The player should only move once even if they hold the button down
// when moving left or right, unless they're using the s or d keys.
var moving_left = false
var moving_right = false

window.onkeydown = function(event) {
  if(keys_enabled) {
    // Drop and Rotate logic
    if(event.keyCode == 32 || event.keyCode == z_key) {
      drop(floating_cluster)
    } else {
      // TODO: Switch case.
      if(event.keyCode == x_key) {
        rotate("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (event.keyCode == c_key) {
        rotate("clockwise", floating_cluster, star_cluster_name)
      } else if ((event.keyCode == left_key || event.keyCode == j_key) && !moving_left) {
        moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
        moving_left = true
      } else if ((event.keyCode == right_key || event.keyCode == l_key) && !moving_right) {
        moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
        moving_right = true
      }

      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    }
  }
}

function keyboardButtonFrameUpdate() {
  if(keys_enabled) {
    if(key_state[s_key] || key_state[d_key]) {

      // Move continuously according to the frame rate declared below.
      if (key_state[s_key]) {
        moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (key_state[d_key]) {
        moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
      }

      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    }
  }
  // TODO: Consider if keys_enabled = true should go here or not.
  // Same for the gamepad logic.
  setTimeout(keyboardButtonFrameUpdate, 60);
}

window.onkeyup = function(event) {
  if (event.keyCode == left_key || event.keyCode == j_key) {
    moving_left = false
  } else if (event.keyCode == right_key || event.keyCode == l_key) {
    moving_right = false
  }
}