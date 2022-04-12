// Hexagons with an initialization_map of [null] start at the cursor
// TODO: calculate the hexagon with constants like HEX_CENTER_WIDTH, etc.

// Maybe dimensions should be applied dynamically?
// Get the cursor's hexagon's data and go from there?

const JEWEL_DATA = {
  "hexagon_1": {
    "rotation_pattern": {
      "turn_1": null,
      "turn_2": [["down_left", 1]],
      "turn_3": null,
      "turn_4": [["left", 1]],
      "turn_5": [["down_left", 1]],
      "turn_6": [["up_left", 1]]
    }
  },
  "hexagon_2": {
    "rotation_pattern": {
      "turn_1": [["down_left", 1]],
      "turn_2": [["down_left", 1], ["left", 1]],
      "turn_3": [["left", 1]],
      "turn_4": [["up_left", 1]],
      "turn_5": [["down_left", 1], ["left", 1]],
      "turn_6": [["left", 1]],
    }
  },
  "hexagon_3": {
    "rotation_pattern": {
      "turn_1": [["left", 1]],
      "turn_2": [["left", 1]],
      "turn_3": [["left", 1], ["up_left", 1]],
      "turn_4": null,
      "turn_5": [["left", 1]],
      "turn_6": [["left", 1], ["up_left", 1]],
    }
  },
  "hexagon_4": {
    "rotation_pattern": {
      "turn_1": [["up_left", 1]],
      "turn_2": null,
      "turn_3": [["up_left", 1]],
      "turn_4": [["down_left", 1]],
      "turn_5": null,
      "turn_6": null,
    }
  }
}
