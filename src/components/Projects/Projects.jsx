import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'

function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [siteAvailable, setSiteAvailable] = useState({})
    const [selectedProject, setSelectedproject] = useState(null)
    const username = 'Pied07'

    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            const sortedResponse = response.data.sort(
                (a,b) => new Date(b.pushed_at) - new Date(a.pushed_at)
            )
            setProjects(sortedResponse);
            setLoading(false);
            } catch (err) {
            setError('Error fetching data');
            setLoading(false);
            }
        }
        fetchProjects()
    },[])

    const checkWebsiteAvailability = async (repo) => {
        try {
            if(repo.homepage !== null) {
                setSiteAvailable((prevState) => ({
                    ...prevState,
                    [repo.name]: repo.homepage,
                }));
                return;
            }
            $url = `https://${username}.github.io/${repo.name}/`;
            const response = await axios.get($url);
            if (response.status === 200) {
            setSiteAvailable((prevState) => ({
                ...prevState,
                [repo.name]: $url,
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
        projects.forEach((repo) => {
            checkWebsiteAvailability(repo);
        });
    }, [projects]);

    const openProjectModal = (project) => {
        setSelectedproject(project)
    }

    const closeProjectModal = () => {
        setSelectedproject(null)
    }
    
  return (
    <>
        <div className="projectContainer">
            <h1>My Projects</h1>
            <div className="projectCards">
                {projects.map((project) => (
                <div className='ProjectCardContainer' key={project.id} onClick={()=>openProjectModal(project)}>
                    <h2>{project.name.replace(/[-_]/g, " ")}</h2>
                    <p>{project.description}</p>
                    <div className="ProjectcardActions">
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                        Repository
                    </a>
                    {siteAvailable[project.name] && (
                        <a 
                        href={`https://${username}.github.io/${project.name}/`} 
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
            {selectedProject && (
                <div className="modal" onClick={closeProjectModal}>
                    <div className="modalContent">
                        <h2>{selectedProject.name.replace(/[-_]/g, " ")}</h2>
                        <p>{selectedProject.description}</p>
                        <div className="modalActions" onClick={closeProjectModal}><FontAwesomeIcon className='closeIcon' icon={faXmarkCircle} /></div>
                    </div>
                </div>
            )}
            <br /><br />
            <a href="https://github.com/Pied07" className='projectBtn'>Visit My Github Profile</a>
        </div>
    </>
  )
}

export default Projects