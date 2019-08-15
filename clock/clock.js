// always returns a positive result, like Ruby (fixed underflow)
const absModulus = (dividend, divisor) => ((dividend % divisor) + divisor) % divisor
// pads clock digits so 8h1m becomes "08:01"
const clockDigits = (digits) => `${digits}`.padStart(2, "0")
// return both the result of division and modulus
const divmod = (n, divisor) => [Math.floor(n / divisor), n % divisor]

const MINUTES_each_HOUR = 60
const MINUTES_each_DAY = MINUTES_each_HOUR * 24

export class Clock {
  constructor(hours = 0, minutes = 0) {
    this._minutes = absModulus((minutes + (hours*MINUTES_each_HOUR)), MINUTES_each_DAY)
  }

  // get minutes() { return this._minutes }
  // set minutes(n) { this._minutes = n }

  toString() {
    const [hour, min] = divmod(this._minutes, MINUTES_each_HOUR)
    return `${clockDigits(hour)}:${clockDigits(min)}`
  }

  plus(minutes) {
    return new Clock(0, this._minutes + minutes)
  }

  minus(minutes) {
    return new Clock(0, this._minutes - minutes)
  }

  equals(other) {
    return other._minutes === this._minutes
  }
}
