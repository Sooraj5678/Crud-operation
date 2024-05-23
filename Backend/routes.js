const express = require('express');
const db = require('./Config'); 
const router = express.Router();


router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [rows, fields] = await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
