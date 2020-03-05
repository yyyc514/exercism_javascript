const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a, len = a.length) {
  for (let i = a.length - 1; i > a.length-len; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)]

class RobotFactory {
  constructor() {
    this.releaseNames()
  }
  releaseNames() {
    if (!this.availableNames)
      this.availableNames = shuffle(this.allPossibleNames())
    else {
      // faster boot time for subsequent releases, just throw the names back
      // into the pool and then shuffle just those back into the already
      // randomized pool
      let priorNames = [...this.takenNames,...this.returnedNames]
      this.availableNames = shuffle(this.availableNames
        .concat(priorNames), priorNames.length)
    }

    this.takenNames = new Set()
    this.returnedNames = new Set()
  }
  allPossibleNames() {
    let names = []
    for (let a of ALPHA) {
      for (let b of ALPHA) {
        for (let i = 0; i<1000; i++) {
          names.push(`${a}${b}${i.toString().padStart(3,"0")}`)
        }
      }
    }
    return names
  }
  reserveNewName() {
    let name = this.availableNames.pop()
    this.takenNames.add(name)
    return name
  }
  returnName(name) {
    this.takenNames.delete(name)
    this.returnedNames.add(name)
  }

}

const FACTORY = new RobotFactory()

export class Robot {
  constructor() {
    this.reset()
  }

  get name() {
    return this._name;
  }

  reset() {
    if (this.name)
      FACTORY.returnName(this.name);
    this._name = FACTORY.reserveNewName()

  }
  static releaseNames() {
    FACTORY.releaseNames()
  }
}
