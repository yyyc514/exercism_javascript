// Luhn algorithm
// https://en.wikipedia.org/wiki/Luhn_algorithm

const fromTheRight = (list) => list.reverse()

const toggler = (start) => {
  let state = start
  return () => {
    let lastState = state; state = !state
    return lastState
  }
}

export class Luhn {
  constructor(number) {
    this.number = number.replace(/\s/g, "")
  }

  fewerThanTwoDigits() {
    return this.number.length < 2
  }

  doubleEveryOtherDigit(digits) {
    const everyOther = toggler(false)
    return digits.map(digit => {
      return everyOther()
        ? this.double(digit)
        : digit
    })
  }

  get checksum() {
    return this.doubleEveryOtherDigit(
      fromTheRight(this.digits))
      .reduce((acc,n) =>  acc + n);
  }

  double(digit) {
    let doubled = digit * 2
    return (doubled > 9) ? doubled - 9 : doubled
  }

  includesNonDigits() {
    return this.number.match(/[^0-9]/)
  }

  get digits() {
    return [...this.number].map(Number)
  }

  get valid() {
    if (this.fewerThanTwoDigits()) { return false }
    if (this.includesNonDigits()) { return false}

    return this.checksum % 10 == 0
  }
}
