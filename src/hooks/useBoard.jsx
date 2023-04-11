import { useContext } from 'react'
import { BoardContext } from '../context/board'

export function useBoard() {
  const context = useContext(BoardContext)

  if (context == null) throw new Error(`You can't useBoard outside of BoardProvider`)

  return context
}
