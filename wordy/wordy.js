const NAMED_OPERATIONS = {
  "plus": (acc, n) => acc + n,
  "multiplied by": (acc, n) => acc * n,
  "minus": (acc, n) => acc - n,
  "divided by": (acc, n) => acc / n
}

export class ArgumentError {
}

// A term is either "[word]* [number]" or simply "[word]"
// the latter matches trailing words that usually indicate an error
// for example: "What is 32" or "divided by -29".
const TERM = /((?:[a-z]+\s?)+)\s([^ ?]+)|\w+/gi

class Op {
  constructor({op, value}) {
    this.op = op;
    this.value = Number(value);
  }

  calculate(acc) {
    if (!NAMED_OPERATIONS[this.op]) throw new ArgumentError();
    return NAMED_OPERATIONS[this.op](acc, this.value);
  }
}

export class WordProblem {
  constructor(question) {
    // we always add the first value we find after "What is" so just hack the
    // string vs hard code this in Op as an edge case
    this.question = question.replace(/^What is/,"plus")
  }
  answer() {
    return [...this.question.matchAll(TERM)]
      .map(x => new Op({ op: x[1], value: x[2]}))
      .reduce((acc,op) => op.calculate(acc),0)
  }
}

