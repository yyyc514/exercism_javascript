const ISBN_LENGTH = 10
const DIVIDER = /-/g

export const isValid = (isbn) => {
  let digits = isbn
    .replace(DIVIDER,"")
    .split("")
    .map(digitValue)

  // all valid ISBN-10 numbers must be 10 digits
  if (digits.length !== ISBN_LENGTH)
    return false

  // 0-9 are allowed, the last digit may also be X (10)
  if (!validDigits(digits))
    return false

  const [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10] = digits;
  const checksum = ((x1 * 10) + (x2 * 9) + (x3 * 8) +
                    (x4 * 7 ) + (x5 * 6) + (x6 * 5) +
                    (x7 * 4 ) + (x8 * 3) + (x9 * 2) + (x10 * 1))

  return checksum % 11 === 0
  // return isbnChecksum(digits) % 11 === 0
};

/*************************************** */

const validDigits = digits =>
  digits.every(Number.isInteger) &&
  // only the very last digit is allowed to be X/10
  exceptLast(digits).every(notX)

const notX = digit => digit < 10
const exceptLast = arr => arr.slice(0, arr.length-1)
const digitValue = digit => digit === "X" ? 10 : Number(digit)

const isbnChecksum = ([x1, x2, x3, x4, x5, x6, x7, x8, x9, x10]) =>
  x1 * 10 + x2 * 9 + x3 * 8 + x4 * 7  + x5 * 6 +
  x6 * 5 + x7 * 4  + x8 * 3 + x9 * 2 + x10


