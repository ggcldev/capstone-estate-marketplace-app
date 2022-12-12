import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Discover from './pages/Discover'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import Sales from './pages/Sales'
import Category from './pages/Category'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateNewListing from './pages/CreateNewListing'
import Listings from './pages/Listings'
import EditPropListing from './pages/EditPropListing'
import ContactForm from './pages/ContactForm'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Pages Route */}
          <Route path='/' element={<Discover />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/category/:categoryPart' element={<Category />} />
          <Route path='/profile' element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-listing' element={<CreateNewListing />} />
          <Route
            path='/edit-listing/:listingId'
            element={<EditPropListing />}
          />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listings />}
          ></Route>
          <Route path='/contact/:landlordId' element={<ContactForm />}></Route>
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
