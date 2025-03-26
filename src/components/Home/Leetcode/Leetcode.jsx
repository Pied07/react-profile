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

  const doughnutOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    cutout: 80,
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      const fontSize = '4px';
      const text = `Total Submission: ${code.totalSolved}`; 
      const textX = width / 2;
      const textY = height / 2;

      // Set up text style
      ctx.save();
      ctx.font = fontSize + 'em sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white'; // Text color

      // Draw the text
      ctx.fillText(text, textX, textY);
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
      
    <div className="chartsContains">
      <div className='leetDoughnut'>
        <h2>Problem Difficulty Doughnut Chart</h2>
        <Doughnut data={doughnutData} options={doughnutOptions}  plugins={[centerTextPlugin]} />
      </div>

      <div className='leetBar'>
        <h2>Problems vs Solved Bar Chart</h2>
        <Bar data={barData} options={barOptions} />
      </div>
      </div>
    </div>
  );
}

export default Leetcode;
