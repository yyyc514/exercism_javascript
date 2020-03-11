export const COLOR_to_RESISTANCE = new Map([
  ["black", 0],
  ["brown", 1],
  ["red", 2],
  ["orange", 3],
  ["yellow", 4],
  ["green", 5],
  ["blue", 6],
  ["violet", 7],
  ["grey", 8],
  ["white", 9],
]);

const resistanceValue = (color) =>
  COLOR_to_RESISTANCE.get(color)


export const value = ([colorA, colorB]) =>
  resistanceValue(colorA) * 10 + resistanceValue(colorB)


