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
          <Route path='/' element={<Discover />}></Route>
          <Route path='/sales' element={<Sales />}></Route>
          <Route path='/profile' element={<SignIn />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        </Routes>
        <Navbar />
      </Router>
    </>
  )
}

export default App
