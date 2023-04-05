export const saveGameStore = ({ board, turn }) => {
  localStorage.setItem('board', JSON.stringify(board))
  localStorage.setItem('turn', turn)
}
export const winnerGameStore = ({ winner }) => {
  localStorage.setItem('winner', JSON.stringify(winner))
}

export const comboGameStore = ({ combo }) => {
  localStorage.setItem('combo', JSON.stringify(combo))
}
export const resetGameStore = () => {
  localStorage.removeItem('board')
  localStorage.removeItem('turn')
  localStorage.removeItem('winner')
  localStorage.removeItem('combo')
}
