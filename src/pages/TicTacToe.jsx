import { useEffect, useState } from 'react'
import {
  saveGameStore,
  winnerGameStore,
  resetGameStore,
  comboGameStore,
  modeGameStore,
  resetGameMode,
} from '../logic/tic-tac-toe/storage'
import { checkWinner, checkEndGame } from '../logic/tic-tac-toe/board'
import { computer } from '../logic/tic-tac-toe/computer'
import { MODES, TURN } from '../constants/tic-tac-toe'
import Winner from '../components/tic-tac-toe/Winner'
import Board from '../components/tic-tac-toe/Board'
import Turn from '../components/tic-tac-toe/Turn'
import Button from '../components/tic-tac-toe/Button'
import Modes from '../components/tic-tac-toe/Modes'

export default function TicTacToe() {
  const [board, setBoard] = useState(() => {
    const boardStore = localStorage.getItem('board')
    return boardStore ? JSON.parse(boardStore) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnStore = localStorage.getItem('turn')
    return turnStore ?? TURN.X
  })
  const [winner, setWinner] = useState(() => {
    const winnerStore = localStorage.getItem('winner')
    return JSON.parse(winnerStore)
  })
  const [combo, setCombo] = useState(() => {
    const comboStore = localStorage.getItem('combo')
    return JSON.parse(comboStore)
  })
  const [mode, setMode] = useState(() => {
    const modeStore = localStorage.getItem('mode')
    return JSON.parse(modeStore)
  })

  useEffect(() => {
    if (turn === TURN.X || mode === MODES.PLAYER || winner) return
    const index = computer({ board })
    updateBoard({ index })
  }, [board])

  const updateBoard = ({ index }) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)

    saveGameStore({ board: newBoard, turn: newTurn })

    const { newWinner, winCombo } = checkWinner({ board: newBoard })
    if (newWinner) {
      setWinner(newWinner)
      setCombo(winCombo)
      winnerGameStore({ winner: newWinner })
      comboGameStore({ combo: winCombo })
    } else if (checkEndGame({ board: newBoard })) {
      setWinner(false)
      winnerGameStore({ winner: false })
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
    setCombo([])

    resetGameStore()
  }

  const chooseMode = (choose) => {
    setMode(choose)

    modeGameStore({ mode: choose })
  }

  const chageMode = () => {
    setMode(null)

    resetGame()
    resetGameMode()
  }

  return (
    <div className='font-game flex flex-col justify-center items-center'>
      <h1 className='text-4xl text-center text-slate-100 mb-4'>Tic Tac Toe</h1>

      {!mode && <Modes chooseMode={chooseMode} />}
      {mode && (
        <>
          <Turn turn={turn} />
          <Board board={board} combo={combo} updateBoard={updateBoard} />
          <Winner winner={winner} />
          <Button onClick={resetGame}>Reset</Button>
          <Button onClick={chageMode}>Change Mode</Button>
        </>
      )}
    </div>
  )
}
