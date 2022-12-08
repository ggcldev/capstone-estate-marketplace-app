import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Discover from './pages/Discover'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import Sales from './pages/Sales'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <Router>
        <Routes>
          // * - Creating Pages Route
          <Route path='/' element={<Discover />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/profile' element={<SignIn />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  )
}

export default App
