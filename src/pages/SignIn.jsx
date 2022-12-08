import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { ReactComponent as ArrowRightIcon } from '../assets/svg/kbArrowRightIcon.svg'
// import { ReactComponent as visibilityIcon } from '../assets/svg/visibleIcon.svg'
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
  const onChange = () => {}

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form>
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

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn
