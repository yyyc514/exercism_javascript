const DNA_to_RNA = new Map([
  ["G","C"],
  ["C","G"],
  ["T","A"],
  ["A","U"]
])
const DNA_NUCLEOTIDES = [...DNA_to_RNA.keys()].join("")
const VALID_DNA_REGEX = new RegExp(`^[${DNA_NUCLEOTIDES}]*$`);

// experimenting
const fn = (obj, method) => obj[method].bind(obj)

const assertValidDNA = (dna) => {
  if (dna.match(VALID_DNA_REGEX))
  // if ([...dna].every(c => DNA_to_RNA.has(c)))
  // if ([...dna].every(fn(DNA_to_RNA,'has')))
    return true;

  throw "invalid DNA";
}

export const toRna = (dna) => {
  assertValidDNA(dna);

  return dna.replace(/./g, (nucleotide) => DNA_to_RNA.get(nucleotide))
  // return dna.split("").every(c => DNA_TO_RNA.has(c))
};

// alternative solution
// export const toRna = (dna) => {
//   return [...dna]
//     .map((nucleotide) => DNA_to_RNA.get(nucleotide))
//     .join("");
// };

