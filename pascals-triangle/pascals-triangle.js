/*

Pascals Triangle

   1
  1 1
 1 2 1
1 3 3 1

*/

const FIRST_ROW = [1]
const lastItem = (list) => list[list.length-1]

/*
Pairs numbers in a given row to make it easy to calculate the next.

- 0s on the outside edges are implied.

row:      [      1      3      3      1      ]
           \   /  \   /  \   /  \   /  \   /
returns: [ [null,1], [1,3], [3,3], [3,1], [1,null] ]
*/
const pairs = (row) => {
  // null works here because JS will auto-typecast it to 0 when we use it in a
  // numeric context and null is a better representation of the "non-data" from
  // outside the triangle
  row = [null, ...row]
  return row.map((_,i) => [row[i],row[i+1] || null])
}

function repeat(x, fn) {
  // while (--x) { fn(i) }
  for (let i = 0; i < x; i++) { fn(i) }
}
function *times(x) {
  for (let i = 0; i < x; i++) { yield(i) }
}

export class Triangle {
  constructor(height) {
    this.height = height
  }

  // to make tests happy
  get lastRow() {
    return lastItem(this.rows)
  }

  // in Pascals triangle the next row is computed from the prior row
  nextRow(priorRow) {
    if (!priorRow) return FIRST_ROW;

    return pairs(priorRow)
      .map(([left, right]) => left + right)
  }

  get rows() {
    let result = []
    let previousRow = () => lastItem(result)

    // return [...times(this.height)].reduce((acc, el) => {
    //   acc.push(this.nextRow(lastItem(acc)))
    //   return acc
    // },[])
    repeat(this.height, _ =>
      result.push(this.nextRow(previousRow()))
    );
    return result
  }
}
