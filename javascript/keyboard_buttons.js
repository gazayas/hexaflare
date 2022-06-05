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

window.onkeydown = function(event) {
  if(keys_enabled) {
    if(event.keyCode == 32 || event.keyCode == z_key) {
      drop(floating_cluster)
    } else {
      if(event.keyCode == left_key || event.keyCode == x_key) {
        rotate("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (event.keyCode == right_key || event.keyCode == c_key) {
        rotate("clockwise", floating_cluster, star_cluster_name)
      }
      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    }
  }
}

function keyboardButtonFrameUpdate() {
  if(keys_enabled) {
    if(
       key_state[left_key] || key_state[j_key] || key_state[right_key] || key_state[l_key]) {
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
  // TODO: Consider if keys_enabled = true should go here or not.
  // Same for the gamepad logic.
  setTimeout(keyboardButtonFrameUpdate, 90);
}
