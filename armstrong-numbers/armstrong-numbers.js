
const isArmstrongNumber = (number) => {
  const digits = number.toString()
  const power = digits.length;

  // const sum = [...digits].reduce((acc, el) => acc + el ** power, 0)
  const sum = [...digits].map((el) => el ** power).sum()
  // return sum
  return sum === number
}

// utils
Array.prototype.sum = function(f = (x) => x, initial = 0)  {
  return this.reduce((acc, el) => acc + f(el), initial)
}

export {
  isArmstrongNumber as validate
}