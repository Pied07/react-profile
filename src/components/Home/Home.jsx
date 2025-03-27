import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import sandipan from '../../assets/sandipan.jpeg'
import Leetcode from './Leetcode/Leetcode';
import Github from './Github/Github';

function Home() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siteAvailable, setSiteAvailable] = useState({})

  let username = "Pied07"

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

  const checkWebsiteAvailability = async (repoName) => {
    try {
      const response = await axios.get(`https://${username}.github.io/${repoName}/`);
      if (response.status === 200) {
        setSiteAvailable((prevState) => ({
          ...prevState,
          [repoName]: true,
        }));
      } else {
        setSiteAvailable((prevState) => ({
          ...prevState,
          [repoName]: false,
        }));
      }
    } catch (error) {
      setSiteAvailable((prevState) => ({
        ...prevState,
        [repoName]: false,
      }));
    }
  };

  useEffect(() => {
    repos.forEach((repo) => {
      checkWebsiteAvailability(repo.name);
    });
  }, [repos]);

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
            <br /><br />
            <div className="homeRecentProjects">
              <h1>My Latest Projects</h1>
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
                            href={`https://${username}.github.io/${repo.name}/`} 
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
                    <Link className='projectButton' to="/projects">See All Projects</Link>
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