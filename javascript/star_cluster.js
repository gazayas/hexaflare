// Make sure this comes after all the star clusters in
// index.html so everything is read properly

// https://en.wikipedia.org/wiki/List_of_open_clusters)
const STAR_CLUSTER_NAMES = [
  "Jewel", // Cross
  "Pleiades", // Straight
  "Alpha", // Pokes out in middle (Right)
  "Lambda", // Pokes out in middle (Left)
  "Pi", // Curves out at top (Right)
  "Omicron", // Curves out at top (Left)
  "Pearl", // Long jagged star (Right)
  "Blanco", // Long jagged star (Left)
  "Butterfly" // Cup
]

function randomStarClusterType() {
  // return random value from STAR_CLUSTER_NAMES
}

function generateStarCluster(star_cluster_type) {
  // TODO: Randomize star_cluster_type. For now, it's "Jewel"

  // Go through each Jewel hexagon and create it according to it's initialization_map
  var cursor_div = document.getElementsByClassName("cursor")[0]
  var data = null
  switch (star_cluster_type) {
    case "Jewel":
      var data = JEWEL_DATA
      break;
    default:
  }

  generateStarsfromData(data, cursor_div)
}

function rotate(star_cluster, direction) {
  // Call the rotation logic depending on the cluster name
  switch (star_cluster) {
    case "Jewel":
      break;
    default:
  }
}
