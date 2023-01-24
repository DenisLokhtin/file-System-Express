const fs = require('fs');
const path = require('path');

const ReadFile = async (req, res) => {
    const name = req.params.fileName;
    const fileName = '../uploads/' + name;
    await res.attachment(name);
    await res.sendFile(path.join(__dirname, fileName), (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log('File sent!');
        }
    });
};

module.exports = ReadFile;
