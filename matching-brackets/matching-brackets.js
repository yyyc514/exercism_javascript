const openAndClosingBrackets = {
  "{": "}",
  "[": "]",
  "(": ")"
}

const opening = Object.keys(openAndClosingBrackets)
const closing = Object.values(openAndClosingBrackets)

const isOpeningBracket = (c) => opening.includes(c)
const isClosingBracket = (c) => closing.includes(c)

export const isPaired = (data) => {
  let stack = []
  for (let char of data) {
    if (isOpeningBracket(char)) {
      // console.log("open", char)
      stack.push(char)
    } else if (isClosingBracket(char)) {
      let lastOpen = stack.pop()
      let expectedClose = openAndClosingBrackets[lastOpen]
      if (char != expectedClose) {
        // console.log(`found ${char}, want ${expectedClose}`)
        return false
      }
    }
  }
  if (stack.length > 0 )
    return false

  return true;

  // throw new Error("Remove this statement and implement this function");
};
