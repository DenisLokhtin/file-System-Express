const express = require('express');
const file = require('./app/file');
const cors = require("cors");
const fs = require("fs");

const directory = './uploads';
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

const app = express();
app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());
const port = 8000;

app.use('/file', file);

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});

