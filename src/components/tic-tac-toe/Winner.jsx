import { useBoard } from '../../hooks/useBoard'

export default function Winner() {
  const { winner } = useBoard()

  if (winner === null) return null

  const text = winner ? `Winner is : ${winner}` : 'Draw'
  return <div className='text-slate-100 text-center text-xl'>{text}</div>
}
