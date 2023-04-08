import { useReducer } from 'react'
import { TURN } from '../constants/tic-tac-toe'
import { checkEndGame, checkWinner } from '../logic/tic-tac-toe/board'
import {
  comboGameStore,
  resetGameStore,
  saveGameStore,
  winnerGameStore,
} from '../logic/tic-tac-toe/storage'

const boardStore = localStorage.getItem('board')
const turnStore = localStorage.getItem('turn')
const winnerStore = localStorage.getItem('winner')
const comboStore = localStorage.getItem('combo')

const boardInitialState = JSON.parse(boardStore) || Array(9).fill(null)
const winnerInitialState = JSON.parse(winnerStore)
const turnInitialState = turnStore || TURN.X
const comboInitialState = comboStore || []

export const gameInitialState = {
  board: boardInitialState,
  turn: turnInitialState,
  winner: winnerInitialState,
  combo: comboInitialState,
}

export const BOARD_ACTIONS = {
  UPDATE_BOARD: 'UPDATE_BOARD',
  RESET_GAME: 'RESET_GAME',
}

const UPDATE_STATE_BY_ACTION = {
  [BOARD_ACTIONS.UPDATE_BOARD]: (state, action) => {
    const { index } = action.payload
    const { board, turn, winner } = state

    if (board[index] || winner) return state

    const newBoard = [...board]
    newBoard[index] = turn
    const newTurn = turn === TURN.X ? TURN.O : TURN.X

    saveGameStore({ board: newBoard, turn: newTurn })

    const { newWinner, winCombo } = checkWinner({ board: newBoard })
    if (newWinner) {
      winnerGameStore({ winner: newWinner })
      comboGameStore({ combo: winCombo })
      return {
        ...state,
        board: newBoard,
        turn: newTurn,
        winner: newWinner,
        combo: winCombo,
      }
    } else if (checkEndGame({ board: newBoard })) {
      winnerGameStore({ winner: false })
      return {
        ...state,
        board: newBoard,
        turn: newTurn,
        winner: false,
      }
    }
    return {
      ...state,
      board: newBoard,
      turn: newTurn,
      combo: winCombo,
    }
  },
  [BOARD_ACTIONS.RESET_GAME]: (state) => {
    resetGameStore()

    return {
      ...state,
      board: Array(9).fill(null),
      turn: TURN.X,
      winner: null,
      combo: [],
    }
  },
}

export const boardReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}

export default function useBoardReducer() {
  const [{ board, turn, combo, winner }, dispatch] = useReducer(
    boardReducer,
    gameInitialState
  )
  return {
    updateBoard: ({ index }) =>
      dispatch({ type: BOARD_ACTIONS.UPDATE_BOARD, payload: { index } }),
    resetGame: () => dispatch({ type: BOARD_ACTIONS.RESET_GAME }),
    board,
    turn,
    combo,
    winner,
  }
}
