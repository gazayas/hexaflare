// Hexagons with an initialization_map of [null] start at the cursor
// TODO: calculate the hexagon with constants like HEX_CENTER_WIDTH, etc.

// Maybe dimensions should be applied dynamically?
// Get the cursor's hexagon's data and go from there?

const JEWEL_DATA = {
  "hexagon_1": {
    "rotation_pattern": {
      "position_1": null,
      "position_2": [["down_left", 1]],
      "position_3": null,
      "position_4": [["left", 1]],
      "position_5": [["down_left", 1]],
      "position_6": [["up_left", 1]]
    }
  },
  "hexagon_2": {
    "rotation_pattern": {
      "position_1": [["down_left", 1]],
      "position_2": [["down_left", 1], ["left", 1]],
      "position_3": [["left", 1]],
      "position_4": [["up_left", 1]],
      "position_5": [["down_left", 1], ["left", 1]],
      "position_6": [["left", 1]],
    }
  },
  "hexagon_3": {
    "rotation_pattern": {
      "position_1": [["left", 1]],
      "position_2": [["left", 1]],
      "position_3": [["left", 1], ["up_left", 1]],
      "position_4": null,
      "position_5": [["left", 1]],
      "position_6": [["left", 1], ["up_left", 1]],
    }
  },
  "hexagon_4": {
    "rotation_pattern": {
      "position_1": [["up_left", 1]],
      "position_2": null,
      "position_3": [["up_left", 1]],
      "position_4": [["down_left", 1]],
      "position_5": null,
      "position_6": null,
    }
  }
}
