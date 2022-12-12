import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'

import { toast } from 'react-toastify'

import ListingItem from '../components/ListingObject'

import arrowRight from '../assets/svg/kbArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
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
  // ! Function to get Data from collection DB using async
  useEffect(() => {
    const fetchUserListing = async () => {
      const listingsRef = collection(db, 'listings')
      // ! Store reference in a variable
      const qry = query(
        listingsRef,
        // ! Check if same with userID, display timestamp
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )
      // ! Pass query to a variable after initialize
      const queryDoc = await getDocs(qry)
      // ! Initialize with array
      let listings = []

      queryDoc.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }
    fetchUserListing()
  }, [auth.currentUser.uid])

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
  // ! Function for Delete
  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure to remove the item?')) {
      // ! access listings from DB - firebase using ID, process await
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing !== listingId
      )
      setListings(updatedListings)
      toast.success('You have remove your listing')
    }
  }
  // ! Function for Edit
  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

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
        {/* // ! Display data information - w - Delete / Edit */}
        {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
