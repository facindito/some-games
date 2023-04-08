import { useEffect, useState } from 'react'
import { modeGameStore, resetGameMode } from '../logic/tic-tac-toe/storage'
import { computer } from '../logic/tic-tac-toe/computer'
import { MODES, TURN } from '../constants/tic-tac-toe'
import Winner from '../components/tic-tac-toe/Winner'
import Board from '../components/tic-tac-toe/Board'
import Turn from '../components/tic-tac-toe/Turn'
import Button from '../components/tic-tac-toe/Button'
import Modes from '../components/tic-tac-toe/Modes'
import useBoardReducer from '../reducer/board'

export default function TicTacToe() {
  const [mode, setMode] = useState(() => {
    const modeStore = localStorage.getItem('mode')
    return JSON.parse(modeStore)
  })

  const { updateBoard, resetGame, board, turn, combo, winner } =
    useBoardReducer()

  useEffect(() => {
    if (turn === TURN.X || mode === MODES.PLAYER || winner) return
    const index = computer({ board })
    updateBoard({ index })
  }, [board])

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
