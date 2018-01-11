import mongoose from 'mongoose';

// import config from '../../etc/config.json';
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
    // return River.find().sort({scalingDate:-1});
    return River.find().sort({scalingDate:-1}).limit(14);
} //listRivers

export function filterRiversWithYear(year) {
    let yearLocal = year;
    yearLocal=+yearLocal;
    
    return River.find({
        scalingDate: {
            '$gte': new Date(yearLocal, 1, 1),          //больше или равно чем Дата
            '$lt': new Date(yearLocal+1, 1, 1)          //меньше чем Дата
        },
    }).sort({scalingDate:-1});
} //filterRiversWithYear

export function filterRiversWithYearRiver(year, river) {
    let riverLocal = river;
    let yearLocal = year;
    yearLocal=+yearLocal;
    
    switch(riverLocal) {
    case 'Все реки': {
        // TODO: дублирование, вызывай filterRiversWithYear(yearLocal)
        return River.find({
            scalingDate: {
                '$gte': new Date(yearLocal, 1, 1),          //больше или равно чем Дата
                '$lt': new Date(yearLocal+1, 1, 1)          //меньше чем Дата
            },
        }).sort({scalingDate:-1});
    }

    default: {
        return River.find({
            scalingDate: {
                '$gte': new Date(yearLocal, 1, 1),          //больше или равно чем Дата
                '$lt': new Date(yearLocal+1, 1, 1)          //меньше чем Дата
            },
            name: riverLocal
        }).sort({scalingDate:-1});
    }
    } //switch(riverLocal)

} //filterRivers

export function getRiverData(year, typeRiver) {
    let yearLocal = year;
    yearLocal=+yearLocal;
    
    return River.find({
        scalingDate: {
            '$gte': new Date(yearLocal, 1, 1),          //больше или равно чем Дата
            '$lt': new Date(yearLocal+1, 1, 1)          //меньше чем Дата
        },
        typeRiver: {'$eq': typeRiver}                   //поиск с учетом типа реки
    },
    { 
        _id: 0,
        // name: 0,
        levelToday: 1,
        scalingDate: 1
    }).sort({scalingDate:1});                      //сортировка в хронологическом порядке
} //getRiverData

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
