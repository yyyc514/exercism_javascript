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

class Grid {
  constructor(textGrid) {
    this.grid = textGrid
  }

  letterAt(x, y) {
    if (!this.grid[y]) return undefined
    return this.grid[y][x]
  }

  // walks the grid but stops when `fn` returns true
  traverseFind(fn) {
    this.grid.find((_,y) => {
      return [...this.grid[0]].find((_, x) => {
        return fn(x,y)
      })
    })
  }
}

class WordSearch {
  constructor(grid) {
    this.grid = new Grid(grid)
  }

  find(words) {
    let positions = {}
    for (let word of words) {
      positions[word] = this.findWord(word)
    }
    return positions
  }

  wordAt(word, start, vector) {
    let pos = start
    for (let letter of word) {
      if (letter !== this.grid.letterAt(...pos))
        return undefined;
      pos = addVector(pos, vector)
    }

    let len = word.length - 1
    let [vecX,vecY] = vector
    return {
      // reverse because tests want [y,x] coords
      // +[1,1] because tests top left is [1,1] not [0,0]
      start: addVector(start, [1,1]).reverse(),
      end: addVector(start, [1 + vecX*len, 1 + vecY*len]).reverse()
    }
  }

  findWord(word) {
    let result
    let firstLetter = word[0]
    this.grid.traverseFind((x,y) => {
      // first make sure we match the first character
      // to avoid a bunch of needless vector searching
      if (firstLetter !== this.grid.letterAt(x,y)) return;

      for (let vec of VECTORS) {
        if ((result = this.wordAt(word, [x,y], vec))) {
          return true;
        }
      }
    })
    return result
  }

}

export default WordSearch;
