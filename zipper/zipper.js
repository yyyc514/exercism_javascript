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
        let copy = this._cloneSelf()
        copy.focus.left = node
        return copy
    }

    setRight(node) {
        let copy = this._cloneSelf()
        copy.focus.right = node
        return copy
    }

    setValue(v) {
        let copy = this._cloneSelf()
        copy.focus.value = v
        return copy
    }

    _cloneSelf() {
        return this.newZipperFocus(this.focus)
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