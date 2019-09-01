const PLANTS = {
  R: "radishes",
  C: "clover",
  G: "grass",
  V: "violets"
}

const DEFAULT_STUDENTS = [
  "Alice", "Bob", "Charlie", "David",
  "Eve", "Fred", "Ginny", "Harriet",
  "Ileana", "Joseph", "Kincaid", "Larry"
]

export class Garden {
  constructor(diagram ,studentList) {
    this.plantRows = diagram.split("\n")
    this.students = (studentList || DEFAULT_STUDENTS)
      .map((x) => x.toLowerCase())
      .sort()
    return new Proxy(this, {
       get: (_, student) =>  this.planetsFor(student)
    })
  }

  potsAt(index) {
    return this.plantRows.map ((row) =>
      row.slice(index*2,index*2+2))
      .join("")
      .split("")
  }

  planetsFor(student) {
    let index = this.students.indexOf(student)
    // console.log(student)
    // console.log(index)
    return this.potsAt(index).map(pot => PLANTS[pot])
  }

}
