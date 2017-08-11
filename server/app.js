import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const SERVER_PORT = 8080;
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server is up and running on ${SERVER_PORT} port`);
});

