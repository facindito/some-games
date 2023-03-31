import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='h-screen grid place-items-center'>
      <Outlet />
    </div>
  )
}

export default App
