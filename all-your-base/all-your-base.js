// fromBase and toBase are required arguments
export const convert = (digits, fromBase = null, toBase = null) => {
  if (fromBase<=1 || !Number.isInteger(fromBase)) { throw('Wrong input base') }
  if (toBase<=1 || !Number.isInteger(toBase)) { throw('Wrong output base') }
  assertValidDigits(digits,fromBase)

  const value = toBaseTen(digits, fromBase)
  return toBaseX(value, toBase)
}

const toBaseX = (number, base) => {
  if (number==0) { return [0] } // be explicit (not technically necessary)

  let digits = []
  do {
    digits.unshift(number % (base))
    number = Math.floor(number / base)
  } while(number > 0)

  return digits
}

const toBaseTen = (digits, fromBase) => {
  // TODO : optimize if already base 10

  return digits
    .reverse()
    .map((digit, i) => digit * fromBase**i)
    .reduce((sum, n) => sum + n)
}

const assertValidDigits= (digits, fromBase) => {
  // at least one digit, may not start with leading 0
  if (digits.length==0 || digits.length>1 && digits[0]==0)  {
    throw("Input has wrong format")
  }
  // may not be less than zero
  if (digits.some((d) => d < 0)) {
    throw("Input has wrong format")
  }
  // may not be outside our given from base
  if (digits.some((d) => d >= fromBase)) {
    throw("Input has wrong format")
  }
}
