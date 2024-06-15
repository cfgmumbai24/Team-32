import './App.css'
// import About from './components/About'
// import Carousel from './components/Carousel'
import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import {slides} from './data/carouselData.json'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home'
import { Login } from './components/pages/Login'
import Khojshala from './components/pages/Khojshala'
import Swarozgar from './components/pages/Swarozgar'
import ContactUs from './components/pages/ContactUs'


function App() {

  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/Login' element={<Login />}/>
      <Route exact path='/Khojshala' element={<Khojshala />}/>
      <Route exact path='/Swarozgar' element={<Swarozgar />}/>
      <Route exact path='/ContactUs' element={<ContactUs />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
