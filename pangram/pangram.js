const ALPHABET_SIZE = 26

export const isPangram = (phrase) =>
  new Set(phrase.toLowerCase().match(/[a-z]/g)).size == ALPHABET_SIZE

