import React from 'react'
import Carousel from '../Carousel'
import Footer from '../Footer'
import About from '../About'
import {slides} from '../../data/carouselData.json'

const Home = () => {
  return (
    <div>
     <Carousel data={slides} />   
     <About />
      <Footer/>           
    </div>
  )
}

export default Home
