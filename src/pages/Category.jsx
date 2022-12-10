import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // ! Fetch reference from DB (Firebase)
        const listingRef = collection(db, 'listings')
        // ! Create a request - query that will take from fetching Ref
        const qry = query(
          listingRef,
          where('type', '==', params.categoryPart),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        // ! Execute query from input
        const queryData = await getDocs(qry)

        const listings = []

        queryData.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch any listings')
      }
    }

    fetchListings()
  }, [params.categoryPart])
  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryPart === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <h3 key={listing.id}>{listing.data.name}</h3>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryPart}</p>
      )}
    </div>
  )
}

export default Category
