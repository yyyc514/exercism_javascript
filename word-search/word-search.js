//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

// function reverseString(str) {
//   return str.split("").reverse().join("");
// }

// function flip(result) {
//   return {start: result.end, end: result.start }
// }

// function transpose(result) {
//   return {start: result.start.reverse(), end: result.end.reverse() }
// }

const VECTORS = [
  [1,0], // left-to-right
  [-1,0], // right-to-left
  [0,1], // top-to-bottom
  [0,-1], // bottom to top
  [1,1], // top left to bottom right
  [-1,-1], // bottom right to top left
  [1,-1], // bottom left to top right
  [-1,1] // top right to bottom left
]

function addVector(pos, vec) {
  return [pos[0] + vec[0], pos[1] + vec[1]]
}

class WordSearch {
  constructor(grid) {
    this.grid = grid
    // transposed grid is used for top-bottom searches
    // this.transposed = this.grid.map((_, i) => this.grid.map(el => el[i]).join(""))
  }

  find(words) {
    let positions = {}
    for (let word of words) {
      positions[word] = this.findWord(word)
    }
    return positions
  }
  findWord(word) {
    return this.findEvery(word)
  }
  charAt(x, y) {
    if (!this.grid[y]) return undefined
    return this.grid[y][x]
  }
  wordAt(word, start, vector) {
    let pos = start
    let [vecX,vecY] = vector
    for (let letter of word) {
      if (letter !== this.charAt(...pos))
        return false;
      pos = addVector(pos, vector)
    }
    let len = (word.length-1)
    return {
      // reverse because tests want [y,x] coords
      // +[1,1] because tests top left is [1,1] not [0,0]
      start: addVector(start, [1,1]).reverse(),
      end: addVector(start, [1 + vecX*len, 1 + vecY*len]).reverse()
    }
  }
  findEvery(word) {
    let result
    this.grid.find((_,y) => {
      return [...this.grid[0]].find((_, x) => {
        // first make sure we match the first character
        // to avoid a funch of needless searching
        if (word[0] === this.charAt(x,y)) {
          for (let vec of VECTORS) {
            if (result = this.wordAt(word, [x,y], vec)) {
              return result;
            }
          }
        }
      })
    })
    return result === false ? undefined : result
  }
  findBottomToTop(word) {
    word = reverseString(word)
    let result = this.findLeftToRight(word, this.transposed)
    if (result) {
      return transpose(flip(result))
    }
  }
  findTopToBottom(word) {
    let result = this.findLeftToRight(word, this.transposed)
    if (result)
      return transpose(result)
  }
  findRightToLeft(word) {
    word = reverseString(word)
    let result = this.findLeftToRight(word)
    if (result) {
      return flip(result)
    }
  }
  findLeftToRight(word, grid = this.grid) {
    let result
    grid.find((row, rowIndex) => {
      let index = row.indexOf(word)
      if (index!=-1) {
        result = {
          start: [rowIndex+1, index+1],
          end: [rowIndex+1, index+word.length]
        }
      }
    })
    return result
  }
}

export default WordSearch;
