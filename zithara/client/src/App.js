import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [data, setData] = useState([]);
  const [totalcount, setTotalcount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortColumn, setSortColumn] = useState('');
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('customerSearch');
  const [sortOrder, setSortOrder] = useState('asc');
  

  useEffect(() => {
    axios.get(`http://localhost:3001/customers?page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&${searchField}=${search}`)
      .then(response => {
        setData(response.data.data);
        setTotalcount(response.data.totalCount);
        console.log(response.data.totalCount);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [page, pageSize,sortColumn,sortOrder,searchField,search]);

  const handlePageChange = newPage => {
    setPage(newPage);
  };
  

  const handlePageSizeChange = newSize => {
    setPageSize(newSize);
    setPage(1); 
  };

  const handleSort = column => {
    setSortOrder(prevOrder => (sortColumn === column && prevOrder === 'asc' ? 'desc' : 'asc'));
    setSortColumn(column);
  };

  return (
    <div>
      <h1>Customer Data</h1>
      <div className="filter">
      <select 
        onChange={(event) => setSearchField(event.target.value)}
        value={searchField}
        menuIsOpen={true}
      >
        <option value="customerSearch">customerSearch</option>
        <option value="locationSearch">locationSearch</option>
      </select>
      <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  />
      </div>
      <table>
       
        <thead>
          <tr>
          <th onClick={() => handleSort('sno')}>Sno {sortColumn === 'sno' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          <th onClick={() => handleSort('customer_name')}>Customer Name {sortColumn === 'customer_name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          <th onClick={() => handleSort('age')}>Age {sortColumn === 'age' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          <th onClick={() => handleSort('phone')}>Phone {sortColumn === 'phone' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          <th onClick={() => handleSort('location')}>Location {sortColumn === 'location' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          <th onClick={() => handleSort('created_at_date')}>Date {sortColumn === 'created_at_date' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          <th onClick={() => handleSort('created_at_time')}>Time {sortColumn === 'created_at_time' && (sortOrder === 'asc' ? '▲' : '▼')}</th>

          </tr>
        </thead>
        <tbody>
          {data.map(customer => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>

              
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {totalcount >= 10&&(<div>
        <button onClick={() => handlePageChange(Math.max(page - 1, 1))}>
          Previous Page
        </button>
        <span> Page {page} </span>
        <button disabled={Math.ceil(totalcount/pageSize)<=page} onClick={() => handlePageChange(page + 1)}>
          Next Page
        </button>

        
        <span> Page Size: </span>
        <select value={pageSize} onChange={e => handlePageSizeChange(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>)}
    </div>
  );
}

export default App;
