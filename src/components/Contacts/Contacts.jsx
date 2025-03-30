import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import emailjs from '@emailjs/browser'

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
            await emailjs.sendForm('service_l7u1fki', 'template_b8u3f33', e.target, '0THP0IQVaxvRQvv9V')
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
                    <input type="text" name="subject" id="subject" placeholder='Your Subject...' onChange={handleChange} required />
                    <textarea name="message" id="message" placeholder='Type Your Message here...' value={formData.message} onChange={handleChange} required />
                    <label htmlFor="attachment">Add Any File</label>
                    <input className='attachment' type="file" name='attachment' id='attachment' onChange={handleChange} />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Contacts