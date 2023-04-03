import { useState } from 'react'

const TURN = {
  X: 'X',
  O: 'O',
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

function Winner({ winner }) {
  if (winner === null) return null

  const text = winner ? `Winner is : ${winner}` : 'Draw'
  return <div className='text-slate-100 text-center text-xl'>{text}</div>
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURN.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const checkWinner = (board) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
  }

  const checkEndGame = (board) => {
    return board.every((cell) => cell !== null)
  }
  return (
    <div>
      <h1 className='text-4xl text-center text-slate-100 mb-4'>Tic Tac Toe</h1>
      <div className='flex justify-center items-center mb-4'>
        <div
          className={`border-2 border-slate-100 rounded-l-md px-4 py-1 text-slate-100 border-r-0 ${
            turn === TURN.X && 'bg-slate-100 text-black'
          }`}
        >
          X
        </div>
        <div
          className={`border-2 border-slate-100 rounded-r-md px-4 py-1 text-slate-100 border-l-0 ${
            turn === TURN.O && 'bg-slate-100 text-black'
          }`}
        >
          O
        </div>
      </div>
      <div className='border border-slate-100 rounded-sm grid grid-cols-3 mb-4'>
        {board.map((cell, index) => {
          return (
            <div
              key={index}
              className='w-[100px] h-[100px] border-2 border-slate-100 cursor-pointer flex items-center justify-center text-5xl text-slate-100'
              onClick={() => updateBoard(index)}
            >
              {cell}
            </div>
          )
        })}
      </div>
      <Winner winner={winner} />
      <button
        className='border-2 border-slate-100 rounded-md text-slate-100 text-center text-xl p-2 w-full mt-4'
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  )
}
