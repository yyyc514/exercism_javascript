/*

Pascals Triangle

   1
  1 1
 1 2 1
1 3 3 1

*/

const starterRow = [[1]]
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

function repeat(x, fn) {
  // while (--x) { fn(i) }
  for (let i = 0; i < x; i++) { fn(i) }
}

export class Triangle {
  constructor(height) {
    this.height = height
  }

  // to make tests happy
  get lastRow() {
    return lastItem(this.rows)
  }

  nextRow(priorRow) {
    return pairs(priorRow)
      .map(([left, right]) => left + right)
  }

  get rows() {
    let result = [...starterRow]
    let previousRow = () => lastItem(result)

    // the first row comes with starterRow, so we're building height - 1
    repeat(this.height - 1, _ =>
      result.push(this.nextRow(previousRow()))
    );
    return result
  }
}
