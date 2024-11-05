import React, { useState, useEffect } from 'react';
import './css/Actionhistory.css';

function Actionhistory() {
    const [data, setData] = useState([]);
    const [device, setDevice] = useState('');
    const [searchTime, setSearchTime] = useState(''); // Nhập tự do
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getData();
    }, [currentPage]);

    const getData = () => {
        let query = `?page=${currentPage}&pagesize=${pageSize}`;
        if (searchTime) query += `&value=${searchTime}`;
        if (device) query += `&device=${device}`;

        fetch(`http://localhost:5000/actionhistory/search${query}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        getData();
    };

    const getNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    };

    const getPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className='actionhistory'>
            <div className='search-container'>
                <label>Search Time: </label>
                <input
                    type="text" // Thay đổi thành input tự do
                    placeholder="Enter time (e.g., 2023-10-10 15:30)"
                    value={searchTime}
                    onChange={(e) => setSearchTime(e.target.value)}
                />
                <label>Device: </label>
                <input
                    type="text"
                    placeholder="Enter device (e.g., led, fan, ac)"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Device</th>
                        <th>Action</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.device}</td>
                            <td>{item.action}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='pagination'>
                <button onClick={getPreviousPage} disabled={currentPage <= 1}>Trang trước</button>
                <span> Trang {currentPage} / {totalPages} </span>
                <button onClick={getNextPage} disabled={currentPage >= totalPages}>Trang sau</button>
            </div>
        </div>
    );
}

export default Actionhistory;
