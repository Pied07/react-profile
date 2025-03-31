import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faSchool, faGraduationCap, faBriefcase, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import Instaily from '../../assets/Instaily_Certification.jpg'

function About() {
  return (
    <>
        <div className="aboutContainer">
            <h1>About Me</h1>
            <h3>Check My TimeLine Till now</h3>
            <div className="aboutTimeLineContainer">
              <VerticalTimeline lineColor="green">
                <VerticalTimelineElement
                  className="aboutTimeLineComponents"
                  contentStyle={{ background: 'rgb(33, 150, 243)', color: '#000' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={<FontAwesomeIcon icon={faBirthdayCake} />}
                >
                  <h3 className="vertical-timeline-element-title">My Birth</h3>
                  <span className='aboutTimeLineDate'>Date: 2001</span>
                  <h4 className="vertical-timeline-element-subtitle">Place: India,West Bengal, Durgapur</h4>
                  <p>
                    I was born in a small town called Durgapur, West Bengal, India. It is known for its industrial development and educational institutions.
                    I spent my early years in this town, where I developed a love for technology and computers.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="aboutTimeLineComponents"
                  contentStyle={{ background: 'rgb(243, 222, 33)', color: '#000' }}
                  contentArrowStyle={{ borderRight: '7px solid  rgb(243, 222, 33)' }}
                  iconStyle={{ background: 'rgb(243, 222, 33)', color: '#fff' }}
                  icon={<FontAwesomeIcon icon={faSchool} />}
                >
                  <h3 className="vertical-timeline-element-title">My School</h3>
                  <span className='aboutTimeLineDate'>Date: 2006 - 2018</span>
                  <h4 className="vertical-timeline-element-subtitle">Name: St Michael's School</h4>
                  <p>
                    I attended St Michael's School, where I received my primary and secondary education. The school provided a strong foundation in academics and extracurricular activities, fostering my curiosity and creativity. It was during these years that I developed a passion for learning and teamwork, which have been instrumental in shaping my personality and career aspirations.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="aboutTimeLineComponents"
                  contentStyle={{ background: 'skyblue', color: '#000' }}
                  contentArrowStyle={{ borderRight: '7px solid  skyblue' }}
                  iconStyle={{ background: 'skyblue', color: '#fff' }}
                  icon={<FontAwesomeIcon icon={faSchool} />}
                >
                  <h3 className="vertical-timeline-element-title">My High School</h3>
                  <span className='aboutTimeLineDate'>Date: 2018 - 2020</span>
                  <h4 className="vertical-timeline-element-subtitle">Name: HemSheela Model School</h4>
                  <p>
                    I attended HemSheela Model School for my high school education. This phase of my life was crucial in shaping my academic interests and personal growth. The school provided a rigorous curriculum and a supportive environment that encouraged critical thinking and problem-solving. It was during these years that I developed a keen interest in science and technology, which laid the foundation for my future endeavors.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="aboutTimeLineComponents"
                  contentStyle={{ background: 'purple', color: '#000' }}
                  contentArrowStyle={{ borderRight: '7px solid  purple' }}
                  iconStyle={{ background: 'purple', color: '#fff' }}
                  icon={<FontAwesomeIcon icon={faGraduationCap} />}
                >
                  <h3 className="vertical-timeline-element-title">My College</h3>
                  <span className='aboutTimeLineDate'>Date: 2020 - 2024</span>
                  <h4 className="vertical-timeline-element-subtitle">Name: University Institute of Technology, Bardhaman</h4>
                  <p>
                    I pursued my undergraduate studies in Information Technology at the University Institute of Technology, Bardhaman. The college provided a comprehensive curriculum that covered various aspects of computer science and information technology, including programming, data structures, algorithms, and software development. It was during this time that I honed my technical skills and gained hands-on experience through projects and internships. The supportive faculty and collaborative environment played a significant role in shaping my career path and deepening my passion for technology.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="aboutTimeLineComponents"
                  contentStyle={{ background: 'green', color: '#000' }}
                  contentArrowStyle={{ borderRight: '7px solid  green' }}
                  iconStyle={{ background: 'green', color: '#fff' }}
                  icon={<FontAwesomeIcon icon={faBriefcase} />}
                >
                  <h3 className="vertical-timeline-element-title">My Current Job</h3>
                  <span className='aboutTimeLineDate'>Date: 2024 - present</span>
                  <h4 className="vertical-timeline-element-subtitle">Company Name: Vyrazu Labs Pvt ltd</h4>
                  <p>
                    I am currently working as an Associate Software Developer at Vyrazu Labs Pvt Ltd. My role involves developing and maintaining web applications using Laravel and React JS. I collaborate with a talented team to design, implement, and optimize software solutions that meet client requirements. This position has allowed me to enhance my skills in full-stack development, problem-solving, and teamwork, while contributing to innovative projects that make a real-world impact.
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </div>
            <div className="aboutCertificateContainer">
              <div className='aboutCertificate'>
                <h1>My Certificate</h1>
                <h2>Instaily WebDevelopment Bootcamp Certification</h2>
                <p>
                  I successfully completed the Instaily Web Development Bootcamp, which ran from November 2024 to January 2025. This intensive course provided me with in-depth knowledge and hands-on experience in modern web development technologies, including HTML, CSS, JavaScript, React, and backend development. I achieved this certification on 9th March 2025, marking a significant milestone in my journey as a web developer.
                </p>
                <div className="aboutImgHeader">
                <b>Instaily Certification</b>
                <div className="aboutImgheaderActions">
                  <a href={Instaily} download="Sandipan_Instaily_Certificate.jpg"  className='downloadCertificate'><FontAwesomeIcon icon={faDownload} /><span className='downloadHelper'>Download</span></a>
                  <a href={Instaily} target='_blank' className='ViewCertificate'><FontAwesomeIcon icon={faEye} /><span className='viewHelper'>View</span></a>
                </div>
                </div>
                <img className='aboutcertificateImg' src={Instaily} alt="instaily certificate" />
              </div>
            </div>
        </div>
    </>
  )
}

export default About