const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

import { shuffle } from "./shuffle.js"

class RobotFactory {
  constructor() {
    this.reset()
  }
  static singleton() {
    RobotFactory.__SINGLETON = RobotFactory.__SINGLETON || new RobotFactory()
    return RobotFactory.__SINGLETON
  }
  reset() {
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
  fetchNewName() {
    let name = this.availableNames.pop()
    this.takenNames.add(name)
    return name
  }
  returnName(name) {
    this.takenNames.delete(name)
    this.returnedNames.add(name)
  }

}

export class Robot {
  constructor() {
    this.reset()
  }

  static factory() {
    return RobotFactory.singleton()
  }

  get name() {
    return this._name;
  }

  reset() {
    if (this.name)
      Robot.factory().returnName(this.name);
    this._name = Robot.factory().fetchNewName()

  }
  static releaseNames() {
    this.factory().reset()
  }
}
