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

export const value = (band_colors) => {
  var resistance = band_colors
    .map( (color) => COLOR_to_RESISTANCE.get(color) )
    .join('');
  return Number(resistance);

  // spoiled by Ruby where I could just chain a `to_i`
  // onto the end vs having to wrap the whole thing
  // in a function call (Number)
  //
  // Ruby:
  //
  // bands.map(&COLOR_to_RESISTANCE).join.to_i
  //
  // Decided I like the above better because the explicit
  // naming of resistance actually tells me something about
  // WHAT the return value is.  So keeping the longer form.

  // return Number(band_colors
  //   .map( (color) => COLOR_to_RESISTANCE[color] )
  //   .join(''));
};

