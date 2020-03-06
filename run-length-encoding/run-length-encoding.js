const encodeSequence = (sequence, char) => {
  const repeat = sequence.length == 1 ? "" : sequence.length
  return `${repeat}${char}`
}

const decodeSequence = (_, length,char) => {
  return char.repeat(length)
}

const REPEATED_GROUPS_REGEX = /(.)\1*/g
const ENCODED_REGEX = /(\d+)(.)/g

export const encode = (phrase) => {
  return phrase.replace(REPEATED_GROUPS_REGEX, (...args) => encodeSequence(...args)
  )
};

export const decode = (phrase) => {
  return phrase.replace(ENCODED_REGEX, (...args) => decodeSequence(...args))
};
