const encodeSequence = (sequence) => {
  const repeat = sequence.length == 1 ? "" : sequence.length
  return `${repeat}${sequence[0]}`
}

const decodeSequence = (sequence) => {
  let length = parseInt(sequence)
  let char = sequence.substr(-1)
  return char.repeat(length)
}

const REPEATED_GROUPS_REGEX = /(.)\1*/g
const ENCODED_REGEX = /\d+./g

export const encode = (phrase) => {
  return phrase.replace(REPEATED_GROUPS_REGEX, (match) => encodeSequence(match)
  )
};

export const decode = (phrase) => {
  return phrase.replace(ENCODED_REGEX, (match) => decodeSequence(match))
};
