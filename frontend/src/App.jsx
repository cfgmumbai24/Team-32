import './App.css'
import About from './components/About'
import Carousel from './components/Carousel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {slides} from './data/carouselData.json'
import {createBrowserRouter } from 'react-router-dom'

function App() {
 const router = createBrowserRouter([{
  path:"/frontend/src/components/About.jsx",
  element:<About/>
 },{
 }])
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
