export default function Button({ children, onClick, choose }) {
  return (
    <button
      className='border-2 border-slate-100 rounded-md text-slate-100 text-center text-xl p-2 w-full mt-4 hover:bg-green-500'
      onClick={() => onClick(choose)}
    >
      {children}
    </button>
  )
}
