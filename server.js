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

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

// Read by id
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err)
  } 
  console.log(row)
});

// Delete by id
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if(err) {
//     console.log(err)
//   }
//   console.log(result);
// });

// Create 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err)
  }
  console.log(result)
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
})

// connect to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});