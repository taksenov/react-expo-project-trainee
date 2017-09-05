import mongoose from 'mongoose';

import config from '../../etc/config.json';

import '../models/Note';
import '../models/River';

const Note = mongoose.model('Note');
const River = mongoose.model('River');

/**
 *  Connections
 */
export function setUpConnection() {
    mongoose.Promise = global.Promise; // workAround from https://github.com/Automattic/mongoose/issues/4291
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
        useMongoClient: true,
    });
} //setUpConnection

/**
 * Notes
 */
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
// Notes =======================================

/**
 * Rivers
 */
export function listRivers() {
    return River.find();
} //listRivers

export function createRiver(data) {
    const river = new River({
        name         : data.name,
        hydroPost    : data.hydroPost,
        levelToday   : data.levelToday,
        levelDelta   : data.levelDelta || 0,
        levelAPPG    : data.levelAPPG || 0,
        typeRiver    : data.typeRiver,
        scalingDate  : data.scalingDate || new Date(),
        criticalLevelPashtory: data.criticalLevelPashtory,
        criticalLevelTugiyany: data.criticalLevelTugiyany,
        comment      : data.comment || 'Чисто',
    });

    return river.save();
} //createRiver

export function deleteRiver(id) {
    return River.findById(id).remove();
} //deleteRiver
// Rivers =======================================
