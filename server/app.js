import express from 'express';
import bodyParser from 'body-parser';

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const app = express();

app.use( bodyParser.json() );

app.get('/notes', (req, res) => {
    db.listNotes().then( data => res.send(data) );
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then( data => res.send(data) );
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then( data => res.send(data) );
});

const SERVER_PORT = 8080;
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server is up and running on ${SERVER_PORT} port`);
});

