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

// Just for testing if a USB gamepad works
window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});
