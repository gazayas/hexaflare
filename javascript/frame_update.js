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
var z_key = 90

var left_key = 37
var right_key = 39
var j_key = 74
var l_key = 76

function frameUpdate() {
  if(keys_enabled) {
    if(key_state[x_key] || key_state[c_key] ||
       key_state[left_key] || key_state[j_key] || key_state[right_key] || key_state[l_key]) {
      if (key_state[x_key]) {
        rotate("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (key_state[c_key]) {
        rotate("clockwise", floating_cluster, star_cluster_name)
      } else if (key_state[left_key] || key_state[j_key]) {
        moveAlongCorona("counter-clockwise", floating_cluster, star_cluster_name)
      } else if (key_state[right_key] || key_state[l_key]) {
        moveAlongCorona("clockwise", floating_cluster, star_cluster_name)
      }
      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      drop(preview_cluster, true)
    } else if (key_state[z_key]) {
      drop(floating_cluster)
    }
  }
  // TODO: Consider if keys_enabled should go here or not.
  // Same for the gamepad logic.
  setTimeout(frameUpdate, 80);
}
