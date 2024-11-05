import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import './css/LineChart.css';

Chart.register(CategoryScale);

export default function Linechart({ timestamp, light, humidity, temperature }) {
    const [chartData, setChartData] = useState({
        labels: [], // Timestamps
        datasets: [
            {
                label: "Temperature",
                data: [], // Temperature data
                backgroundColor: "rgba(255, 0, 0, 0.2)", 
                borderColor: "red",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Humidity",
                data: [], // Humidity data
                backgroundColor: "rgba(0, 0, 255, 0.2)", 
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Light",
                data: [], // Light data
                backgroundColor: "rgba(0, 255, 0, 0.2)", 
                borderColor: "green",
                borderWidth: 2,
                fill: false,
            }
        ]
    });

    const MAX_DATA_POINTS = 30;

    useEffect(() => {
        if (timestamp) {
            setChartData((prevData) => ({
                labels: [...prevData.labels.slice(-MAX_DATA_POINTS + 1), timestamp],
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: [...prevData.datasets[0].data.slice(-MAX_DATA_POINTS + 1), temperature]
                    },
                    {
                        ...prevData.datasets[1],
                        data: [...prevData.datasets[1].data.slice(-MAX_DATA_POINTS + 1), humidity]
                    },
                    {
                        ...prevData.datasets[2],
                        data: [...prevData.datasets[2].data.slice(-MAX_DATA_POINTS + 1), light]
                    }
                ]
            }));
        }
    }, [timestamp, temperature, humidity, light]);

    return (
        <div className='linechart'>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Sensor Data"
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Value'
                            }
                        }
                    }
                }}
            />
        </div>
    );
}
