// Initialize bar width
var progress_bar = document.getElementsByClassName("progress-bar")[0]
progress_bar.style.width = "100%"
var current_progress = progress_bar.style.width
let timer_speed = 10

let current_prog = parseFloat(progress_bar.style.width.replace(/%/, ""))
function processTimerEvents() {
  if(UPDATE_TIMER == true) { current_prog -= 0.2 }

  if(current_prog <= 0) {
    current_prog = 0
    keys_enabled = false
    drop(floating_cluster)
    resetPreviewClusterToStarCluster(floating_cluster)
    var preview_cluster = document.getElementsByClassName("preview_cluster")
    drop(preview_cluster, true)

    progress_bar.style.width = "100%"

    // Super buggy! 🐞
    // But we can multiply 1 * the score which might be good.
    // This is if the timer runs out and the star cluster is dropped automatically.
    current_prog = 1
  } else {
    progress_bar.style.width = `${current_prog}%`
  }
}
