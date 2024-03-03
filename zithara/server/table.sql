CREATE TABLE customer_data (
  sno SERIAL PRIMARY KEY,
  customer_name VARCHAR(100),
  age INT,
  phone VARCHAR(15),
  location VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
