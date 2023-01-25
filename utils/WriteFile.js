const fs = require('fs');
const path = require('path');
const type_dictionary = require("./types");
const savePath = path.join(__dirname, '../uploads/');

const WriteFile = async (req, res) => {
    const fileName = req.params.fileName;
    const type = type_dictionary[req.headers['content-type']];
    console.log(type);
    const writer = await fs.createWriteStream(savePath + fileName + type);
    await req.pipe(writer);
    writer.on('error', (err) => {
        return res.status(500).send(err);
    });
    writer.on('finish', () => {
        return res.status(200).send('File uploaded successfully');
    });
};

module.exports = WriteFile;