export const lines = (string) => string.split("\n")
export const tap = (obj, func) => { // ala Ruby's tap
  func(obj);
  return obj;
}

export const emptyGrid = ({width, height}) => {
  return new Array(width).fill(null).map(() => new Array(height))
}

export const traverseGrid = ({width, height}) => {
  return {
    *[Symbol.iterator]() {
      for (let x=0; x < width; x++) {
        for (let y=0; y < height; y++) {
          yield [x, y]
        }
      }
    }
  }
}