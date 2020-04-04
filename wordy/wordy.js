const throws = (err) => { throw err }
const OPERATIONS = {
  "plus": (acc, n) => acc + n,
  "multiplied by": (acc, n) => acc * n,
  "minus": (acc, n) => acc - n,
  "divided by": (acc, n) => acc / n
}
const VALID_OPS = Object.keys(OPERATIONS)

class TermStream {
  constructor(stream) {
    this.terms = stream
  }
  peek() {
    return this.terms[0]
  }
  fetchNext() {
    return this.terms.shift()
  }
  consumeNumber() {
    return Number(this.fetchNext()) || null
  }
  consume(term) {
    let current = this.fetchNext()
    return current === term ? term : null
  }
}

export class WordProblem {
  constructor(question) {
    if (question.endsWith("?"))
      question = question.replace("?","")

    this.stream = new TermStream(question.split(" "))
  }
  answer() {
    this.expect("What")
    this.expect("is")

    let acc = this.expectNumber();
    while(this.more()) {
      let [op, operand] = this.expectOperation();
      acc = OPERATIONS[op](acc, operand)
    }

    return acc
  }
  expectOperation() {
    return [this.expectOp(), this.expectNumber()]
  }
  expect(term) {
    this.stream.consume(term) || throws(new Error("Unknown operation"))
  }
  expectNumber() {
    return this.stream.consumeNumber() || throws(new Error("Syntax error"))
  }
  expandMultiWordOp(op) {
    if (this.stream.peek()==="by") {
      this.stream.fetchNext()
      op = `${op} by`
    }
    return op
  }
  expectOp() {
    let op = this.stream.fetchNext()
    // for some reason we want a numeric error if the op is a number
    // vs an invalid opcode error - blame it on the specs
    if (Number(op)) throw new Error("Syntax error")

    op = this.expandMultiWordOp(op)
    if (!VALID_OPS.includes(op)) throw new Error("Unknown operation")
    return op
  }
  more() {
    return this.stream.peek()
  }
}

export const answer = (question) => {
  return new WordProblem(question).answer()
}
