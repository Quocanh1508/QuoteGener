const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Initialize database table if not exists
const initDB = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        author TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `);
        console.log("Database table verified.");
    } catch (error) {
        console.error("Error initializing database table:", error);
    }
};
initDB();

// API Endpoints

// GET /api/quotes - Get all quotes or filter by category
app.get('/api/quotes', async (req, res) => {
    const { category } = req.query;
    try {
        if (category) {
            const result = await pool.query('SELECT * FROM quotes WHERE category = $1', [category]);
            res.json(result.rows);
        } else {
            const result = await pool.query('SELECT * FROM quotes');
            res.json(result.rows);
        }
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

// GET /api/quotes/random - Get a random quote
app.get('/api/quotes/random', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1');
        const quote = result.rows[0];
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
app.post('/api/quotes', async (req, res) => {
    const { text, author, category } = req.body;
    if (!text || !author || !category) {
        return res.status(400).json({ error: 'Missing required fields: text, author, category' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO quotes (text, author, category) VALUES ($1, $2, $3) RETURNING id',
            [text, author, category]
        );
        res.status(201).json({ id: result.rows[0].id, text, author, category });
    } catch (error) {
        console.error('Error adding quote:', error);
        res.status(500).json({ error: 'Failed to add quote' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export it for Vercel serverless functions
module.exports = app;
