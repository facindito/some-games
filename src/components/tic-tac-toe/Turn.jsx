import { TURN } from '../../constants/tic-tac-toe'

export default function Turn({ turn }) {
  return (
    <header
      className={`flex justify-center items-center mb-4 border-2 rounded-md border-slate-100 w-fit relative text-slate-100 before:w-1/2 before:bg-slate-100 before:absolute before:h-full before:left-0 ${
        turn === TURN.X ? 'before:translate-none ' : 'before:translate-x-full'
      } before:transition-transform before:duration-300`}
    >
      <div className={`z-10 px-4 py-1 ${turn === TURN.X && 'text-black'}`}>
        X
      </div>
      <div className={`z-10 px-4 py-1 ${turn === TURN.O && 'text-black'}`}>
        O
      </div>
    </header>
  )
}
