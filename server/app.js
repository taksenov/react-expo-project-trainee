import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {serverPort} from '../etc/config.json';

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();
 
const app = express();
const SERVER_PORT = +serverPort;

app.use( bodyParser.json() );
app.use( cors({ origin: '*' }) );

/**
 * Notes API
 */
app.get('/notes', (req, res) => {
    db.listNotes().then( data => res.send(data) );
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then( data => res.send(data) );
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then( data => res.send(data) );
});
// Notes API


/**
 * Rivers API
 */
app.get('/rivers', (req, res) => {
    db.listRivers().then( data => res.send(data) );
});

app.get('/filter-rivers-by-year-river', (req, res) => {
    db.filterRiversWithYearRiver(req.query.year,req.query.river).then( data => res.send(data) );
});

app.get('/get-river-data', (req, res) => {
    db.getRiverData(req.query.year,req.query.typeRiver).then( data => res.send(data) );
});

app.get('/filter-rivers-by-year', (req, res) => {
    db.filterRiversWithYear(req.query.year).then( data => res.send(data) );
});

app.post('/rivers', (req, res) => {
    db.createRiver(req.body).then( data => res.send(data) );
});

app.delete('/rivers/:id', (req, res) => {
    db.deleteRiver(req.params.id).then( data => res.send(data) );
});
// Rivers API


const server = app.listen(SERVER_PORT, () => {
    console.log(`Server is up and running on ${SERVER_PORT} port`);
});

