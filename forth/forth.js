
const DIGIT = /[-+]?\d+/
const OPERATOR = /^[+-/*]$/
const DEFINE_FUNC = ":"
const FUNCTION_END = ";"

const digit = (x) => x.match(DIGIT)

const operations = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide"
}

const instructions = [
    "dup",
    "drop",
    "swap",
    "over"
]

const PROGRAM_END = null

class Parser {
    constructor(program) {
        this.program = program
        this.stream = program.split(" ")[Symbol.iterator]()
        this.current = this.stream.next()
    }
    fetch() {
        let result = this.current.value
        if (this.done()) {
            return PROGRAM_END
        }
        this.current = this.stream.next()
        return result
    }
    done() {
        return this.current.done
    }
}

export class Forth {
    constructor() {
        this.stack = []
        this.userFunctions = []
    }

    evaluate(code) {
        let token
        this.parser = new Parser(code)
        while (token = this.parser.fetch()) {
            if (token==PROGRAM_END) { return }

            this._eval(token)
        }

    }

    _eval(token) {
        let lowered = token.toLowerCase()
        if (digit(token)) {
            this.push(Number(token))
        } else if (this.userFunctions[lowered]) {
            this.execUserFunc(lowered)
        } else if (token.match(OPERATOR)) {
            this[operations[token]]()
        } else if (instructions.includes(lowered)) {
            this[lowered]()
        } else if (token == DEFINE_FUNC) {
            this.defineFunction()
        } else {
            throw(`Unknown command`)
        }
    }

    execUserFunc(name) {
        let func = this.userFunctions[name]
        for (let inst of func ) {
            this._eval(inst)
        }
    }

    defineFunction() {
        let token
        let ops = []
        let name = this.parser.fetch().toLowerCase()
        if (digit(name)) {
            throw('Invalid definition')
        }
        while(token = this.parser.fetch()) {
            if (token==FUNCTION_END) break;
            ops.push(token)
        }
        this.userFunctions[name] = ops
    }

    push() {
        for (let v of arguments)
            this.stack.push(v)
    }
    pop() {
        if (this.stackEmpty) {
            throw('Stack empty')
        }
        return this.stack.pop()
    }

    get stackEmpty() {``
        return this.stack.length == 0
    }

    /* operations */

    add() {
        this.push(this.pop() + this.pop())
    }

    subtract() {
        let [a,b ] = [this.pop(), this.pop()]
        this.push(b - a)
    }

    multiply() {
        this.push(this.pop() * this.pop())
    }

    divide() {
        let [b,a] = [this.pop(), this.pop()]
        if (b==0) {
            throw('Division by zero')
        }
        this.push(Math.floor(a/ b))
    }

    dup() {
        let a = this.pop()
        this.push(a, a)
    }

    drop() {
        this.pop()
    }

    swap() {
        let [b,a] = [this.pop(), this.pop()]
        this.push(b,a)
    }

    over() {
        let [last,secondToLast] = [this.pop(), this.pop()]
        this.push(secondToLast,last,secondToLast)
    }

}