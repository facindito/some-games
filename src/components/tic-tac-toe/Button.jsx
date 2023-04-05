export default function Button({ children, onClick }) {
  return (
    <button
      className='border-2 border-slate-100 rounded-md text-slate-100 text-center text-xl p-2 w-full mt-4'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
