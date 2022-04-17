function assert(actual, expected) {
  console.log('.');
  console.assert(actual === expected, '\nActual: ' + actual + '\nExpected: ' + expected);
}

var flare_star = generateFlareStar(12)

assert(numberOfRings(flare_star), 12)
assert(ringCorners(flare_star, 1) [1, 2, 3, 4, 5, 6])
