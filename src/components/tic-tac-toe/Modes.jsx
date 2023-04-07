import { MODES } from '../../constants/tic-tac-toe'
import Button from './Button'

export default function Modes({ chooseMode }) {
  return (
    <main className='flex flex-col items-center'>
      <h2 className='text-slate-100 text-xl my-8'>Choose your play mode</h2>
      <Button choose={MODES.CPU} onClick={chooseMode}>
        vs Computer
      </Button>
      <Button choose={MODES.PLAYER} onClick={chooseMode}>
        vs Friend
      </Button>
    </main>
  )
}
