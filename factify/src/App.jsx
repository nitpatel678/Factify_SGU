import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/About'
import Team from './components/Team'
import Footer from './components/Footer'
import ClaimSummary from './components/ClaimSummary'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Hero/>
     <ClaimSummary/>
     <AboutUs/>
     <Team/>
     <Footer/>
    </>
  )
}

export default App
