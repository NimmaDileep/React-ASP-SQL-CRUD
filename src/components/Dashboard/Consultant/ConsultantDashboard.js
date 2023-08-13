import React from 'react';
import { Bar } from 'react-chartjs-2';
import {CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart} from 'chart.js';
import './ConsultantDashboard.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ConsultantDashboard = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Months
        datasets: [
            {
                label: 'Submissions',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            },
            {
                label: 'Vendor Calls',
                data: [7, 12, 8, 10, 11, 3],
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
                label: 'Interviews',
                data: [3, 8, 1, 3, 5, 2],
                backgroundColor: 'rgba(255,206,86,0.4)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1
            },
            {
                label: 'Rejected',
                data: [5, 2, 6, 2, 1, 2],
                backgroundColor: 'rgba(255,159,64,0.4)',
                borderColor: 'rgba(255,159,64,1)',
                borderWidth: 1
            },
            {
                label: 'Pending',
                data: [4, 6, 2, 3, 1, 0],
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    color: 'red'
                }
            },
            y: {
                ticks: {
                    color: 'blue'
                }
            }
        }
    };


    return (
        <div className="consultant-dashboard">
            <div className="chart-container">
                <h2>Consultant's Submissions for Past 6 Months</h2>
                <Bar data={data} options={options} />
            </div>

            <div className="table-container">
                <h3>Submission details in Tabular Format</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Month</th>
                        {data.datasets.map(dataset => (
                            <th key={dataset.label}>{dataset.label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.labels.map((label, index) => (
                        <tr key={label}>
                            <td>{label}</td>
                            {data.datasets.map(dataset => (
                                <td key={dataset.label}>{dataset.data[index]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ConsultantDashboard;
