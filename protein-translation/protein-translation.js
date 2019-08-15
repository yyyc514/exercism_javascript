//
// This is only a SKELETON file for the 'Protein Translation' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const TERMINATING_CODON = [..."STOP"]

// proteins
const Methionine = "Methionine"
const Phenylalanine = "Phenylalanine"
const Leucine = "Leucine"
const Serine = "Serine"
const Tyrosine = "Tyrosine"
const Cysteine = "Cysteine"
const Tryptophan = "Tryptophan"

const CODONS_to_PROTEIN = new Map([
  [["AUG"], Methionine],
  [["UUU","UUC"], Phenylalanine],
  [["UUA","UUG"], Leucine],
  [["UCU","UCC","UCA","UCG"], Serine],
  [["UAU","UAC"], Tyrosine],
  [["UGU","UGC"], Cysteine],
  [["UGG"], Tryptophan],
  [["UAA", "UAG","UGA"], TERMINATING_CODON]
])

const codonToProtein = (codon) => {
  // not the fastest lookup, but *shrugs*
  for (let [codons, protein] of CODONS_to_PROTEIN) {
    if (codons.includes(codon)) {
      return protein;
    }
  }
}

class Codon {
  constructor(codon) {
    this.codon = codon;
  }

  terminating() {
    return this.protein() === TERMINATING_CODON;
  }

  protein() {
    const protein = codonToProtein(this.codon)
    if (!protein) { throw(`Invalid codon ${this.codon}`) }

    return protein;
  }
}

export const proteinTranslation = (rna_sequence) => {
  if (!rna_sequence) { return [] }; // explicit

  var result = []
  for (let codon of splitCodons(rna_sequence)) {
    if (codon.terminating()) break;

    result.push(codon.protein());
  }
  return result;
};

const splitCodons = (s) => s.match(/.{1,3}/g).map((c) => new Codon(c)) || []

export {
  proteinTranslation as translate
}