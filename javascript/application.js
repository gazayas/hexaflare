document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowLeft':
      console.log("Left");
      break;
    case 'ArrowUp':
      console.log("Up");
      break;
    case 'ArrowRight':
      console.log("Right");
      break;
    case 'ArrowDown':
      console.log("Down");
      break;
    default:
      break;
  }
})

window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
});

var flip_factor = -1

function gamepadHandler(event, connecting) {
  setInterval(function(){
    var gp = navigator.getGamepads()[event.gamepad.index];
    for(var i = 0; i < 18; i++) {
      if(gp.buttons[i].pressed) {
        console.log(i);
      }

      var cursor = document.getElementsByClassName("cursor")[0]
      var parent_hexagon = cursor.parentElement
      var old_x = parent_hexagon.dataset["x"]
      var old_y = parent_hexagon.dataset["y"]
      var all_hexagons = document.getElementsByClassName("hexagon")
      var new_hexagon = null;

      if(gp.buttons[14].pressed) {
        for(var i = 0; i < all_hexagons.length; i++) {
          if(all_hexagons[i].dataset["x"] == (old_x - 42) && all_hexagons[i].dataset["y"] == old_y) {
            new_hexagon = all_hexagons[i]
          }
        }
      } else if (gp.buttons[15].pressed) {
        for(var i = 0; i < all_hexagons.length; i++) {
          if(all_hexagons[i].dataset["x"] == (old_x - -42) && all_hexagons[i].dataset["y"] == old_y) {
            new_hexagon = all_hexagons[i]
          }
        }
      } else if (gp.buttons[12].pressed) {
        for(var i = 0; i < all_hexagons.length; i++) {
          if(all_hexagons[i].dataset["x"] == (old_x - (21 * flip_factor)) && all_hexagons[i].dataset["y"] == old_y - 38) {
            new_hexagon = all_hexagons[i]
          }
        }
      } else if (gp.buttons[13].pressed) {
        for(var i = 0; i < all_hexagons.length; i++) {
          if(all_hexagons[i].dataset["x"] == (old_x - (-21) * flip_factor) && all_hexagons[i].dataset["y"] == old_y - -38) {
            new_hexagon = all_hexagons[i]
          }
        }
      }

      if(new_hexagon != null) {
        new_hexagon.appendChild(cursor)
        flip_factor *= -1
      }
    }
    // 0: Y
    // 1: B
    // 2: A
    // 3: X
    // 4: L
    // 5: R
    // 6: ZL
    // 7: ZR
    // 8: Select
    // 9: Start
    // 10: Left Stick
    // 11: Right Stick
    // 12: Home
    // 13: Screenshot

    // console.log(gp.axes[1]);

    //document.getElementById("button").innerHTML = isPressed;
  }, 80)
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);
