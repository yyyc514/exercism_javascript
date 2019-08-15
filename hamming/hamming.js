const hammingDistance = (strandA, strandB) => {
  // validation
  if (empty(strandA) && empty(strandB)) {
    return 0;
  } else if (empty(strandA)) {
    throw "left strand must not be empty"
  } else if (empty(strandB)) {
    throw "right strand must not be empty"
  } else if (strandA.length !== strandB.length) {
    throw "left and right strands must be of equal length"
  }

  // for a normal/boring solution see "for loop" below in comments

  // processing
  return count(lazy.zip(strandA,strandB), ([a,b]) => a !== b )
};

// utils

const empty = (s) => !s.length

const count = (list, callback) => {
  let count = 0
  for (let el of list) {
    if (callback(el)) {
      count +=1
    }
  }
  return count;
}

const lazy = {
  zip: (a,b) => {
    const [i, j] = [a[Symbol.iterator](), b[Symbol.iterator]()]
    let left, right

    return {
      [Symbol.iterator] : function* () {
        while (true) {
          [left, right] = [i.next(), j.next()]
          if (left.done) break;
          yield [left.value, right.value]
        }
      }
    }
  }
}

export { hammingDistance as compute }

// --- EXPERIMENTS / alternatives ---

// let distance = 0

  // --- iterators

  // let left, right
  // let [a,b] = [strandA[Symbol.iterator](), strandB[Symbol.iterator]()]
  // do {
  //   [left, right] = [a.next(), b.next()]
  //   if (left.value && left.value !== right.value)
  //     distance += 1;

  // } while (!left.done)

  // --- for loop

  // for (let i=0; i< strandA.length; i++) {
  //   if (strandA[i] != strandB[i]) {
  //     distance += 1
  //   }
  // }

  // --- for of / iterator

  // let it = strandB[Symbol.iterator]();
  // for (let left of strandA) {
  //   if (left != it.next().value) {
  //     distance += 1
  //   }
  // }