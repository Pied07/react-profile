import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faHome, faList, faPhone, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import MyResume from '/assets/Sandipan_Resume.pdf'

function NavigationBar() {
  const [activeLink, setActiveLink] = useState("");
  const [showPanel, setShowPanel] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const currentRoute = location.pathname.split("/").pop();
    setActiveLink(currentRoute || "home");
    console.log(window.location, currentRoute)
    
    const navText = document.getElementById('navText');
    navText.innerText = currentRoute || "home";
  }, [location]);

  document.addEventListener('scroll', () => {
    const navBar = document.querySelector('.navigationBar');
    if (window.scrollY <= 500) {
      navBar.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      navBar.style.backgroundColor = 'rgba(4, 4, 100, 0.5)';
    }
  })

  const showsideBar = () => {
    const sideBar = document.querySelector('.sideBar')
    sideBar.style.right = "0"
    setShowPanel(true);
  }

  const hideSidebar = () => {
    const sideBar = document.querySelector('.sideBar')
    sideBar.style.right = "-1000px"
    setShowPanel(false);
  }

  return (
    <nav className='navigationBar'>
        <div className="navLeft">
          <h2 id='navText' style={{color: 'white'}}></h2>
        </div>
        <div className="navRight">
          <ul>
              <li><Link className={activeLink === 'home' ? 'navText active' : 'navText'} to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
              <li><Link className={activeLink === 'projects' ? 'navText active' : 'navText'} to="/projects"><FontAwesomeIcon icon={faList} /> Projects</Link></li>
              <li><Link className={activeLink === 'about' ? 'navText active' : 'navText'} to="/about"><FontAwesomeIcon icon={faUserAlt} /> About</Link></li>
              <li><Link className={activeLink === 'contacts' ? 'navText active' : 'navText'} to="/contacts"><FontAwesomeIcon icon={faPhone} /> Contact</Link></li>
              <li><a className={activeLink === 'resume' ? 'navText active' : 'navText'} href={MyResume} download><FontAwesomeIcon icon={faDownload} /> Download Resume</a></li>
              <div className="navRightIconContainer">
                <div className='navRightIcon' onClick={showsideBar}><FontAwesomeIcon icon={faList} /></div>
              </div>
          </ul>
        </div>
        <div className='sideBar' onClick={hideSidebar}>
        <ul>
              <li><Link className={activeLink === 'home' ? 'navIconText active' : 'navIconText'} to="/" onClick={hideSidebar}><FontAwesomeIcon icon={faHome} /> Home</Link></li>
              <li><Link className={activeLink === 'projects' ? 'navIconText active' : 'navIconText'} to="/projects" onClick={hideSidebar}><FontAwesomeIcon icon={faList} /> Projects</Link></li>
              <li><Link className={activeLink === 'about' ? 'navIconText active' : 'navIconText'} to="/about" onClick={hideSidebar}><FontAwesomeIcon icon={faUserAlt} /> About</Link></li>
              <li><Link className={activeLink === 'contacts' ? 'navIconText active' : 'navIconText'} to="/contacts" onClick={hideSidebar}><FontAwesomeIcon icon={faPhone} /> Contact</Link></li>
              <li><a className={activeLink === 'resume' ? 'navIconText active' : 'navIconText'} href={MyResume} onClick={hideSidebar} download><FontAwesomeIcon icon={faDownload} /> Download Resume</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default NavigationBar