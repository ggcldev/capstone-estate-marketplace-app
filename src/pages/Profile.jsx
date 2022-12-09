import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

function Profile() {
  const auth = getAuth()
  // ! check if user is login
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  // ! Destructure - return name email from data
  const { name, email } = formData
  // ! import navigate
  const navigate = useNavigate()
  // ! create button for signing out
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  // ! display user name if login
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  )
}

export default Profile
