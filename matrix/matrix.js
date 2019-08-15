const lines = (string) => string.split("\n")
const tap = (obj, func) => { // ala Ruby's tap
  func(obj);
  return obj;
}

const transpose = (grid) => {
  const height = grid.length
  const width = grid[0].length
  return tap([], (transposed) => {
    for (let x=0; x < width; x++) {
      transposed.push([])
      for (let y=0; y < height; y++) {
        transposed[x][y] = grid[y][x]
      }
    }
  })
}

export class Matrix {
  constructor(matrix) {
    this.matrix = matrix
  }

  get rows() {
    return lines(this.matrix).map((row) => row.match(/\d+/g).map(Number))
  }

  get columns() {
    return transpose(this.rows)
  }

}
