import { createContext, useReducer } from 'react'
import { BOARD_ACTIONS, boardReducer, gameInitialState } from '../reducer/board'

export const BoardContext = createContext()

function useBoardReducer() {
  const [{ board, turn, combo, winner }, dispatch] = useReducer(boardReducer, gameInitialState)

  const updateBoard = ({ index }) =>
    dispatch({
      type: BOARD_ACTIONS.UPDATE_BOARD,
      payload: { index },
    })

  const resetGame = () => dispatch({ type: BOARD_ACTIONS.RESET_GAME })

  return {
    updateBoard,
    resetGame,
    board,
    turn,
    combo,
    winner,
  }
}

export default function BoardProvider({ children }) {
  const { updateBoard, resetGame, board, turn, combo, winner } = useBoardReducer()

  return (
    <BoardContext.Provider value={{ board, turn, combo, winner, updateBoard, resetGame }}>
      {children}
    </BoardContext.Provider>
  )
}
