const express = require('express');
const router = express.Router();
const Note = require('../models/note.model'); // Make sure this points to the correct file

// POST /api/notes - Add a new note
router.post('/', async (req, res) => {
  try {
    console.log('📥 Incoming note payload:', req.body);

    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required.' });
    }

    const note = new Note({ title, body });
    await note.save();

    console.log('✅ Note saved:', note);
    res.status(201).json(note);
  } catch (error) {
    console.error('❌ Save error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/notes - Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('❌ Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

module.exports = router;
