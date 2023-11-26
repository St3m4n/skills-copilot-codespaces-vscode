// Create web server for comments.

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Configure Express to handle JSON data:
app.use(bodyParser.json());

// Configure Express to serve static files from /public:
app.use(express.static(path.join(__dirname, 'public')));

// Load the comments file:
const COMMENTS_FILE = path.join(__dirname, 'comments.json');

// GET /api/comments
// Returns all comments from the file.
app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading comments file.');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// POST /api/comments
// Adds a new comment to the file.
app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading comments file.');
      return;
    }
    const comments = JSON.parse(data);
    const newComment = {
      id: Date.now(),
