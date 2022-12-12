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
        <h2 className='discoverCategoryHeading'>Categories</h2>
        <div className='discoverCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImg}
              alt='Rent'
              className='discoverCategoryImg'
            />
            <h3 className='discoverCategoryName'>
              Looking for a place to stay?
            </h3>
          </Link>
          <Link to='/category/sale'>
            <img
              src={saleCategoryImg}
              alt='Sell'
              className='discoverCategoryImg'
            />
            <h3 className='discoverCategoryName'>Find your next home?</h3>
          </Link>
        </div>
        <Slider />
      </main>
    </div>
  )
}

export default Discover
