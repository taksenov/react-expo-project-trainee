import mongoose from 'mongoose';

// const Schema = mongoose.Schema;
import {Schema} from './mongooseSchema.js';

const NoteSchema = new Schema({
    title     : {type: String},
    text      : {type: String, required: true},
    color     : {type: String},
    createdAt : {type: Date}
});

const Note = mongoose.model('Note', NoteSchema);
