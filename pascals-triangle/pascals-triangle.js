/*

Pascals Triangle

   1
  1 1
 1 2 1
1 3 3 1

*/

const pascalsTriangleSeed = [[1]]
const lastItem = (list) => list[list.length-1]

/*
Pairs numbers in a given row to make it easy to calculate the next.

- 0s on the outside edges are implied.

row:      [      1      3      3      1      ]
           \   /  \   /  \   /  \   /  \   /
returns: [ [0,1], [1,3], [3,3], [3,1], [1,0] ]
*/
const pairs = (row) => {
  row = [0, ...row]
  return row.map((v,i) => [row[i],row[i+1] || 0])
}

export class Triangle {
  constructor(height) {
    this.height = height
  }

  get lastRow() {
    return lastItem(this.rows)
  }

  nextRow(priorRow) {
    return pairs(priorRow)
      .map(([leftValue, rightValue]) => leftValue + rightValue)
  }

  get rows() {
    var result = [...pascalsTriangleSeed]
    var previous = lastItem(result)
    while (result.length < this.height) {
      var row = this.nextRow(previous)
      result.push(row)
      previous = row
    }
    return result
  }
}
