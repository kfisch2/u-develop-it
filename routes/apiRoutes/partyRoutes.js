const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET all parties
router.get('/parties', (req, res) => {
  const sql = `SELECT * 
              FROM parties`
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})

// GET candidates by party name
router.get('/api/candidate/party/:party_id', (req, res) => {
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
router.get('/api/candidate/no_party/null', (req, res) => {
  const sql = `SELECT * 
               FROM candidates
               WHERE party_id IS NULL`;

  const params = [req.params.id]

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

// GET party by id
router.get('/party/:id', (req, res) => {
  const sql = `SELECT * 
         FROM parties
         WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    res.json({
      message: 'success',
      data: row
    })
  })
});

// DELETE party
router.delete('/party/:id', (req, res) => {
  const sql = `DELETE
         FROM parties
         WHERE id = ?`
  const params = [req.params.id]
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message })
    } else if (!result.affectedRows) {
      res.json({
        message: 'Party not found'
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

module.exports = router;