// experiment
function unless(cond, func) {
  if (!cond) { func() }
}

const not = (x) => !x
const sortNumerics = (list) => list.sort( (a,b) => a-b )

export class Triangle {
  constructor(a, b, c) {
    self.sides = [a,b,c]
  }

  get matching_sides() {
    let [a,b,c] = self.sides;

    if (a==b && b==c) {
      return 3
    } else if (a==b || b==c) {
      return 2
    } else {
      return 0 // no matches
    }
  }

  assertTriangleInequality() {
    let [a,b,c] = sortNumerics(sides)
    // unless(a+b >=c, () => throw("violates triangle inequality") )

    if (not(a + b >= c)) {
      throw "violates triangle inequality rules"
    }
  }

  assertValidSides() {
    if (sides.some(side => side <= 0 )) {
      throw "sides must have a length > 0"
    }
  }

  kind() {
    this.assertValidSides();
    this.assertTriangleInequality();

    switch(this.matching_sides) {
      case 3:
        return "equilateral"
      case 2:
        return "isosceles"
      case 0:
        return "scalene"
      default:
        throw("logic error")
    }
  }
}
