import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as SaleIcon } from '../assets/svg/saleOfferIcon.svg'
import { ReactComponent as DiscoverIcon } from '../assets/svg/discoverIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
  // * Initiatilize {hooks} for navigation
  const navigate = useNavigate()
  const location = useLocation()

  // * Conditional if route is selected, will show highlight and other will be light
  // * Added to each page route /*
  const pathRouteMatch = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <DiscoverIcon
              fill={pathRouteMatch('/') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            {/* Added function for checking active */}
            <p
              className={
                pathRouteMatch('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Discover
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/sales')}>
            <SaleIcon
              fill={pathRouteMatch('/sales') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            {/* Added function for checking active */}
            <p
              className={
                pathRouteMatch('/sales')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Sale
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={pathRouteMatch('/profile') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            {/* Added function for checking active */}
            <p
              className={
                pathRouteMatch('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
