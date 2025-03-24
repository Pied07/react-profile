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
            <li><Link className={activeLink === 'home' ? 'navText active' : 'navText'} onClick={() => {handleActiveLink("home")}} to="/">Home</Link></li>
            <li><Link className={activeLink === 'projects' ? 'navText active' : 'navText'} onClick={() => {handleActiveLink("projects")}} to="/projects">Projects</Link></li>
            <li><Link className={activeLink === 'about' ? 'navText active' : 'navText'} onClick={() => {handleActiveLink("about")}} to="/about">About</Link></li>
            <li><Link className={activeLink === 'contacts' ? 'navText active' : 'navText'} onClick={() => {handleActiveLink("contacts")}} to="/contacts">Contact</Link></li>
        </ul>
        </div>
    </nav>
  )
}

export default NavigationBar