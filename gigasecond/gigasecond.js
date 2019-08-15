// https://simple.wikipedia.org/wiki/Gigasecond
const ONE_GIGASECOND = 1e9; // one billion seconds
const MS_PER_SECOND = 1000

export const gigasecond = date =>
  new Date(date.getTime() + ONE_GIGASECOND * MS_PER_SECOND )

