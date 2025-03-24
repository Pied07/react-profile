import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import sandipan from '../../assets/sandipan.jpeg'

function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let username = "Pied07"

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);
  return (
    <>
        <div className="homeContainer">
            <div className="homeElements">
              <div className="homeLeft">
                <h1>I am <span>Sandipan Adhikary</span></h1>
                <h3>Welcome to my Profile</h3>
                <p>I am a passionate and skilled software developer with experience in building efficient and scalable solutions. With expertise in languages like JavaScript, Python, PHP, JAVA and SQL. I am well-versed in frameworks like React, Node.js, and Django, Laravel and I pride myself on writing clean, maintainable code. Continuously learning and adapting to new technologies, I enjoy tackling challenging problems and collaborating with teams to create impactful, user-centric applications. In my free time, I stay engaged with the tech community through Tech podcasts and Tech Articles.</p>
              </div>
              <div className="homeRight">
                <img className='myImage' src={sandipan} alt="My Pic" />
              </div>
            </div>
            <div className="homeRecentProjects">
              <h1>Some of my Recent Projects</h1>
                <ul>
                  {repos.map((repo) => (
                    <li key={repo.id}>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                      <p>{repo.description}</p>
                    </li>
                  ))}
                </ul>
            </div>
        </div>
    </>
  )
}

export default Home