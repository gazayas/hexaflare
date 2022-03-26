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
  var min = 1
  var max = STAR_CLUSTER_NAMES.length
  var idx = Math.floor(Math.random() * (max + 1 - min) ) + min
  return STAR_CLUSTER_NAMES[idx - 1]
}

function generateStarCluster(star_cluster_type) {
  var cursor_div = document.getElementsByClassName("cursor")[0]
  var data = null
  switch (star_cluster_type) {
    case "Jewel":
      data = JEWEL_DATA
      break;
    case "Pleiades":
      data = PLEIADES_DATA
      break;
    case "Alpha":
      data = ALPHA_DATA
      break;
    case "Lambda":
      data = LAMBDA_DATA
      break;
    case "Pi":
      data = PI_DATA
      break;
    case "Omicron":
      data = OMICRON_DATA
      break;
    case "Pearl":
      data = PEARL_DATA
      break;
    case "Blanco":
      data = BLANCO_DATA
      break;
    case "Butterfly":
      data = BUTTERFLY_DATA
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
