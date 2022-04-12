// https://en.wikipedia.org/wiki/List_of_open_clusters)
const STAR_CLUSTER_NAMES = [
  "Proxima",
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

// These are used specifically for rotation patterns
const DIRECTIONS = [
  "left",
  "up_left",
  "up_right",
  "right",
  "down_right",
  "down_left"
]

function randomStarClusterType() {
  var idx = Math.floor(Math.random() * STAR_CLUSTER_NAMES.length)
  return STAR_CLUSTER_NAMES[idx]
}

function generateStarCluster(star_cluster_type) {
  var cursor_div = document.getElementsByClassName("cursor")[0]
  var data = getData(star_cluster_type)
  generateStarsfromData(data, star_cluster_type, cursor_div)
}

// Star Clusters are always generated in their first position.
// We generate each star according to its value `position_1`.
function generateStarsfromData(star_cluster_data, star_cluster_type, reference_div) {
  var cursor_hexagon = reference_div.parentNode

  // If the cursor is in a corner position other than `1`,
  // we need to make sure the entire rotation pattern is turned accordingly.
  var new_rotation_pattern = getNewRotationPattern(null, star_cluster_type)

  for(var i = 1; i <= Object.keys(star_cluster_data).length; i++) {
    // TODO: I'm still not a fan of this, it should probably be changed sooner than later.
    if (new_rotation_pattern[i-1]["position_1"] == null) { new_rotation_pattern[i-1]["position_1"] = [null] }

    var coordinates = getCoordinatesByMap(new_rotation_pattern[i-1]["position_1"], cursor_hexagon)
    var hexagon_div = searchByCoordinates(coordinates, false)
    generateHexagon(null, null, `hexagon_${i}`, null, "star", 1, hexagon_div)
  }

  applyHexagonDimensions("floating_cluster", "blue", {"opacity": 1})
}

function moveAlongCorona(direction, star_cluster, star_cluster_type) {
  var cursor = document.getElementsByClassName("cursor")[0]
  var old_corner_position = cursor.dataset["corner_position"]

  var parent_hexagon = cursor.parentNode
  var hexagon_value = parseInt(parent_hexagon.dataset["value"])
  var ring_level = parseInt(parent_hexagon.dataset["ring_level"])
  var last_value_in_ring = flare_star[ring_level].length

  // Calculate the next value
  if(direction == "counter-clockwise") {
    var new_value = hexagon_value - 1
    if(new_value == 0) {
      new_value = last_value_in_ring
    }
  } else if (direction == "clockwise") {
    var new_value = hexagon_value + 1
    if(new_value > last_value_in_ring) {
      new_value = 1
    }
  }

  var hexagon_to_move_to = searchByRingLevelAndValue(ring_level, new_value)
  var new_corner = cornerPosition(flare_star, ring_level, new_value) + 1
  cursor.dataset["corner_position"] = new_corner
  hexagon_to_move_to.appendChild(cursor)

  // TODO: This is super hacky, but it works ¯\_(ツ)_/¯
  // Would be better to redraw the star cluster itself
  var reverse_direction = direction == "clockwise" ? "counter-clockwise" : "clockwise"
  rotate(direction, star_cluster, star_cluster_type)
  rotate(reverse_direction, star_cluster, star_cluster_type)
}

// TODO: If the star_cluster falls inside the inner flare_star, run this again until it's clear
// Maybe I should just make rotations so it doesn't fall into the inner flare star in the first place
function rotate(direction, star_cluster, star_cluster_type) {
  var data = getData(star_cluster_type)
  var cursor = document.getElementsByClassName("cursor")[0]
  var current_cursor_corner_position = cursor.dataset["corner_position"]

  for(var i = 1; i <= Object.keys(data).length; i++) {
    var star_cluster_to_rotate = null
    for (var l = 0; l < star_cluster.length; l++) {
      for (var m = 1; m <= star_cluster.length; m++) {
        if(star_cluster[l].dataset["value"] == `hexagon_${i}`) {
          star_cluster_to_rotate = star_cluster[l]
        }
      }
    }

    // TODO: Double check rotation position and cursor corner position soon
    var current_rotation_position = parseInt(star_cluster_to_rotate.dataset["rotation_position"])

    // Update rotation position for individual star
    if(direction == "clockwise") {
      current_rotation_position += 1
      if(current_rotation_position > 6) { current_rotation_position = 1 }
    } else if(direction == "counter-clockwise") {
      current_rotation_position -= 1
      if(current_rotation_position == 0) { current_rotation_position = 6 }
    }
    star_cluster_to_rotate.dataset["rotation_position"] = current_rotation_position

    // Before we rotate, we shift the star's rotation pattern according to the cursor's corner position.
    var new_rotation_pattern = getNewRotationPattern(star_cluster, star_cluster_type)

    var current_turn_map = new_rotation_pattern[i - 1][`position_${current_rotation_position}`]
    if(current_turn_map == null) { current_turn_map = [null] }
    var new_coordinates = getCoordinatesByMap(current_turn_map, cursor.parentNode)
    var new_hexagon = searchByCoordinates(new_coordinates)
    new_hexagon.appendChild(star_cluster_to_rotate)
  }
}

// Before we rotate, we need a new rotation pattern according to the
// star cluster's cursor's corner position.
function getNewRotationPattern(star_cluster, star_cluster_type) {
  var new_map = [] // TODO: Maybe could come up with a better name
  var data = getData(star_cluster_type)
  var cursor = document.getElementsByClassName("cursor")[0]
  var current_cursor_corner_position = cursor.dataset["corner_position"]

  // Update the hexagons' rotation positions.
  for(var i = 1; i <= Object.keys(data).length; i++) {
    var rotation_patterns = data[`hexagon_${i}`]["rotation_pattern"] // rotation_pattern
    var new_rotation_pattern = []

    // Here we loop through each position in the rotation pattern
    for (var position_num = 1; position_num <= Object.keys(rotation_patterns).length; position_num++) {
      var position = `position_${position_num}`
      if(rotation_patterns[`position_${position_num}`] == null) {
        // The hexagon doesn't needed to be rotated, so we don't do anything here.
        new_rotation_pattern.push([`position_${position_num}`, null])
      } else {
        // The position inside the rotation pattern might be an array of several steps
        // i.e. - [["left", 1], ["up_left", 1]]
        // For that reason, we loop through those and update them here.
        var new_rotation_map = []
        for (var k = 0; k < rotation_patterns[`position_${position_num}`].length; k++) {
          var new_direction = getNewDirectionByRevolvingOnRing(rotation_patterns[`position_${position_num}`][k][0], current_cursor_corner_position)
          new_rotation_map.push([new_direction, rotation_patterns[`position_${position_num}`][k][1]])
        }
        new_rotation_pattern.push([`position_${position_num}`, new_rotation_map])
      }
    }
    // var new_rotation_pattern = Object.fromEntries(new_rotation_pattern)
    new_map.push(Object.fromEntries(new_rotation_pattern))
  }
  return new_map
}

// TODO: Get according to Flare Star ID
function cursorCornerPosition() {

}

// A star's rotation pattern is mapped out in reference to the first corner position.
// Here we shift the direction according to that original map to get a new one according to the new corner position.
function getNewDirectionByRevolvingOnRing(original_direction, corner_position) {
  // We do -1 here because, if the corner position is already 1, we don't want to shift anything.
  // If it's 2, we only rotate the star cluster once, etc.
  var new_idx = DIRECTIONS.indexOf(original_direction) + (parseInt(corner_position) - 1)
  if(new_idx > 5) {
    new_idx = new_idx % 6
  }
  return DIRECTIONS[new_idx]
}

function getData(star_cluster_type) {
  switch (star_cluster_type) {
    case "Proxima":
      return PROXIMA_DATA
      break;
    case "Jewel":
      return JEWEL_DATA
      break;
    case "Pleiades":
      return PLEIADES_DATA
      break;
    case "Alpha":
      return ALPHA_DATA
      break;
    case "Lambda":
      return LAMBDA_DATA
      break;
    case "Pi":
      return PI_DATA
      break;
    case "Omicron":
      return OMICRON_DATA
      break;
    case "Pearl":
      return PEARL_DATA
      break;
    case "Blanco":
      return BLANCO_DATA
      break;
    case "Butterfly":
      return BUTTERFLY_DATA
      break;
    default:
  }
}
