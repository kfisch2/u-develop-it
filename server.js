const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost', 
    user: 'root', 
    password: 'MyUniquePadfoot24!#',
    database: 'election'
  },
  console.log('Connected to election database')
)

// // GET route
// app.get('/', (req, res) => {
//   res.send({
//     message: "Hello World!"
//   })
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
})

// connect to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});