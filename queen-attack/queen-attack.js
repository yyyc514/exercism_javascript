const sameSpace = (piece, other) => piece[0] == other[0] && piece[1] == other[1]
const BOARD_EDGE = 8

export class QueenAttack {
    constructor(pieces= { white: [0, 3], black: [7, 3] }) {
        this.white = pieces.white
        this.black = pieces.black

        if (sameSpace(this.white, this.black)) {
            throw('Queens cannot share the same space')
        }
    }
    toString() {
        var out = ""
        for (let y=0; y < BOARD_EDGE; y++) {
            for (let x=0; x < BOARD_EDGE; x++) {
                out += this.squareAt(x,y) + " "
            }
        out = out.trim() + "\n"
        }
        return out
    }

    pieceAt(x,y, piece) {
        return piece[0] == y && piece[1] == x
    }

    squareAt(x,y) {
        if (this.pieceAt(x,y, this.white)) {
            return "W"
        } else if (this.pieceAt(x,y, this.black)) {
            return "B"
        } else { return "_" }
    }

    canAttack() {
        return this.sameRow() || this.sameColumn() || this.sameDiagonal()
    }

    sameDiagonal() {
        return Math.abs(this.white[0]-this.black[0]) ==
            Math.abs(this.white[1]-this.black[1])
    }

    sameColumn() {
        return this.white[1] == this.black[1]
    }

    sameRow() {
        return this.white[0] == this.black[0]
    }
}