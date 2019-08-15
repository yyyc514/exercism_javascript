// Luhn algorithm
// https://en.wikipedia.org/wiki/Luhn_algorithm

const toggle = (x) => !x
const fromTheRight = (list) => list.reverse()

export class Luhn {
  constructor(number) {
    this.number = number.replace(/\s/g, "")
  }

  fewerThanTwoDigits() {
    return this.number.length < 2
  }

  get checksum() {
    let every_other_digit = false
    return fromTheRight(this.digits).reduce((sum,digit) => {
      if (every_other_digit) {
        sum += this.double(digit)
      } else {
        sum += digit
      }
      every_other_digit = toggle(every_other_digit);
      return sum;
    },0);
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
