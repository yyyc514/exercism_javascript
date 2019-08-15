// key solar system data
const EARTH_YEAR_in_SECONDS = 31557600
const PLANET_to_ORBIT_RATIO = { // compared to earth
  earth: 1,
  mercury: 0.2408467,
  venus: 0.61519726,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
}

// utils
const round = (n, {precision}) => Number(n.toFixed(precision))
const ageInEarthYears = (ageInSeconds) => ageInSeconds / EARTH_YEAR_in_SECONDS

// ----- ----- ----- ----- ----- ----- -----

const ageOn = (planet, ageInSeconds) =>
  round(
    ageInEarthYears(ageInSeconds) / PLANET_to_ORBIT_RATIO[planet],
    {precision: 2})

export { ageOn as age }