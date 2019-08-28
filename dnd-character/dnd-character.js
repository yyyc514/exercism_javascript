//
// This is only a SKELETON file for the 'DnD Character' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const CONSTITUTION_MIN = 3
const CONSTITUTION_MAX = 18
const BASE_HP = 10
const D6_DICE = "D6"

const sum = (list) => list.reduce((acc, n) => acc + n, 0)
const rollDice = (sides) => Math.floor(Math.random() * sides) + 1
const roll = (times, dice) => {
  let sides = Number(dice.match(/\d+/))
  return new Array(times).fill(0).map(_ => rollDice(sides))
}
const largest = (count, list) => list.sort((a,b) => a-b ).slice(0, count)


export const abilityModifier = (constitution) => {
  if (constitution < CONSTITUTION_MIN) {
    throw("Ability scores must be at least 3")
  }
  if (constitution > CONSTITUTION_MAX) {
    throw("Ability scores can be at most 18")
  }
  return Math.floor((constitution - 10) / 2)
};

const attributes = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma"
]

export class Character {

  constructor() {
    this.setupAttributes()
  }

  setupAttributes() {
    for (let attr of attributes) {
      this[`_${attr}`] = Character.rollAbility()
      Object.defineProperty(this, attr, { get: () => this[`_${attr}`] } )
    }
  }

  static rollAbility() {
    return sum(
      largest(3,
        roll(4, D6_DICE))
    )
  }

  get hitpoints() {
    return BASE_HP + abilityModifier(this.constitution)
  }
}
