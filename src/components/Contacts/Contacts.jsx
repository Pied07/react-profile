import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Contacts() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank You ${formData['name']}, Your Message Has been Submitted Successfully!!!`)
    }
  return (
    <>
        <div className="contactContainer">
            <h1>Contact Me</h1>
            <div className="contactItems">
                <div className="cardContainer">
                    <div className="cardTitle"><FontAwesomeIcon icon={faPhone} /></div>
                    <div className="cardElement">
                        <p>My Contact Number: <a href="tel:+919733413928">Call Me</a></p>
                    </div>
                </div>
                <div className="cardContainer">
                    <div className="cardTitle"><FontAwesomeIcon icon={faEnvelope} /></div>
                    <div className="cardElement">
                        <p>My Email Account: <a href="mailto:sandipanadhikary01@gmail.com">Mail Me</a></p>
                    </div>
                </div>
                <div className="cardContainer">
                    <div className="cardTitle"><FontAwesomeIcon icon={faLinkedin} /></div>
                    <div className="cardElement">
                        <p>Check my LinkedIn Profile <a href="">Here</a></p>
                    </div>
                </div>
            </div>
            <div className='contactFormContainer'>
                <h2>Want to Contact me directly from website? Please write yout message here...</h2><br />
                <form className="contactForm" onSubmit={handleSubmit}>
                    <input type="text" name='name' placeholder='Your name...' value={formData.name} onChange={handleChange} required/>
                    <input type="email" name='email' placeholder='Your Email...' value={formData.email} onChange={handleChange} required />
                    <textarea name="message" id="message" placeholder='Type Your Message here...' value={formData.message} onChange={handleChange} required />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Contacts