import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavigationBar() {
    const [activeLink, setActiveLink] = useState("")

    const handleActiveLink = (linkName) => {
        setActiveLink(linkName);
    }

  return (
    <nav className='navigationBar'>
        <ul>
            <li><Link className={activeLink === 'home' ? 'navText active' : 'navText'} onClick={() => {handleActiveLink("home")}} to="/">Home</Link></li>
            <li><Link className={activeLink === 'about' ? 'navText active' : 'navText'} onClick={() => {handleActiveLink("about")}} to="/about">About</Link></li>
            <li><Link className={activeLink === 'contacts' ? 'navText active' : 'navText'} onClick={() => {handleActiveLink("contacts")}} to="/contacts">Contact</Link></li>
        </ul>
    </nav>
  )
}

export default NavigationBar