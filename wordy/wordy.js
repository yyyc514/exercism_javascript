const SEGMENT_TO_OP = {
  "plus": (acc, n) => acc + n,
  "multiplied": (acc, n) => acc * n,
  "minus": (acc, n) => acc - n,
  "divided": (acc, n) => acc / n
}

export class ArgumentError {
  constructor(message) {
    this.message = message
  }
}

const EXTRANEOUS_BUT_ALLOWED = [ "What", "is", "by" ]

export class WordProblem {
  constructor(question) {
    this.question = question
  }
  answer() {
    this.acc = 0
    // the first number we encounter is always added to the accumulator
    this.nextOperation = SEGMENT_TO_OP.plus
    this.segments().forEach((el) => this.execSegment(el))
    return this.acc
  }

  execSegment(segment) {
    if (EXTRANEOUS_BUT_ALLOWED.includes(segment)) return
    let num

    if (num = parseInt(segment))
      return this.doOperation(num)

    this.nextOperation = SEGMENT_TO_OP[segment] || this.invalidInput()
  }

  invalidInput() {
    throw new ArgumentError("invalid input string")
  }

  doOperation(num) {
    this.acc = this.nextOperation(this.acc, num)
  }

  segments() {
    return this.question.split(" ")
  }

}

