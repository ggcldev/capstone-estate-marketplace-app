import { Link } from 'react-router-dom'
import rentCategoryImg from '../assets/jpg/rentCat.jpg'
import saleCategoryImg from '../assets/jpg/saleCat.jpg'
import Slider from '../components/Slider'
import Hero from '../components/Hero/Hero'

function Discover() {
  return (
    <div className='discover'>
      <header>
        <Hero />
        <p className='pageHeader'>Discover</p>
      </header>

      <main>
        <Slider />
        <h2 className='discoverCategoryHeading'>Categories</h2>
        <div className='discoverCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImg}
              alt='Rent'
              className='discoverCategoryImg'
            />
            <h3 className='discoverCategoryName'>Places for rent</h3>
          </Link>
          <Link to='/category/sale'>
            <img
              src={saleCategoryImg}
              alt='Sell'
              className='discoverCategoryImg'
            />
            <h3 className='discoverCategoryName'>Places for sale</h3>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Discover
