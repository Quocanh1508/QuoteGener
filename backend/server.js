const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'quotes.db');
const db = new Database(dbPath);

// Create table if it doesn't exist (handled initially by seed script, but good for safe start)
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL
  )
`);

// API Endpoints

// GET /api/quotes - Get all quotes or filter by category
app.get('/api/quotes', (req, res) => {
  const { category } = req.query;
  try {
    if (category) {
      const stmt = db.prepare('SELECT * FROM quotes WHERE category = ?');
      const quotes = stmt.all(category);
      res.json(quotes);
    } else {
      const stmt = db.prepare('SELECT * FROM quotes');
      const quotes = stmt.all();
      res.json(quotes);
    }
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// GET /api/quotes/random - Get a random quote
app.get('/api/quotes/random', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1');
    const quote = stmt.get();
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ error: 'No quotes found' });
    }
  } catch (error) {
    console.error('Error fetching random quote:', error);
    res.status(500).json({ error: 'Failed to fetch random quote' });
  }
});

// POST /api/quotes - Add a new quote
app.post('/api/quotes', (req, res) => {
  const { text, author, category } = req.body;
  if (!text || !author || !category) {
    return res.status(400).json({ error: 'Missing required fields: text, author, category' });
  }

  try {
    const stmt = db.prepare('INSERT INTO quotes (text, author, category) VALUES (?, ?, ?)');
    const info = stmt.run(text, author, category);
    res.status(201).json({ id: info.lastInsertRowid, text, author, category });
  } catch (error) {
    console.error('Error adding quote:', error);
    res.status(500).json({ error: 'Failed to add quote' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
