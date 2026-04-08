import { createBrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import GamePage from '../pages/GamePage'
import SummaryPage from '../pages/SummaryPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/summary',
    element: <SummaryPage />,
  },
])

export default router

