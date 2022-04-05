const BUTTERFLY_DATA = {
  "hexagon_1": {
    "initialization_map": [null],
    "rotation_pattern": {
      "turn_1": null,
      "turn_2": null,
      "turn_3": null,
      "turn_4": null,
      "turn_5": null,
      "turn_6": null
    }
  },
  "hexagon_2": {
    "initialization_map": [["left", 1]],
    "rotation_pattern": {
      "turn_1": [["down_left", 1]],
      "turn_2": [["left", 1]],
      "turn_3": [["up_left", 1]],
      "turn_4": [["up_right", 1]],
      "turn_5": [["right", 1]],
      "turn_6": [["down_right", 1]],
    }
  },
  "hexagon_3": {
    "initialization_map": [["left", 1], ["up_left", 1]],
    "rotation_pattern": {
      "turn_1": [["down_left", 1], ["left", 1]],
      "turn_2": [["left", 1], ["up_left", 1]],
      "turn_3": [["up_left", 1], ["up_right", 1]],
      "turn_4": [["up_right", 1], ["right", 1]],
      "turn_5": [["right", 1], ["down_right", 1]],
      "turn_6": [["down_right", 1], ["down_left", 1]],
    }
  },
  "hexagon_4": {
    "initialization_map": [["up_right", 1]],
    "rotation_pattern": {
      "turn_1": [["left", 2]],
      "turn_2": [["up_left", 2]],
      "turn_3": [["up_right", 2]],
      "turn_4": [["right", 2]],
      "turn_5": [["down_right", 2]],
      "turn_6": [["down_left", 2]],
    }
  }
}
