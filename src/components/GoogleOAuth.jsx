import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function GoogleOAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      // !  Get the user ID from Google sign in
      const user = result.user
      // ! Passing the user ID reference to the document for checking
      const docRef = doc(db, 'users', user.uid)
      // ! Save the reference from docRef to docData
      const docData = await getDoc(docRef)

      // ! Check if user ID is exist in database, create one if not
      if (!docData.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      // ! Once sign in, direct to main page
      navigate('/')
    } catch (error) {
      toast.error('Unable to authorize, please try again or later')
    }
  }
  return (
    <div className='socialLogin'>
      <p>
        Sign {location.pathname === '/sign-up' ? 'up' : 'in'}
        with
      </p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='Google' />
      </button>
    </div>
  )
}

export default GoogleOAuth
