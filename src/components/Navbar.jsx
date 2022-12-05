import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as SaleIcon } from '../assets/svg/saleOfferIcon.svg'
import { ReactComponent as DiscoverIcon } from '../assets/svg/discoverIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
  return (
    <footer className='navbar'>
      <nav className='navbarTag'>
        <ul className='navbarListItems'>
          <li className='navbarListItem'></li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
