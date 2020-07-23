const rand = (n) => Math.floor(Math.random() * n)

class NameRepository {
  ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  constructor() {
    this.reset()
  }

  reset() {
    this.availableNames = this.allPossibleNames()
  }

  allPossibleNames() {
    let names = []
    for (let a of this.ALPHABET) {
      for (let b of this.ALPHABET) {
        for (let i = 0; i<1000; i++) {
          names.push(`${a}${b}${i.toString().padStart(3,"0")}`)
        }
      }
    }
    return names
  }

  fetchNewName() {
    if (this.availableNames.length === 0)
      throw "no more names"

    const randomPosition = rand(this.availableNames.length)
    const name = this.availableNames[randomPosition]
    const lastName = this.availableNames.pop()
    // swap the last name into the position of the name
    // we just removed (unless we happened to randomly
    // pick the very last name already)
    if (name !== lastName)
      this.availableNames[randomPosition] = lastName

    return name
  }

}

const FACTORY = new NameRepository()

export class Robot {
  constructor() {
    this.reset()
  }

  get name() {
    return this._name;
  }

  reset() {
    this._name = FACTORY.fetchNewName()

  }
  static releaseNames() {
    FACTORY.reset()
  }
}
