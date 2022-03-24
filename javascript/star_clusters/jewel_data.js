// Hexagons with an initialization_map of [null] start at the cursor
// TODO: calculate the hexagon with constants like HEX_CENTER_WIDTH, etc.

// Maybe dimensions should be applied dynamically?
// Get the cursor's hexagon's data and go from there?

const JEWEL_DATA = {
  "hexagon_1": {
    "initialization_map": [null],
    "rotation_pattern": {
      "turn_1": "down_left",
      "turn_2": "up_left",
      "turn_3": null,
      "turn_4": null,
      "turn_5": "up_right",
      "turn_6": "down_right"
    }
  },
  "hexagon_2": {
    "initialization_map": [["down_left", 1]],
    "rotation_pattern": {
      "turn_1": null,
      "turn_2": null,
      "turn_3": null,
      "turn_4": null,
      "turn_5": null,
      "turn_6": null,
    }
  },
  "hexagon_3": {
    "initialization_map": [["left", 1]],
    "rotation_pattern": {
      "turn_1": null,
      "turn_2": null,
      "turn_3": null,
      "turn_4": null,
      "turn_5": null,
      "turn_6": null,
    }
  },
  "hexagon_4": {
    "initialization_map": [["up_left", 1]],
    "rotation_pattern": {
      "turn_1": null,
      "turn_2": null,
      "turn_3": null,
      "turn_4": null,
      "turn_5": null,
      "turn_6": null,
    }
  }
}
