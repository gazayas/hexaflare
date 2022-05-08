// Add `async` before the function you want to use this in.
// https://code-paper.com/javascript/examples-sleep-1-second-javascript
function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}
