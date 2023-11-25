//Create web server
const express = require('express');
const app = express();
const port = 3000;
//Create database connection
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/comments.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the comments database.');
});
//Allow cross origin requests
const cors = require('cors');
app.use(cors());
//Allow JSON parsing
app.use(express.json());
//Get all comments
app.get('/api/comments', (req, res) => {
  let sql = 'SELECT * FROM comments';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.json(rows);
  });
});
//Get comment by id
app.get('/api/comments/:id', (req, res) => {
  let sql = 'SELECT * FROM comments WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.json(row);
  });
});
//Insert new comment
app.post('/api/comments', (req, res) => {
  let sql = 'INSERT INTO comments (name, email, comment) VALUES (?, ?, ?)';
  db.run(sql, [req.body.name, req.body.email, req.body.comment], (err) => {
    if (err) {
      console.error(err.message);
    }
    res.json({ message: 'success' });
  });
});
//Update comment
app.put('/api/comments/:id', (req, res) => {
  let sql = 'UPDATE comments SET name = ?, email = ?, comment = ? WHERE id = ?';
  db.run(sql, [req.body.name, req.body.email, req.body.comment, req.params.id], (err) => {
    if (err) {
      console.error(err.message);
    }
    res.json({ message: 'success' });
  });
});
//Delete comment
app.delete('/api/comments/:id', (req, res) => {
  let sql = 'DELETE FROM comments WHERE id = ?';
  db.run(sql, [req.params.id], (err) => {
    if (err) {
      console.error(err.message);
    }
    res.json({ message: 'success' });
  });
});
//