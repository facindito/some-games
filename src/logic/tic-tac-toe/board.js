import { WINNER_COMBOS } from '../../constants/tic-tac-toe'

export const checkWinner = ({ board }) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { newWinner: board[a], winCombo: [a, b, c] }
    }
  }
  return { newWinner: null }
}
export const checkEndGame = ({ board }) => {
  return board.every((cell) => cell !== null)
}
