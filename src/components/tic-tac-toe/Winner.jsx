export default function Winner({ winner }) {
  if (winner === null) return null

  const text = winner ? `Winner is : ${winner}` : 'Draw'
  return <div className='text-slate-100 text-center text-xl'>{text}</div>
}
