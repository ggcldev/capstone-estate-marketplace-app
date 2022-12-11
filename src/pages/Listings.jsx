import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

function Listings() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(null)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docData = await getDoc(docRef)

      if (docData.exists()) {
        console.log(docData.data())
        setListing(docData.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
      {/* SLIDER */}
      {/* Option to share the listing */}
      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='Icon share' />
      </div>
      {/* If shared link copy is true then share the copied data from DB */}
      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}
      {/* Display listing details */}
      <div className='listingDetails'>
        {/* Display listing with condition : check if there's discounted price */}
        <p className='listingName'>
          {listing.name} - PHP
          {listing.offer
            ? //  ! Added Regex for format
              listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          {/* Display type Sale ? Rent */}
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {/* Check if it's a regular ? discounted price and will display the price */}
        {listing.offer && (
          <p className='discountPrice'>
            PHP{listing.regularPrice - listing.discountedPrice}Discount
          </p>
        )}
        {/* Display available bedrooms, bathrooms, etc. */}
        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathroom`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <div className='listingLocationTitle'>Location</div>
        {/* MAP */}
        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={true}
          >
            {/* Setup map available */}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />
            {/* Display marker on the map */}
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
        {/* Check if user is not signed in and nor it's listing, able to send a contact form */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Property Owner / Agent
          </Link>
        )}
      </div>
    </main>
  )
}

export default Listings
