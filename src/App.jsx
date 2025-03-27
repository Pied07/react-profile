import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import About from './components/About/About'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Contacts from './components/Contacts/Contacts'
import Projects from './components/Projects/Projects'
import './App.css'

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div className="glow" style={{ left: `${position.x}px`, top: `${position.y}px`}}></div>
      <Router basename='/react-profile/'>
        <div>
          <NavigationBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/about' element={<About />} />
            <Route path='/contacts' element={<Contacts />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
