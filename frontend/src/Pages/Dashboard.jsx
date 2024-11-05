import React, { useState, useEffect } from 'react';
import './css/Dashboard.css';
import Linechart from './Linechart.jsx';
import Control from './Control.jsx';
import Datatime from './Datatime.jsx';
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); // Địa chỉ của server backend

function Dashboard() {
    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Lắng nghe sự kiện 'newSensorData' từ server
        socket.on('newSensorData', (data) => {
            console.log('Received new sensor data:', data);
            setSensorData(data);
        });

        return () => {
            socket.off('newSensorData');
        };
    }, []);

    return (
        <div className='dashboard-main'>
            <div>
                <Control />
            </div>
            <div className="">
                <Datatime
                    light={sensorData ? sensorData.light : 0}
                    humidity={sensorData ? sensorData.humidity : 0}
                    temperature={sensorData ? sensorData.temperature : 0}
                />
            </div>
            <div className="chart">
                <Linechart
                    light={sensorData ? sensorData.light : 0}
                    humidity={sensorData ? sensorData.humidity : 0}
                    temperature={sensorData ? sensorData.temperature : 0}
                    timestamp={sensorData ? sensorData.timestamp : 0} 
                />
            </div>
        </div>
    );
}

export default Dashboard;
