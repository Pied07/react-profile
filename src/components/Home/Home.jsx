import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import sandipan from '../../assets/sandipan.jpeg'
import Leetcode from './Leetcode/Leetcode';
import Github from './Github/Github';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faHackerrank, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCode, faDownload, faHome, faList, faWarning } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siteAvailable, setSiteAvailable] = useState({})

  let username = import.meta.env.VITE_GITHUB_USERNAME;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        const sortedResponse = response.data.sort(
          (a,b) => new Date(b.pushed_at) - new Date(a.pushed_at)
        )
        .slice(0,5)
        setRepos(sortedResponse);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const checkWebsiteAvailability = async (repo) => {
    try {
      if(repo.homepage !== null) {
          setSiteAvailable((prevState) => ({
              ...prevState,
              [repo.name]: repo.homepage,
          }));
          return;
      }
      let url = `https://${username}.github.io/${repo.name}/`;
      const response = await axios.get(url);
      if (response.status === 200) {
      setSiteAvailable((prevState) => ({
          ...prevState,
          [repo.name]: url,
      }));
      } else {
      setSiteAvailable((prevState) => ({
          ...prevState,
          [repo.name]: null,
      }));
      }
  } catch (error) {
      setSiteAvailable((prevState) => ({
        ...prevState,
        [repo.name]: null,
      }));
    }
  };

  useEffect(() => {
    repos.forEach((repo) => {
      checkWebsiteAvailability(repo);
    });
  }, [repos]);

  return (
    <>
        <div className="homeContainer">
            <div className="homeElements">
              <div className="homeLeft">
                <h1>I am <span>Sandipan Adhikary</span></h1>
                <h3><FontAwesomeIcon icon={faHome} />  Welcome to my Profile</h3>
                <p>I am a passionate and skilled software developer with experience in building efficient and scalable solutions. With expertise in languages like JavaScript, Python, PHP, JAVA and SQL. I am well-versed in frameworks like React, Node.js, and Django, Laravel and I pride myself on writing clean, maintainable code. Continuously learning and adapting to new technologies, I enjoy tackling challenging problems and collaborating with teams to create impactful, user-centric applications. In my free time, I stay engaged with the tech community through Tech podcasts and Tech Articles.</p>
              </div>
              <div className="homeRight">
                <img className='myImage' src={sandipan} alt="My Pic" />
              </div>
            </div><br /><br />
            <div className="homeHandles">
              <a href="https://github.com/Pied07"><FontAwesomeIcon icon={faGithub} /> My Github Account</a>
              <a href="https://www.linkedin.com/in/sandipan-adhikary-ab418b230/"><FontAwesomeIcon icon={faLinkedin} /> My LinkedIn Account</a>
              <a href="https://leetcode.com/u/Sandipan_Adhikary/"><FontAwesomeIcon icon={faCode} /> My Leetcode Account</a>
              <a href="https://www.hackerrank.com/profile/sandipanadhikar2"><FontAwesomeIcon icon={faHackerrank} /> My HackerRank Account</a>
              <a href=""><FontAwesomeIcon icon={faDownload} /> Download my Resume</a>
            </div>
            <br /><br />
            <div className="homeRecentProjects">
              <h1><FontAwesomeIcon icon={faList} />  My Latest Projects</h1>
              <span><FontAwesomeIcon icon={faWarning} />  <b>**Note :</b> All the Project website might not Open since I have used free tier plan's for Database and hosting on platforms like Vercel or Render So that plan might be Exhausted Kindly Ignore those. <FontAwesomeIcon icon={faWarning} /></span><br /><br />
                  <div className="homeCards">
                  {repos.map((repo) => (
                    <div className='homeProjectCardContainer' key={repo.id}>
                      <h2>{repo.name.replace(/[-_]/g, " ")}</h2>
                      <p>{repo.description}</p>
                      <div className="homeProjectcardActions">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          Repository
                        </a>
                        {siteAvailable[repo.name] && (
                          <a 
                            href={siteAvailable[repo.name]} 
                            target='_blank' 
                            rel='noopener noreferrer'
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  </div>
                  <br /><br />
                    <Link className='projectButton' to="/projects"><FontAwesomeIcon icon={faList} />  See All Projects</Link>
              </div>
              <div className="homeLeetcodeContainer">
                  <Leetcode />
              </div>
              <div className="homeGithubContainer">
                <Github />
              </div>
          </div>
    </>
  )
}

export default Home