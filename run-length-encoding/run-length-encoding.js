const REPEATED_SEQUENCES_RE = /(\D)\1+/g
const ENCODED_RE = /(\d+)(\D)/g

export const encode = (phrase) =>
  phrase.replace(REPEATED_SEQUENCES_RE,
    (sequence, char) => `${sequence.length}${char}`)

export const decode = (phrase) =>
  phrase.replace(ENCODED_RE, (_, count, char) => char.repeat(count))

