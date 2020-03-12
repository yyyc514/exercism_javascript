const pairedBrackets = {
  "{": "}",
  "[": "]",
  "(": ")"
}

const openingBrackets = Object.keys(pairedBrackets)
const closingBrackets = Object.values(pairedBrackets)
const isOpeningBracket = (c) => openingBrackets.includes(c)
const isClosingBracket = (c) => closingBrackets.includes(c)

const bracketPair = (lastOpen, potentialClose) => {
  let expectedClose = pairedBrackets[lastOpen]
  return potentialClose === expectedClose
}

export const isPaired = (data) => {
  const allBracketsAreClosed = () => openBrackets.length === 0
  let openBrackets = []

  for (let c of data) {
    if (isOpeningBracket(c)) {
      openBrackets.push(c)
    } else if (isClosingBracket(c)) {
      let lastOpen = openBrackets.pop()
      if (!bracketPair(lastOpen, c))
        // a single failure to match up means the whole string
        // fails the pairing test
        return false;
    } else {
      // if not a bracket, ignore character and proceed to next
    }
  }
  return allBracketsAreClosed()
};
