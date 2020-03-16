//
// This is only a SKELETON file for the 'Variable length Quantity' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const encode = (values) => {
  return values.map(encodeValue).flat()
};

const encodeValue = (value) => {
  let out = [];
  // 8th bit clear means this is the end of our encoded value
  out.unshift(bitsToEncode(value));
  while ((value = value >>> 7)) {
    // 8th bit set means our value continues into the next byte
    out.unshift(VALUE_CONTINUES | bitsToEncode(value) )
  }
  return out
}

export const decode = (byteStream) => {
  // no need to decode at all if the last byte of the sequence appears
  // to be invalid
  if (!lastByte(lastItem(byteStream)))
    throw("Incomplete sequence")

  let values = []
  let buffer = 0;
  for (let byte of byteStream) {
    buffer = (buffer << 7) + encodedBits(byte);
    if (lastByte(byte)) {
      values.push(toUnsignedInt(buffer))
      buffer = 0;
    }
  }
  return values
};

const encodedBits = (x) => x & 0x7F
const bitsToEncode = encodedBits
const VALUE_CONTINUES = 0x80
const lastByte = (b) => (b & VALUE_CONTINUES) === 0
const toUnsignedInt = (v) => v >>> 0
const lastItem = (arr) => arr[arr.length-1]
