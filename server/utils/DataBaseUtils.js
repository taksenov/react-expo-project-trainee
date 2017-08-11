import mongoose from 'mongoose';

import '../models/Note';

const Note = mongoose.model('Note');

export function setUpConnection() {
    mongoose.Promise = global.Promise; // workAround from https://github.com/Automattic/mongoose/issues/4291
    mongoose.connect('mongodb://localhost/notes', {
        useMongoClient: true,
    });
} //setUpConnection

export function listNotes() {
    return Note.find();
} //listNotes

export function createNote(data) {
    const note = new Note({
        title     : data.title,
        text      : data.text,
        color     : data.color,
        createdAt : new Date()
    });

    return note.save();
} //createNote

export function deleteNote(id) {
    return Note.findById(id).remove();
} //deleteNote

