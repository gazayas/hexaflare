// data-full

// Generation is based on the unit circle.
// This means for each new ring, the first hexagon is generated to the right.
// Each successive hexagon is generated while wrapping around the previous ring in a clockwise manner.
function generateRingLayout(number_of_rings) {
  // Generate Core

  // Create first node

  // while current node has node on left
  // Add node -> down-left

  // while current node has node on top-left
  // Add node -> left

  // while current node has node on top-right
  // Add node -> top-left

  // while current node has node on right
  // Add node -> top-right

  // while current node has node on bottom-right && bottom-right != first_node
  // Add node -> right

  // while next node (bottom-right node) != first node
  // Add node -> bottom-right

  // Generate Corona (2 rings outside Flare Star)
}

// When a user completes two or three rings
function destroyRing() {

}
