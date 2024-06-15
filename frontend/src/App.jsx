import './App.css'
import About from './components/About'
import Carousel from './components/Carousel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {slides} from './data/carouselData.json'

function App() {

  return (
    <>
      <Navbar />
      <Carousel data={slides}/>
      <About />
      <Footer/>
    </>
  )
}

export default App
