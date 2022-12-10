import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../firebase.config'
import { updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/kbArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()
  // ! For edit/change details
  const [changeDetails, setChangeDetails] = useState(false)
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

  // ! Initiate edit mode
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore database
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Error in updating, please try again')
    }
  }

  const onChange = (e) => {
    // ! Get previous state and return the object
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
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

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          {/* edit personal details */}
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {/* To check if it's true in mode */}
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>List your property</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
      </main>
    </div>
  )
}

export default Profile
