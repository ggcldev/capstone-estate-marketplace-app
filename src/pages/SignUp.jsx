import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/kbArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibleIcon.svg'
import GoogleOAuth from '../components/GoogleOAuth'

function SignUp() {
  // * State for email and data
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  // * Destructure for global use
  const { name, email, password } = formData

  const navigate = useNavigate()

  // * Update for data state if input
  const onChange = (e) => {
    // * Set a perimeter to return an object ...
    // * Target id for email or password that called on formData (email, password)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // * Process for submitting the form
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // ! Firebase authenticate
      const auth = getAuth()
      // ! Get input from user - name, email, password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      // ! Store in a variable
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // ! Copy all input data save to variable
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong, please try again')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          {/* Email input */}
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          {/* Password input */}
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            {/* Show password image */}
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          {/* Forgot password route */}
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <GoogleOAuth />
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp
