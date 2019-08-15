const dnaCounter = () => new Map([["A", 0],["C", 0],["G", 0],["T", 0]])
const incrKey = (map, el) => map.set(el, map.get(el) + 1)
const not = (x) => !x

// experimental
function unless(cond, func) {
  if (!cond) { func() }
}

const assertValidDNA = (dna) => {
  // if (not(dna.match(/^[ACGT]*$/))) {
    // throw "Invalid nucleotide in strand"
  // }
  unless(dna.match(/^[ACGT]*$/), _ =>
    { throw "Invalid nucleotide in strand" })
}

export class NucleotideCounts {

  static parse(strand) {
    assertValidDNA(strand)

    let counts = dnaCounter()
    for (let nucleotide of strand) {
      incrKey(counts, nucleotide)
    }
    return [...counts.values()].join(" ")
  }
}
