const distance = (x,y) => Math.sqrt( x*x + y*y )
const NOTHING = 0
const worth = (x) => x
const SCORE = 1

class Score {
  constructor(score, {distance, _circle}) {
    this.score = score
    this.distance = distance
  }
}

const rewards = [
  new Score(10, {distance: 1, circle: "inner"}),
  new Score(5, {distance: 5, circle: "middle"}),
  new Score(1, {distance: 10, circle: "outer"}),
  // new Score(0, {distance: Infinity, circle: "MISS"})
]

// on the edge counts as within
const isTossWithin = (toss, rewardDistance) => toss <= rewardDistance

const scoreToss = (x, y) => {
  const tossDist = distance(x,y)
  const reward = rewards.find(reward => isTossWithin(tossDist,reward.distance))
  return reward ? reward.score : 0
};

export {scoreToss as solve}
