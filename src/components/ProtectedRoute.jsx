import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const ProtectedRoute = () => {
  // ! Check status if login
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }
  // ! If not login, will redirect to sign in page
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default ProtectedRoute
