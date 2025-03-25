import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Leetcode() {
  const [code, setCode] = useState(null); // State for storing LeetCode data
  const [loading, setLoading] = useState(true); // Loading state for data fetch

  const username = 'Sandipan_Adhikary';

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        console.log(response, `https://leetcode-api-faisalshohag.vercel.app/${username}`);
        setCode(response.data);
        setLoading(false);
      } catch (error) {
        alert('Error Fetching Leetcode Data!!!');
        setLoading(false);
      }
    };
    fetchCodes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Pie chart data
  const doughnutData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [code.easySolved, code.mediumSolved, code.hardSolved],
        backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336'],
        hoverBackgroundColor: ['#66BB6A', '#FFEB3B', '#FF7043'],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: ['All', 'Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Total Problems',
        data: [
          code.totalQuestions, // Total number of problems
          code.totalEasy,     // Total Easy problems
          code.totalMedium,   // Total Medium problems
          code.totalHard,     // Total Hard problems
        ],
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
      {
        label: 'Solved Problems',
        data: [
          code.totalSolved, // Total solved problems
          code.easySolved,  // Solved Easy problems
          code.mediumSolved,// Solved Medium problems
          code.hardSolved,  // Solved Hard problems
        ],
        backgroundColor: '#66BB6A',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const barOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="LeetcodeContainer">
      <h1>LeetCode Problem Difficulty Distribution</h1>
      
      {/* Pie Chart */}
      <div>
        <h2>Problem Difficulty Distribution (Pie Chart)</h2>
        <Doughnut data={doughnutData} />
      </div>

      {/* Bar Chart */}
      <div style={{ marginTop: '40px' }}>
        <h2>Problems vs Solved (Bar Chart)</h2>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}

export default Leetcode;
