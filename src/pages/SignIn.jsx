import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import GoogleOAuth from '../components/GoogleOAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/kbArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibleIcon.svg'

function SignIn() {
  // * State for email and data
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  // * Destructure for global use
  const { email, password } = formData

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

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Wrong User Credentials')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
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
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <GoogleOAuth />
        <Link to='/sign-up' className='registerLink'>
          Sign up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn
