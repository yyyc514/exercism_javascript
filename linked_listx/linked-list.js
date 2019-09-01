class Node {
    constructor(data) {
        this.data = data
    }
}

const tapData = (v, fn) => { fn(v); return v.data }
const TAIL = "tail"
const HEAD = "head"

export class LinkedList {
    constructor () {
        this.head = this.tail = null
    }

    push (data) {
        this.insert(data, TAIL)
    }

    unshift(data) { // add to beginning
        this.insert(data, HEAD)
    }

    empty () {
        return this.head == null
    }

    pop () {
        return this.remove(this.tail).data
    }

    shift() {
        return this.remove(this.head).data
    }

    delete(data) {
        let node = this.findNode(data)
        if (node) this.remove(node)
    }

    count() {
        let count = 0
        let node = this.head
        while (node) {
            node = node.next
            count++
        }
        return count
    }

    // private api

    findNode(data) {
        let node = this.head
        while (node) {
            if (node.data == data) {
                return node
            }
            node = node.next
        }
        return null
    }

    setFirst (nodeornull) {
        this.head = this.tail = nodeornull
    }

    checkEmpty() {
        if (!this.head || !this.tail) {
            this.setFirst(null)
        }
    }

    insert(data, where) {
        let node = new Node(data)
        let old_bookend = this[where]

        if (this.empty()) {
            this.setFirst(node)
        } else if (where==TAIL) {
            old_bookend.next = node
            node.previous = old_bookend
        } else {
            old_bookend.previous = node
            node.next = old_bookend
        }
        this[where] = node
    }

    remove(node) {
        if (node==this.head) {
            this.head = this.head.next
        } else if (node==this.tail) {
            this.tail = this.tail.previous
            this.tail && (this.tail.next = null)
        } else {
            node.previous.next = node.next
            node.next.previous = node.previous
        }
        this.checkEmpty();
        return node
    }
}