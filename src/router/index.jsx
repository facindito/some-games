import { createBrowserRouter } from 'react-router-dom'
import TicTacToe from '../pages/TicTacToe'
import Home from '../pages/Home'
import App from '../App'
import BoardProvider from '../context/board'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/tic-tac-toe',
        element: (
          <BoardProvider>
            <TicTacToe />
          </BoardProvider>
        ),
      },
    ],
  },
])
