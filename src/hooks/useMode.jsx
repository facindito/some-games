import { useEffect, useState } from 'react'
import { useBoard } from './useBoard'
import { MODES, TURN } from '../constants/tic-tac-toe'
import { computer } from '../logic/tic-tac-toe/computer'
import { modeGameStore, resetGameMode } from '../logic/tic-tac-toe/storage'

export default function useMode() {
  const [mode, setMode] = useState(() => {
    const modeStore = localStorage.getItem('mode')
    return JSON.parse(modeStore)
  })

  const { board, turn, winner, updateBoard, resetGame } = useBoard()

  const chooseMode = (choose) => {
    setMode(choose)
    modeGameStore({ mode: choose })
  }

  const chageMode = () => {
    setMode(null)
    resetGame()
    resetGameMode()
  }

  useEffect(() => {
    if (turn === TURN.X || mode === MODES.PLAYER || winner) return
    const index = computer({ board })
    updateBoard({ index })
  }, [board])

  return {
    chooseMode,
    chageMode,
    mode,
  }
}
