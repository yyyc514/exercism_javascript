class HasCallbacks {
    constructor() {
        this.callbacks = []
    }

    addCallback(callback) {
        this.callbacks.push(callback)
    }

    removeCallback(callback) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback)
    }

    fireCallbacks() {
        this.callbacks.forEach(cb => cb.fire(this))
    }

}

class Cell extends HasCallbacks {
    constructor() {
        super();
        this.dependents = []
    }

    dependentOf(cell) {
        this.dependents.push(cell);
    }

    fire(event) {
        this.dependents.forEach(listener => listener[event]())
    }
}

export class InputCell extends Cell {
    constructor(value) {
        super()
        this._value = value
    }

    get value() {
        return this._value;
    }

    setValue(new_value) {
        if (new_value==this.value) { return }

        this._value = new_value
        this.fire("changed")
        this.fire("changesComplete")
    }
}


export class ComputeCell extends Cell {
    constructor(cells, compute) {
        super()
        this.cells = cells
        this.compute = compute
        this.registerInputs()
        this._changed = false
        this._oldvalue = this.recalc()
    }

    registerInputs() {
        this.cells.forEach(cell => cell.dependentOf(this))
    }

    get value() {
        return this._value;
    }

    recalc() {
        return this._value = this.compute(this.cells);
    }

    changed() {
        this.recalc()
        super.fire("changed")
    }

    changesComplete() {
        this._changed = this.value != this._oldvalue;
        if (this._changed ) {
            // if(this.callbacks[0])
                // console.log(`changed: ${this._oldvalue} => ${this.value}`)
            this.fireCallbacks()
            // console.log("changed to ", this.value)
            this._oldvalue = this.value
        }
        super.fire("changesComplete")
    }
}

export class CallbackCell {
    constructor(callback) {
        this.callback = callback
        this.values = []
    }

    fire(cell) {
        this.values.push(this.callback(cell))
    }
}