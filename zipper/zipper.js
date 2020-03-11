export function deepClone(node) {
    let fresh = Object.assign({}, node)
    for (let key in node) {
        if (typeof fresh[key] === "object")
            fresh[key] = fresh[key] && deepClone(fresh[key])
    }
    return fresh
}

export class Zipper {
    static fromTree(tree) {
        return new Zipper(deepClone(tree))
    }

    constructor(focus, {parent} = {}) {
        this.focusNode = focus
        this.parent = parent
    }

    // when we request a zipper for a non existent node
    // we will get null instead
    newZipper(node) {
        return node && new Zipper(node, {parent: this})
    }

    left() {
        return this.newZipper(this.focusNode.left)
    }

    right() {
        return this.newZipper(this.focusNode.right)
    }

    setLeft(node) {
        return this._cloneSelf({left: node})
    }

    setRight(node) {
        return this._cloneSelf({right: node})
    }

    setValue(v) {
        return this._cloneSelf({value: v})
    }

    _cloneSelf(data) {
        Object.assign(this.focusNode,data)
        return this.newZipper(this.focusNode)
    }

    value() {
        return this.focusNode.value
    }

    up() {
        if (this.isRoot) return null;

        return new Zipper(this.parent.focusNode, {parent: this.parent.parent})
    }

    get isRoot() {
        return !this.parent
    }

    // returns the top-most node (ie, the full tree)
    toTree() {
        let node = this
        while (node.parent) {
            node = node.parent
        }
        return node.focusNode
    }

}