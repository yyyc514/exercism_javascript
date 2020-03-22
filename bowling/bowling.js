

//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const STRIKE = 10
const SPARE = 10

const isSpare = ([a,b]) => a + b === SPARE
const isStrike = ([a,b]) => a === STRIKE

export class Bowling {
  constructor()  {
    this._rolls = []
    this._frames = []
    this._bonus = 0
    this._rollsLeft = 2
  }
  roll(pins) {
    if (this.gameOver()) throw('Cannot roll after game is over')
    if (pins<0 )
      throw('Negative roll is invalid')
    if (pins>10 )
      throw('Pin count exceeds pins on the lane')


    this._rolls.push(pins)
    this._rollsLeft -= 1
    this.addStrikeBonus(pins)
    if ((this._frames.length===9) && pins == STRIKE && this._rolls.length===1) {
      this._rollsLeft = 2
    //   return
    }
    else if (pins === STRIKE && this._frames.length < 9) {
      // if (this._frames.length===9) return
      this.endFrame()
      // this._rollsLeft = 0
    }
    if (this.rollAfterSpare()) {
      this._bonus += pins
    }

    if (this._frames.length===9 && isSpare(this._rolls) && this._rolls.length===2) {
      this._rollsLeft = 1
    }
    if (this._rollsLeft===0) {
      this.endFrame()
    }
  }

  addStrikeBonus(pins) {
    // if (this._frames.length===9 && this._rolls.length>1) return
    // let recentStrikes = this._frames.slice(-2).filter(isStrike)
    let rolls = this._rolls.slice(0,-1)
    if (this._frames.length===9) rolls = rolls.map(_ => 0)
    let recentStrikes = [...this._frames, ...rolls].flat().slice(-2).filter((x) => x===STRIKE).length
    // console.log(pins, "recent strikes", recentStrikes)
    // console.log(recentStrikes)w
    // console.log("adding bonus", (recentStrikes * pins))
    return this._bonus += (recentStrikes * pins)
  }

  finalFrame() {
    return this._frames.length === 10
  }

  firstRollofFrame() {
    return this._rolls.length === 1
  }

  rollAfterSpare() {
    let lastFrame = this._frames.slice(-1)[0]
    // console.log(lastFrame)
    return lastFrame && isSpare(lastFrame) && this.firstRollofFrame()
  }

  validateFrame([a,b,c]) {
    if (!this.finalFrame() && a+(b||0)+(c||0) > 10)
      throw('Pin count exceeds pins on the lane')
    if (this.finalFrame() && a==10) {
      if (b!=10 && (b||0)+(c||0) > 10) {
        throw('Pin count exceeds pins on the lane')
      }
    }
  }

  endFrame() {
    this._frames.push(this._rolls)
    this.validateFrame(this._rolls)
    this._rolls = []
    this._rollsLeft = 2
  }

  gameOver() {
    return this.finalFrame()
  }

  score() {

    if (!this.gameOver()) {
      throw('Score cannot be taken until the end of the game')
    }
    return this._frames.reduce((acc, [a,b,c]) => acc + a + (b || 0) + (c || 0), 0) + this._bonus;
  }
}
