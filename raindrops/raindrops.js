//
// This is only a SKELETON file for the 'Raindrops' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const divisibleBy = (num, d) => num % d === 0

export const convert = (num) => {
  let out = "";
  if (divisibleBy(num, 3)) out += "Pling";
  if (divisibleBy(num, 5)) out += "Plang";
  if (divisibleBy(num, 7)) out += "Plong";

  if (out === "")
    out = String(num);

  return out;
};
