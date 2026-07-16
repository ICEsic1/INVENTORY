import React from 'react';
import { Line } from 'react-chartjs-2';

const UsageChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Storage Usage',
                data: data.map(item => item.usage),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Storage Usage Over Time</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default UsageChart;