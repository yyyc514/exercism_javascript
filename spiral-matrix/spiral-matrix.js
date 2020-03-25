//
// This is only a SKELETON file for the 'Spiral Matrix' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class Vector {
  constructor([x,y]) {
    this.x = x
    this.y = y
  }
  add(vec) {
    this.x += vec.x
    this.y += vec.y
    return this
  }
  sub(vec) {
    this.x -= vec.x
    this.y -= vec.y
    return this
  }
  dup() {
    return new Vector([this.x,this.y])
  }
  *[Symbol.iterator]() {
    yield this.x
    yield this.y
  }
}

const RIGHT = new Vector([1,0])
const DOWN = new Vector([0,1])
const LEFT = new Vector([-1,0])
const UP = new Vector([0,-1])
const directions = [RIGHT, DOWN, LEFT, UP]
// const addVector = ([x,y],[vx,vy]) => [x+vx, y+vy]
const justToLeftOfTopLeft = new Vector([-1, 0])


export class SpiralMatrix {
  constructor(size) {
    this.grid = new Array(size).fill().map(_ => new Array(size).fill(null))
    this.size = size
  }
  compute() {
    let count = 1
    // we start one early so our first advance puts us at 0,0
    this.setCursor(justToLeftOfTopLeft)
    this.direction = RIGHT

    while(this.advanceInwards()) {
      this.setCell(count++)
    }
  }
  setCursor(cursor) {
    this.cursor = cursor
  }
  setCell(value) {
    const [x,y] = this.cursor
    this.grid[y][x] = value
  }
  rotateClockwise() {
    this.direction = directions[((directions.indexOf(this.direction) + 1) % 4)]
  }
  advanceInwards() {
    const originalDirection = this.direction
    let next = this.cursor.dup()
    next.add(this.direction)
    while (!this.canBeFilled(next)) {
      next.sub(this.direction)
      this.rotateClockwise()
      next.add(this.direction)
      // we have looped around completely, and no directions are viable
      if (this.direction === originalDirection) {
        return false
      }
    }
    this.cursor = next
    return true
  }
  canBeFilled(pos) {
    const [x,y] = pos
    return this.grid[y] && this.grid[y][x] === null
  }
  toArray() {
    return this.grid
  }

  static ofSize(size) {
    let spiral = new SpiralMatrix(size)
    spiral.compute()
    return spiral.toArray();
  }
}
