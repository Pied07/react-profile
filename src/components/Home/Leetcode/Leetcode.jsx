import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, plugins  } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement );

function Leetcode() {
  const [code, setCode] = useState(null); // State for storing LeetCode data
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [recentSubmission, setRecentSubmission] = useState([])
  const [calender, setCalender] = useState([])

  const username = 'Sandipan_Adhikary';

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        console.log(`https://leetcode-api-faisalshohag.vercel.app/${username}`)
        setCode(response.data);
        setLoading(false);
      } catch (error) {
        alert('Error Fetching Leetcode Data!!!');
        setLoading(false);
      }
    };
    fetchCodes();
  }, []);

  useEffect(() => {
    if (code && code.recentSubmissions) {
      setRecentSubmission(code.recentSubmissions);
    }
    if(code && code.submissionCalendar) {
      setCalender(code.submissionCalendar)
    }
  }, [code]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const doughnutData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [code.easySolved, code.mediumSolved, code.hardSolved],
        backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#FFEB3B', '#FF7043'],
        circumference: 270,
        rotation: 225,
        borderRadius: 10,
        borderColor: 'aqua'
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false
      }
    },
    cutout: '95%',
  };

  const centerTextPlugin = {
    id: 'centerText',
    afterDatasetsDraw(chart, args,pluginOptions) {
      const { ctx,data,options,_active,chartArea: { top, bottom, left, right, width, height } } = chart;

      const fontSize = 1.2;
      const text = `Total Submission: ${code.totalSolved}`; 
      const textX = chart.getDatasetMeta(0).data[0].x;
      const textY = chart.getDatasetMeta(0).data[0].y;

      // Set up text style
      ctx.save();

      if(_active.length) {
        const dataSetIndex = _active[0].datasetIndex
        const dataIndexValue = _active[0].index

        ctx.font = fontSize + 'em sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(doughnutData.labels[dataIndexValue] +': '+doughnutData.datasets[dataSetIndex].data[dataIndexValue], textX,textY)
      } else {
        ctx.font = fontSize + 'em sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(text, textX, textY)
      }
      ctx.restore();
    },
  };

  // Bar chart data
  const barData = {
    labels: ['All', 'Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Solved Problems',
        data: [
          code.totalSolved,
          code.easySolved,
          code.mediumSolved,
          code.hardSolved,
        ],
        backgroundColor: 'aqua',
        hoverBackgroundColor: 'blue',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Line Chart
  const calendarDates = Object.keys(calender); // Get the timestamps
  const submissionCounts = calendarDates.map((timestamp) => calender[timestamp]);
  const formattedDates = calendarDates.map((timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toUTCString().slice(0,-13);
  });

  const lineData = {
    labels: formattedDates,
    datasets: [
      {
        label: 'Submissions per Day',
        data: submissionCounts,
        fill: false,
        borderColor: '#42a5f5',
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Submissions',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="LeetcodeContainer">
      <h1>My LeetCode Progress</h1>
      <div className="chartsContains">
        <div className='leetDoughnut'>
          <h2>Problem Difficulty</h2>
          <Doughnut data={doughnutData} options={doughnutOptions}  plugins={[centerTextPlugin]} />
        </div>

        <div className='leetBar'>
          <h2>Problems Solved</h2>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className='leetLine'>
          <h2>Submission of Problems</h2>
          <Line data={lineData} options={lineOptions} />
      </div>
      </div>
      
      
      <div className="leetSubmission">
      <h1>Some of My Recent Submissions</h1>
        <div className="leetSubmissionsContains">
          {recentSubmission.map((submission, index) => (
            submission.statusDisplay === 'Accepted' && (
            <div className="leetRecentSubmission" key={index}>
              <p>Title: <b>{submission.title}</b></p>
              <p>Submitted On: <b>{(new Date(submission.timestamp * 1000)).toUTCString().slice(0,-4)}</b></p>
              <p>Language: <b>{submission.lang}</b></p>
            </div>
            )
          ))}
        </div><br /><br />
        <a href="https://leetcode.com/u/Sandipan_Adhikary/" target='_blank' className='leetcodeBtn'>Visit my leetcode Profile for more Info</a>
      </div>
    </div>
  );
}

export default Leetcode;
