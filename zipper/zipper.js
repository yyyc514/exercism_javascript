export function deepClone(node) {
    let fresh = Object.assign({}, node)
    fresh.left = fresh.left && deepClone(fresh.left)
    fresh.right =  fresh.right && deepClone(fresh.right)
    return fresh
}

export class Zipper {
    static fromTree(tree) {
        return new Zipper(deepClone(tree))
    }

    constructor(focus, {parent} = {}) {
        this.focus = focus
        this.parent = parent
    }

    newZipperFocus(node) {
        return new Zipper(node, {parent: this})
    }

    left() {
        return this.focus.left && this.newZipperFocus(this.focus.left)
    }

    right() {
        return this.focus.right && this.newZipperFocus(this.focus.right)
    }

    setLeft(node) {
        this.focus.left = node
        return this
    }

    setRight(node) {
        this.focus.right = node
        return this
    }

    setValue(x) {
        this.focus.value = x
        return this
    }

    value() {
        return this.focus.value
    }

    up() {
        return this.parent ? this.parent : null;
    }

    toTree() {
        return this.parent ? this.parent.toTree() : this.focus
    }

}