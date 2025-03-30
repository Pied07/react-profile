import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'

function Contacts() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', attachment: null })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let button = document.querySelector('.formSubmitBtn')
            button.innerText = "Sending..."
            button.disabled = true
            button.style.cursor = "not-allowed"
            await emailjs.sendForm('service_l7u1fki', 'template_b8u3f33', e.target, '0THP0IQVaxvRQvv9V')
            button.innerText = "Submit"
            button.disabled = false
            button.style.cursor = "pointer"
            alert(`Thank You ${formData['name']}, Your Message Has been Submitted Successfully!!!`)
        } catch (error) {
            alert('Error Sending Message!!!')
        }
    }
  return (
    <>
        <div className="contactContainer">
            <h1>Contact Me</h1>
            <div className="contactItems">
                <Link to="tel:+919733413928" className="cardContainer">
                        <div className="cardTitle"><FontAwesomeIcon icon={faPhone} /></div>
                        <div className="cardElement">
                            <p>Contact Me</p>
                        </div>
                </Link>
                <Link to='mailto:sandipanadhikary01@gmail.com' className="cardContainer">
                    <div className="cardTitle"><FontAwesomeIcon icon={faEnvelope} /></div>
                    <div className="cardElement">
                        <p>Email Me</p>
                    </div>
                </Link>
                <Link to='https://www.linkedin.com/in/sandipan-adhikary-ab418b230/' target='_blank' className="cardContainer">
                    <div className="cardTitle"><FontAwesomeIcon icon={faLinkedin} /></div>
                    <div className="cardElement">
                        <p>LinkedIn Profile</p>
                    </div>
                </Link>
            </div>
            <div className='contactFormContainer'>
                <h2>Want to Contact me directly from website? Please write yout message here...</h2><br />
                <form className="contactForm" onSubmit={handleSubmit}>
                    <input type="text" name='name' placeholder='Your name...' value={formData.name} onChange={handleChange} required/>
                    <input type="email" name='email' placeholder='Your Email...' value={formData.email} onChange={handleChange} required />
                    <input type="text" name="subject" id="subject" placeholder='Your Subject...' onChange={handleChange} required />
                    <textarea name="message" id="message" placeholder='Type Your Message here...' value={formData.message} onChange={handleChange} required />
                    <button className='formSubmitBtn'>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Contacts