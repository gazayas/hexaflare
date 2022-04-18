function drop(star_cluster) {
  var finished = false

  // Get the center of gravity.
  for(var star_num = 0; star_num < star_cluster.length; star_num++) {
    var star = star_cluster[star_num]
    if(star.dataset["center_of_gravity"] === "true") {
      var center_of_gravity = star
      break;
    }
  }

  /*while(!onCore(center_of_gravity) || canGravitateToCore(star_cluster)) {

  }*/
  // The sleep function should probably go in here after each iteration of #drop (recursion).
}

// Gravitate a star towards the core.
function gravitate(star) {

}

function onCore(star) {
  if(star.closest(".core") == null){
    return false
  } else {
    return true;
  }
}

function canGravitateToCore(star_cluster) {
  // Go through each star here and see if it the cluster as a whole can move to core.
  
}
