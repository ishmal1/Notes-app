const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel'); // Import schema

// Get all notes
router.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (e) {
        res.status(500).json({ message: "Error fetching notes", error: e.message });
    }
});

// Create a note
router.post('/notes', async (req, res) => {
    try {
        const { noteId, text, date, color } = req.body;
        const newNote = new Note({ noteId, text, date, color });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (e) {
        res.status(500).json({ message: "Note not created", error: e.message });
    }
});

// Delete a note
router.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Update a note
router.patch('/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNote);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
