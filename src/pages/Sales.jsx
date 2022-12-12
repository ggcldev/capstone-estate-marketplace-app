import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingObject from '../components/ListingObject'

function Sales() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // ! Fetch reference from DB (Firebase)
        const listingRef = collection(db, 'listings')
        // ! Create a request - query that will take from fetching Ref
        const qry = query(
          listingRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        // ! Execute query from input
        const queryData = await getDocs(qry)

        // ! Get the length stored in Data for listings
        const lastFetchVisible = queryData.docs[queryData.docs.length - 1]
        setLastFetchedListing(lastFetchVisible)

        const listings = []
        // ! Return data from query input
        queryData.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        // ! Set loading to false if listings is displayed
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch any listings')
      }
    }

    fetchListings()
  }, [params.categoryPart])

  // ! Paginator for load more - fetch listings
  const fetchMoreListings = async () => {
    try {
      // ! Fetch reference from DB (Firebase)
      const listingRef = collection(db, 'listings')
      // ! Create a request - query that will take from fetching Ref
      const qry = query(
        listingRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )
      // ! Execute query from input
      const queryData = await getDocs(qry)
      // ! Get the length stored in Data for listings
      const lastFetchVisible = queryData.docs[queryData.docs.length - 1]
      setLastFetchedListing(lastFetchVisible)

      const listings = []
      // ! Return data from query input
      queryData.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      // ! Display previous listing and the new listings
      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch any listings')
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Sale - Limited Time offer</p>
      </header>

      {/* While loading, will get all listings depending on the DB and will display data */}
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingObject
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {/* Button for fetch listing */}
          {lastFetchedListing && (
            <p className='loadMore' onClick={fetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There's no available offers at the moment</p>
      )}
    </div>
  )
}

export default Sales
