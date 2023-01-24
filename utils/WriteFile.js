const fs = require('fs');
const path = require('path');
const savePath = path.join(__dirname, '../uploads/');

const WriteFile = async (req, res) => {
    const fileName = req.params.fileName;
    const writer = await fs.createWriteStream(savePath + fileName);
    await req.pipe(writer);
    writer.on('error', (err) => {
        return res.status(500).send(err);
    });
    writer.on('finish', () => {
        return res.status(200).send('File uploaded successfully');
    });
};

module.exports = WriteFile;