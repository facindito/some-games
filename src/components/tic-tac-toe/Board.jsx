export default function Board({ board, combo, updateBoard }) {
  return (
    <div className='border border-slate-100 rounded-sm grid grid-cols-3 mb-4'>
      {board.map((cell, index) => {
        return (
          <div
            key={index}
            className={`${
              combo?.includes(index) && 'bg-green-500'
            } w-[100px] h-[100px] border-2 border-slate-100 cursor-pointer flex items-center justify-center text-5xl text-slate-100`}
            onClick={() => updateBoard({ index })}
          >
            {cell}
          </div>
        )
      })}
    </div>
  )
}
