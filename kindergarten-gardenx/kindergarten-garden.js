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


const linesOf = (x) => x.split("\n")

export class Garden {
  constructor(diagram, studentList = DEFAULT_STUDENTS) {
    this.diagram = diagram
    this.students = studentList
      .map(x => x.toLowerCase())
      .sort()
    return new Proxy(this, {
       get: (_, student) =>  this.plantsFor(student)
    })
  }

  // The window and plants
  //
  // 0  1  2  3        (indexes)
  // [w in do w][window][window]
  // VR CG VV RVCGGCCGVRGCVCGCGV
  // VR CC CG CRRGVCGCRVVCVGCGCV
  //
  // postsAt(2) => V,V,C, G
  potsAt(index) {
    return linesOf(this.diagram)
      .map ((row) => row.slice(index*2,index*2+2))
      .join("")
      .split("")
  }

  plantsFor(student) {
    let index = this.students.indexOf(student)
    return this.potsAt(index).map(pot => PLANTS[pot])
  }
}
