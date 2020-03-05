const OPS = {
  "plus": (acc, n) => acc + n,
  "multiplied": (acc, n) => acc * n,
  "minus": (acc, n) => acc - n,
  "divided": (acc, n) => acc / n
}

export class ArgumentError {
  constructor(message) {
    this.message = message;
  }
}

const EXTRANEOUS_BUT_ALLOWED = [ "What", "is", "by" ]

export class WordProblem {
  constructor(question) {
    this.question = question
  }
  answer() {
    this.acc = 0;
    // the first number we encounter is always added to the accumulator
    this.operation = OPS.plus
    this.segments().forEach((el) => this.parseSegment(el))
    return this.acc;
  }

  parseSegment(segment) {
    let operation = OPS[segment];
    if (operation) { return (this.operation = operation) };

    if (EXTRANEOUS_BUT_ALLOWED.includes(segment)) return;

    // only possibility left is a number (or error case)
    this.executeOperation(parseInt(segment))
  }
  executeOperation(num) {
    if (isNaN(num)) throw new ArgumentError("invalid input string")

    this.acc = this.operation(this.acc, num);
  }
  segments() {
    return this.question.split(" ")
  }

}

