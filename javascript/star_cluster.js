// 🌠 https://en.wikipedia.org/wiki/List_of_open_clusters)
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

// When a star cluster is generated, each star is always generated in its first position, `position_1`.
function generateStarsfromData(star_cluster_data, star_cluster_type, reference_div) {
  var cursor_hexagon = reference_div.parentNode

  // If the cursor is in a corner position other than `1`,
  // we need to make sure the entire rotation pattern of the star cluster is turned accordingly.
  var new_rotation_pattern = getNewRotationPattern(null, star_cluster_type)

  for(var i = 0; i < Object.keys(star_cluster_data).length; i++) {
    var coordinates = getCoordinatesByMap(new_rotation_pattern[i]["position_1"], cursor_hexagon)
    var hexagon_div = searchByCoordinates(coordinates, false)
    var star_cluster_options = {
      "star_cluster_type": star_cluster_type,
      "center_of_gravity": star_cluster_data[`hexagon_${i + 1}`]["center_of_gravity"]
    }
    // TODO: Maybe refactor this to generateStar(...) and call generateHexagon() within that.
    generateHexagon(null, null, `hexagon_${i + 1}`, null, ["star"], 1, hexagon_div, star_cluster_options)
  }

  // TODO: Check out the TODO in jewel_data.js
  applyHexagonDimensions("floating_cluster", star_cluster_data["hexagon_1"]["color"], {"opacity": 1})
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
  // Would be better to redraw the star cluster itself.
  // However, this isn't top priority.
  var reverse_direction = direction == "clockwise" ? "counter-clockwise" : "clockwise"
  rotate(direction, star_cluster, star_cluster_type)
  rotate(reverse_direction, star_cluster, star_cluster_type)
}

function rotate(direction, star_cluster, star_cluster_type) {
  var data = getData(star_cluster_type)
  var cursor = document.getElementsByClassName("cursor")[0]
  var current_cursor_corner_position = cursor.dataset["corner_position"]

  // Rotate each star in the cluster one at a time.
  for(var i = 1; i <= Object.keys(data).length; i++) {

    // Get the proper star HTML element by matching with the hexagon number.
    var star_to_rotate = null
    for (var j = 0; j < star_cluster.length; j++) {
      if(star_cluster[j].dataset["value"] == `hexagon_${i}`) { star_to_rotate = star_cluster[j] }
    }

    var current_rotation_position = parseInt(star_to_rotate.dataset["rotation_position"])

    // Update rotation position for individual star
    if(direction == "clockwise") {
      current_rotation_position += 1
      if(current_rotation_position > 6) { current_rotation_position = 1 }
    } else if(direction == "counter-clockwise") {
      current_rotation_position -= 1
      if(current_rotation_position == 0) { current_rotation_position = 6 }
    }
    star_to_rotate.dataset["rotation_position"] = current_rotation_position

    // Before we rotate, we shift the star's rotation pattern according to the cursor's corner position.
    var new_rotation_pattern = getNewRotationPattern(star_cluster, star_cluster_type)
    var new_rotation_map = new_rotation_pattern[i - 1][`position_${current_rotation_position}`]

    // Get the new hexagon and append the star to it to simulate the rotation
    var new_coordinates = getCoordinatesByMap(new_rotation_map, cursor.parentNode)
    var new_hexagon = searchByCoordinates(new_coordinates)
    new_hexagon.appendChild(star_to_rotate)
  }
}

// This method gets a star clusters' new rotation pattern
// according to the cursor's corner position.
function getNewRotationPattern(star_cluster, star_cluster_type) {
  var new_rotation_pattern = []

  var data = getData(star_cluster_type)
  var cursor = document.getElementsByClassName("cursor")[0]
  var current_cursor_corner_position = cursor.dataset["corner_position"]

  // Here we update each position in each hexagon's rotation pattern.
  for(var i = 1; i <= Object.keys(data).length; i++) {
    // We eventually turn this array into a hash (new_rotation_pattern) and return that.
    // i.e. - [["position_1", [["left", 1]]]] → {"position_1": [["left", 1]]}
    var new_rotation_pattern_ary = []
    var original_rotation_pattern = data[`hexagon_${i}`]["rotation_pattern"]

    // Here we loop through each position in the rotation pattern.
    for (var position_num = 1; position_num <= Object.keys(original_rotation_pattern).length; position_num++) {
      var position = `position_${position_num}`

      // If null, the hexagon doesn't needed to be rotated,
      // so we just push the position_num and the null map.
      if(original_rotation_pattern[`position_${position_num}`][0] == null) {
        new_rotation_pattern_ary.push([`position_${position_num}`, [null]])

      // The map for each position might be an array of several steps
      // i.e. - [["left", 1], ["up_left", 1]]
      // For that reason, we loop through those and update them here.
      } else {
        var new_rotation_map = []
        for (var map_direction_number = 0; map_direction_number < original_rotation_pattern[`position_${position_num}`].length; map_direction_number++) {
          var new_direction = getNewDirectionByRevolvingOnRing(original_rotation_pattern[`position_${position_num}`][map_direction_number][0], current_cursor_corner_position)
          new_rotation_map.push([new_direction, original_rotation_pattern[`position_${position_num}`][map_direction_number][1]])
        }
        new_rotation_pattern_ary.push([`position_${position_num}`, new_rotation_map])
      }
    }

    // fromEntries takes an array and makes it into a hash.
    new_rotation_pattern.push(Object.fromEntries(new_rotation_pattern_ary))
  }
  return new_rotation_pattern
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
    case "One":
      return ONE_DATA
      break;
    default:
  }
}
