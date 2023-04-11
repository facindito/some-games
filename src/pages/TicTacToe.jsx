import Winner from '../components/tic-tac-toe/Winner'
import Board from '../components/tic-tac-toe/Board'
import Turn from '../components/tic-tac-toe/Turn'
import Button from '../components/tic-tac-toe/Button'
import Modes from '../components/tic-tac-toe/Modes'
import { useBoard } from '../hooks/useBoard'
import useMode from '../hooks/useMode'

export default function TicTacToe() {
  const { resetGame } = useBoard()
  const { chooseMode, chageMode, mode } = useMode()

  return (
    <div className='font-game flex flex-col justify-center items-center'>
      <h1 className='text-4xl text-center text-slate-100 mb-4'>Tic Tac Toe</h1>

      {!mode && <Modes chooseMode={chooseMode} />}
      {mode && (
        <>
          <Turn />
          <Board />
          <Winner />
          <Button onClick={resetGame}>Reset</Button>
          <Button onClick={chageMode}>Change Mode</Button>
        </>
      )}
    </div>
  )
}
