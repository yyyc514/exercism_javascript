class Node {
    constructor(data, linkage = {}) {
        this.data = data
        this.next = linkage.next
        this.previous = linkage.previous
    }
}

export class LinkedList {
    constructor () {
        this.head = null
        this.tail = null
    }

    push (item) {
        let old_tail = this.tail
        let node = new Node(item)
        if (this.empty()) { return this.add_first(node) }
        old_tail.next = node
        node.previous = old_tail
        this.tail = node
    }

    unshift(item) { // add to beginning
        let node = new Node(item)
        if (this.empty()) { return this.add_first(node) }
        let old_head = this.head
        this.head = node
        old_head.previous = this.head
        this.head.next = old_head
    }

    empty () {
        return this.head == null
    }

    pop () {
        let old_tail = this.tail
        this.tail = old_tail.previous
        if (this.tail) { this.tail.next = null }
        this.checkEmpty();
        return old_tail.data
    }

    shift() {
        let old_head = this.head
        this.head = old_head.next
        this.checkEmpty()
        return old_head.data
    }

    delete(item) {
        let node = this.head
        while (node) {
            if (node.data == item) {
                if (node==this.head) {
                    this.shift()
                } else if (node==this.tail) {
                    this.pop()
                } else {
                    node.previous.next = node.next
                    node.next.previos = node.previous
                }
            }
            node = node.next
        }
    }

    count(item) {
        let c = 0
        item = this.head
        while (item) {
            item = item.next
            c++
        }
        return c
    }

    // private api

    add_first (node) {
        this.head = node
        this.tail = node
    }

    checkEmpty() {
        if (this.head == null) {
            this.tail=null
        } else if (this.tail == null) {
            this.head=null
        }
    }

}