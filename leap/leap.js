Number.prototype.evenlyDivisibleBy = function(divisor) {
  return (this % divisor == 0);
}

const not = (x) => !x

export const isLeap = (year) => {
  return ((year.evenlyDivisibleBy(4) &&
    (not(year.evenlyDivisibleBy(100)) || year.evenlyDivisibleBy(400))))
};
