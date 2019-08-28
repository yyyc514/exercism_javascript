import { Grid } from "./grid.js"

const MINE = "*"
const BLANK = " "
const isMine = (icon) => icon == MINE

export const annotate = (board) => {
	let grid = new Grid(board.map((row) => [...row]))
	grid.visitEachSquare((x,y,contents) => {
		if (isMine(contents)) { return }

		let nearbyBombs = grid
			.cellsAdjacentTo(x,y)
			.filter(isMine)
			.length

		grid.setSquare(x,y, nearbyBombs ? nearbyBombs : BLANK)
	})

	return grid.toString()
}