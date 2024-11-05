// Datasensor.jsx
import React, { useState, useEffect } from 'react';
import './css/Datasensor.css';

function Datasensor() {
    const [data, setData] = useState([]);
    const [filterType, setFilterType] = useState('none');
    const [filterValue, setFilterValue] = useState('');
    const [searchTime, setSearchTime] = useState(''); // Ô nhập thời gian
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getSearch();
    }, [currentPage]);

    const getSearch = () => {
        const query = new URLSearchParams({
            type: filterType !== 'none' ? filterType : '',
            value: filterValue,
            time: searchTime,
            page: currentPage,
            pagesize: pageSize,
        });

        fetch(`http://localhost:5000/datasensor/search?${query.toString()}`)
            .then(response => response.json())
            .then(result => {
                setData(result.data);
                setTotalPages(result.pagination.totalPages);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        getSearch();
    };

    return (
        <div className='datasensor'>
            <div className='search'>
                <input
                    type="text"
                    placeholder="Nhập giá trị tìm kiếm"
                    value={filterValue}
                    onChange={e => setFilterValue(e.target.value)}
                />

                <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                >
                    <option value="none">No Filter</option>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="light">Light</option>
                </select>

                <input
                    type="text"
                    placeholder="Nhập thời gian (yyyy-MM-dd hoặc HH:mm)"
                    value={searchTime}
                    onChange={e => setSearchTime(e.target.value)}
                />

                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Temperature</th>
                        <th>Light</th>
                        <th>Humidity</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.temperature}</td>
                            <td>{item.light}</td>
                            <td>{item.humidity}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='page'>
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                    Trang trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                    Trang sau
                </button>
            </div>
        </div>
    );
}

export default Datasensor;
