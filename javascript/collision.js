// TODO: This file might not be needed if we're not moving the cluster back.
function saveLastPosition(star_cluster_to_save, floating_cluster_star = false) {
  if(star_cluster_to_save.parentNode.classList.contains("hexagon")) {
    star_cluster_to_save.dataset["last_x"] = star_cluster_to_save.parentNode.dataset["x"]
    star_cluster_to_save.dataset["last_y"] = star_cluster_to_save.parentNode.dataset["y"]
  } else {
    star_cluster_to_save.dataset["last_x"] = star_cluster_to_save.dataset["x"]
    star_cluster_to_save.dataset["last_y"] = star_cluster_to_save.dataset["y"]
  }
}
