const matchesSum = ({triplet, sum}) => sum ? triplet.sum() == sum : true

const combosWithoutRepeat = (min, max) => {
  return {
    *[Symbol.iterator]() {
      for (let i = min; i<= max; i++) {
        for (let j = i+1; j<= max; j++) {
          for (let k = j+1; k<= max; k++) {
            yield [i,j,k]
          }
        }
      }
    }
  }
}

export class Triplet {
  constructor(a,b,c) {
    this.a = a
    this.b = b
    this.c = c
  }

  sum() {
    return this.a + this.b + this.c
  }

  product() {
    return this.a * this.b * this.c
  }

  isPythagorean() {
    return this.a**2 + this.b**2 == this.c**2
  }

  static where({minFactor, maxFactor, sum}) {
    minFactor = minFactor || 1
    let list = []

    for (let [i,j,k] of combosWithoutRepeat(minFactor,maxFactor)) {
      let triplet = new Triplet(i,j,k)
      if (matchesSum({triplet, sum}) && triplet.isPythagorean()) {
        list.push(triplet)
      }
    }
    return list
  }
}
