// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error('❌ Error fetching notes:', err); // <== add this
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});


// POST a new note
router.post('/', async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      description: req.body.description
    });
    console.log('📥 Incoming note:', req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error('❌ Error saving note:', err);
    res.status(400).json({ error: 'Failed to save note' });
  }
});


module.exports = router;
