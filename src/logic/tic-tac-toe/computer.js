import { TURN, WINNER_COMBOS } from '../../constants/tic-tac-toe'

export const computer = ({ board }) => {
  const emptyIndexCell = board
    .map((cell, index) => cell === null && index)
    .filter((indexCell) => indexCell)

  const emptyCombos = (a, b, c) => {
    return WINNER_COMBOS.find((combo) => {
      const cellsValues = combo.map((index) => board[index])
      return (
        JSON.stringify([a, b, c].sort()) === JSON.stringify(cellsValues.sort())
      )
    })
  }

  const winningCombo = emptyCombos(TURN.O, TURN.O, null)
  if (winningCombo) {
    const winIndex = winningCombo.filter((index) => !board[index])
    return winIndex
  }

  const blockCombo = emptyCombos(TURN.X, TURN.X, null)
  if (blockCombo) {
    const blockIndex = blockCombo.filter((index) => !board[index])
    return blockIndex
  }

  const nextCombo = emptyCombos(TURN.O, null, null)
  if (nextCombo) {
    const nextIndex = nextCombo.find((index) => !board[index])
    return nextIndex
  }

  const randomKey = Math.ceil(Math.random() * emptyIndexCell.length)
  const randomIndex = emptyIndexCell[randomKey]
    ? emptyIndexCell[randomKey]
    : emptyIndexCell[0]
  return randomIndex
}
