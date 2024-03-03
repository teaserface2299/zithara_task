Project Introduction:

This full-stack web application, built with React, Node.js, and PostgreSQL, manages customer data efficiently. 
Featuring a user-friendly interface, it displays 50 dummy records in a paginated table with search and sort options.
The "date" and "time" columns enhance timestamp visibility, offering a seamless experience for exploring and managing customer information.

I'll guide you through the steps



Step 1: Set up the Node.js Server

In command line 

cd project-folder
npm init -y

Install necessary packages:

npm install express pg cors

Set up your server (server.js):

replace the repository server.js file code with your server.js code

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

change those to your postgres credentials

Step 2: Set up PostgreSQL Database

use the table.sql file query to create a table and the insertion.sql file query to insert data into your table

Step 4: Set up the React App
Create a React app:
npx create-react-app your-react-folder-name
cd your-react-folder-name
Install required packages:
npm install axios 


step 5:
Replace the App.js code with my app.js code

step 6: RUNNING

get the node js command prompt change the directory to the server folder and enter the command "node server.js" to run file once get the message called "Connected to port 3001" you are successfully connected to server
now go to the node js command prompt change directory to your-react-folder-name and enter the command "npm start" to execute command

You are now successfully executed

gdrive link for project - https://drive.google.com/file/d/1o8Y16UJblOT7UWHkZnan6f1P4gMk4j7A/view?usp=drive_link
