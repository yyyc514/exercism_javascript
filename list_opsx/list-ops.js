const withNewList = (fn) => {
  let list = new List()
  fn(list)
  return list
}

export class List {
  constructor(items = []) {
    this._items = [...items]
  }

  // yes, this is meant to modify in place AFAICT from my
  // understanding of the instructions
  append(other) {
    other.forEach(el => this.push(el) )
    return this
  }

  concat(list_of_lists) {
    return withNewList((all) => {
      // using forEach on lists_of_lists, not proxying array functions
      // so I think this is valid give the usage
      //
      // otherwise list_of_lists.unshift(this).forEach...
      [this,...list_of_lists].forEach(list => all.append(list))
    })
  }

  filter(filterFunc) {
    return withNewList((list) => {
      this.forEach(el => filterFunc(el) && list.push(el))
      // for (let el of this) {
        // if (filterFunc(el))

      // }
    })
  }

  map(mapFunc) {
    return withNewList((list) => {
      this.forEach(el => list.push(mapFunc(el)))
    })
  }

  forEach(func) {
    for (let el of this) {
      func(el)
    }
  }

  length(item) {
    let c = 0
    for (let _ of this) c++
    return c
  }

  push(item) {
    this._items = [...this, item]
  }

  unshift(item) {
    this._items = [item, ...this]
  }

  get values() {
    return [...this]
  }

  foldl(foldFunc, acc) {
    for (let el of this) {
      acc = foldFunc(acc, el)
    }
    return acc
  }

  foldr(foldFunc, acc) {
    return this.reverse().foldl(foldFunc, acc)
  }

  reverse() {
    return withNewList((list) => {
      this.forEach(el => list.unshift(el))
    })
  }

  // just borrow array's iterator
  [Symbol.iterator]() {
    return this._items[Symbol.iterator]()
  }
}
