import './App.css'
// import About from './components/About'
// import Carousel from './components/Carousel'
import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import {slides} from './data/carouselData.json'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home'
import { Login } from './components/pages/Login'
import JobDetail from './components/jobDetails'
import Jobs from './components/pages/Jobs'
import ContactUs from './components/pages/ContactUs'
import { Signup } from './components/pages/Signup'
import Courses from './components/pages/Courses'
import Forum from './components/pages/Forum'
import Mentorship from './components/pages/Mentorship'


function App() {

  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/Login' element={<Login />}/>
      <Route exact path='/Signup' element={<Signup />}/>
      <Route exact path='/Jobs' element={<Jobs />}/>
      <Route exact path='/ContactUs' element={<ContactUs />}/>
      <Route exact path='/Courses' element={<Courses />}/>
      <Route exact path='/Forum' element={<Forum />}/>
      <Route exact path='/Mentorship' element={<Mentorship />}/>
      <Route path="/job/:id" element={<JobDetail />} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App

App.js