import express from 'express';

const app = express();

app.get('/notes', (req, res) => {

});

app.post('/notes', (req, res) => {

});

app.delete('/notes/:id', (req, res) => {

});

const SERVER_PORT = 8080;
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server is up and running on ${SERVER_PORT} port`);
});

