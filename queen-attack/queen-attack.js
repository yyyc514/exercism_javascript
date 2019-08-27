const BOARD_EDGE = 8

class Square {
    constructor([rank,file]) {
        this.rank = rank
        this.file = file
    }

    sameSquare(other) {
        return this.sameFile(other) && this.sameRank(other)
    }

    sameDiagonal(other) {
        return Math.abs(this.file-other.file) ==
            Math.abs(this.rank-other.rank)
    }

    sameRank(other) {
        return this.rank == other.rank
    }

    sameFile(other) {
        return this.file == other.file
    }
}

class Piece extends Square {
}

export class QueenAttack {
    constructor(pieces= { white: [0, 3], black: [7, 3] }) {
        // to make the tests happy
        this.white = pieces.white
        this.black = pieces.black

        if (this.whiteQueen.sameSquare(this.blackQueen)) {
            throw('Queens cannot share the same space')
        }
    }

    get whiteQueen() {
        return new Piece(this.white)
    }

    get blackQueen() {
        return new Piece(this.black)
    }

    toString() {
        var out = ""
        for (let rank=0; rank < BOARD_EDGE; rank++) {
            for (let file=0; file < BOARD_EDGE; file++) {
                out += this.pieceAt(new Square([rank,file])) + " "
            }
        out = out.trim() + "\n"
        }
        return out
    }


    pieceAt(square) {
        if (this.whiteQueen.sameSquare(square)) {
            return "W"
        } else if (this.blackQueen.sameSquare(square)) {
            return "B"
        } else { return "_" }
    }

    canAttack() {
        return this.whiteQueen.sameFile(this.blackQueen)
            || this.whiteQueen.sameRank(this.blackQueen)
            || this.whiteQueen.sameDiagonal(this.blackQueen)
    }

}