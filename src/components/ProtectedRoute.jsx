import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const ProtectedRoute = () => {
  // ! Check status if login
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <h3>Loading...</h3>
  }
  // ! If not login, will redirect to sign in page
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default ProtectedRoute
