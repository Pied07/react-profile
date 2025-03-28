import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'


const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function Github() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [colors, setColors] = useState([])
    const [createdAt, setCreatedAt] = useState(null)
    const [updatedAt, setUpdatedAt] = useState(null)

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
            let created_at = []
            let updated_at = []
            repos.map((repo) => {
                if (repo.language) {
                    if (usedLanguages[repo.language]) {
                        usedLanguages[repo.language] += 1
                        console.log(repo.language)
                    }
                    else {
                        usedLanguages[repo.language] = 1
                    }
                }
                const createdDate = new Date(repo.created_at).getDate();
                const updatedDate = new Date(repo.updated_at).getDate(); 

                created_at[repo.name] = createdDate;
                updated_at[repo.name] = updatedDate;
            })
            setLanguages(usedLanguages)
            setCreatedAt(created_at)
            setUpdatedAt(updated_at)
        }
    },[repos])

    useEffect(() => {
        if (languages) {
            const generatedColors = Object.keys(languages).map(() => getRandomColor());
            setColors(generatedColors);
        }
    }, [languages]);


    if (loading) {
        return <div>Loading...</div>;
    }

    const pieData = {
        labels: Object.keys(languages),
        datasets: [
            {
                data: Object.values(languages),
                backgroundColor: colors,
                borderColor: 'aqua'
            },
        ],
    }

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${value}`;
                },
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 12,
                },

                anchor: 'end',
                align: 'start',
                padding: 5,
                borderRadius: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
        },
        layout: {
            padding: 40,
        },
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 100,
            easing: 'easeOutBounce',
        },
        hoverOffset: 80
    };
    
    return (
        <>
            <div className="githubchartcontains">
            <h1>Programming Languages used on Github</h1>
                <div className="githubPie">
                <h2>All Programming Languages Used</h2>
                    <Pie className='githubPieContainer' data={pieData} options={pieOptions} plugins={[ChartDataLabels]} />
                </div>
            </div>
        </>
    )
}

export default Github