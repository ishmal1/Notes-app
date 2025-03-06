const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteId: { type: String, required: true, unique: true },
    text: { type: String },
    date: { type: Date },
    color: { type: String, required: true, default: '#FFFFFF' }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
