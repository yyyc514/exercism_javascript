// https://simple.wikipedia.org/wiki/Gigasecond
const ONE_GIGASECOND = 1e9; // one billion seconds

const toMillis = (n) => n * 1000

export const gigasecond = date =>
  new Date(date.getTime() + toMillis(ONE_GIGASECOND) )

