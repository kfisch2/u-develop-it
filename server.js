const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');

const inputCheck = require('./utils/inputCheck')


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

// GET all candidates
app.get('/', (req, res) => {
  const sql = `SELECT candidates.*, parties.name
               AS party_name
               FROM candidates
               LEFT JOIN parties 
               ON candidates.party_id = parties.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// GET candidates by id
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
               AS party_name
               FROM candidates
               LEFT JOIN parties
               ON candidates.party_id = parties.id
               WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return
    }
    res.json({
      message: 'success',
      data: row
    })
  })
})

// GET candidates by party name
app.get('/api/candidate/party/:party_id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
               AS party_name
               FROM candidates
               LEFT JOIN parties
               ON candidates.party_id = parties.id
               WHERE candidates.party_id = ?`;
  const params = [req.params.party_id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return
    }
    res.json({
      message: 'success',
      data: row
    })
  })
});

// GET candidates not affilated with party
// weird way to get it since there is no party_id
app.get('/api/candidate/no_party/:party_id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name
               AS party_name 
               FROM candidates
               LEFT JOIN parties
               ON candidates.party_id = parties.id
               WHERE candidates.party_id IS NULL`;
  const params = req.params.party_id;

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.json({
      message: 'success',
      data: row
    })
  })
});





// Delete by id
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message })
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      })
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      })
    }
  })
});

// Add a candidate
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return;
    }
    res.json({
      message: 'success',
      data: body
    })
  })
})


// Create 
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];
// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log(result)
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
})

// connect to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});