import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, Pie } from 'react-chartjs-2';
import { layouts } from 'chart.js';
import { color } from 'chart.js/helpers';
import { data } from 'react-router-dom';

function Github() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [languages, setLanguages] = useState(null);

    let username = "Pied07"
    const fetchRepos = async () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            const sortedResponse = response.data.sort(
            (a,b) => new Date(b.pushed_at) - new Date(a.pushed_at)
            )
            setRepos(sortedResponse);
            setLoading(false);
        } catch (err) {
            setError('Error fetching data');
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchRepos();
    }, []);

    useEffect(() => {
        if(repos) {
            let usedLanguages = {}
            repos.map((repo) => {
                if (usedLanguages[repo.language]) {
                    usedLanguages[repo.language] += 1
                }
                else {
                    usedLanguages[repo.language] = 1
                }
            })
            setLanguages(usedLanguages)
        }
    },[repos])

    if (loading) {
        return <div>Loading...</div>;
    }

    const pieData = {
        labels: Object.keys(languages),
        datasets: [
            {
                data: Object.values(languages),
                backgroundColor: 'rgb(4, 7, 37)',
                borderColor: 'aqua',
                hoverOffset: 50
            },
        ],
    }

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 10,
            easing: "easeOutBounce",
        },
        layout: {
            padding: 40
        },
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: false,
            },
            dataLabels: {
                display: true,
                color: 'white',
            }
        },
    };
    
    return (
        <>
            <h1>Some Detailed Info About My Github Projects</h1>
            <div className="githubchartcontains">
                <div className="githubPie">
                <h2>Programming Languages Used</h2>
                    <Pie className='githubPieContainer' data={pieData} options={pieOptions} />
                </div>
            </div>
        </>
    )
}

export default Github