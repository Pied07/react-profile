import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavigationBar() {
  const [activeLink, setActiveLink] = useState("");

  const location = useLocation();

  useEffect(() => {
    const currentRoute = location.pathname.split("/").pop();
    setActiveLink(currentRoute || "home");
    
    const navText = document.getElementById('navText');
    navText.innerText = currentRoute || "home";
  }, [location]);

  return (
    <nav className='navigationBar'>
      <div className="navLeft">
        <h2 id='navText' style={{color: 'white'}}></h2>
      </div>
        <div className="navRight">
        <ul>
            <li><Link className={activeLink === 'home' ? 'navText active' : 'navText'} to="/react-profile/">Home</Link></li>
            <li><Link className={activeLink === 'projects' ? 'navText active' : 'navText'} to="/react-profile/projects">Projects</Link></li>
            <li><Link className={activeLink === 'about' ? 'navText active' : 'navText'} to="/react-profile/about">About</Link></li>
            <li><Link className={activeLink === 'contacts' ? 'navText active' : 'navText'} to="/react-profile/contacts">Contact</Link></li>
        </ul>
        </div>
    </nav>
  )
}

export default NavigationBar