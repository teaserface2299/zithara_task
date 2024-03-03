const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'yaswanth',
  port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});


app.get('/customers', async (req, res) => {
  try {
    const { page = 1, pageSize = 20, customerSearch ,locationSearch, sortColumn, sortOrder } = req.query;
    console.log('req',req.query, page);
    const offset = (page - 1) * pageSize;

    let query = `SELECT *, 
    DATE(created_at) as created_at_date, 
    created_at::TIME as created_at_time FROM customer_data
                 WHERE LOWER(customer_name) LIKE LOWER($1) OR LOWER(location) LIKE LOWER($2)`;


    if (sortColumn && sortOrder) {
      if (sortColumn === 'sno') {
        query += ` ORDER BY CAST(sno AS INTEGER) ${sortOrder.toUpperCase()}`;
      } 
      else if (sortColumn === 'created_at_time'){
        query += ` ORDER BY created_at::TIME ${sortOrder.toUpperCase()}`;
      }
      else if (sortColumn === 'created_at_date'){
        query += ` ORDER BY DATE(created_at) ${sortOrder.toUpperCase()}`;
      }
      else {
        query += ` ORDER BY ${sortColumn} ${sortOrder.toUpperCase()}`;
      }
    }


    query += ` OFFSET $3 LIMIT $4`;
    console.warn('query: ',query);

    const result = await pool.query(query, [`${customerSearch}%`,`${locationSearch}%`, offset, pageSize]);

    console.log('Query executed successfully:', result.rows);
    const totalCount = await pool.query(`SELECT COUNT(*) FROM customer_data WHERE LOWER(customer_name) LIKE LOWER($1) OR LOWER(location) LIKE LOWER($2)`, [`${customerSearch}%`,`${locationSearch}%`]);

    res.json({
      data: result.rows,
      totalCount: parseInt(totalCount.rows[0].count),
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
