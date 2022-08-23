// Initialize bar width
var progress_bar = document.getElementsByClassName("progress-bar")[0]
progress_bar.style.width = "100%"
var current_progress = progress_bar.style.width

let current_prog = parseFloat(progress_bar.style.width.replace(/%/, ""))
function processTimerEvents() {
  if(GAME_OVER == false && !GAME_PAUSED) {
    var timer_speed = 0.2 + (0.08 * CURRENT_LEVEL)
    if(UPDATE_TIMER == true) { current_prog -= timer_speed }
  }

  if(current_prog <= 0) {
    if(GAME_OVER == false) {
      current_prog = 0
      keys_enabled = false
      drop(floating_cluster)
      resetPreviewClusterToStarCluster(floating_cluster)
      var preview_cluster = document.getElementsByClassName("preview_cluster")
      var preview_cluster_center_of_gravity = getCenterOfGravity(preview_cluster)
      var preview_cluster_direction = getGravitationDirection(preview_cluster_center_of_gravity)

      if(preview_cluster_direction) {
        drop(preview_cluster, true)
      }

      // Super buggy! 🐞
      // But we can multiply the score by 1 which might be good.
      // This is if the timer runs out and the star cluster is dropped automatically.
      current_prog = 1
    } else {
      timer_speed = 0
    }
  } else {
    progress_bar.style.width = `${current_prog}%`
  }
}
