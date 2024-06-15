import './App.css'
import About from './components/About'
import Carousel from './components/Carousel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {slides} from './data/carouselData.json'
import { Routes,Route } from 'react-router-dom'


function App() {

  return (
    <>
    <Routes>
      <Route path='./components/Login.jsx' element={<Login />} />
      <Navbar />
      <Carousel data={slides}/>
      <About />
      <Footer/>
    </Routes>
    </>
  )
}

export default App
