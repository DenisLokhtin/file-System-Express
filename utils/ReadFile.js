const fs = require('fs');
const path = require('path');

const ReadFile = async (req, res) => {
    const name = req.params.fileName;
    const fileName = '../uploads/' + name;
    const filePath = path.join(__dirname, fileName);
    res.attachment(name);
    fs.createReadStream(filePath).pipe(res);
};

module.exports = ReadFile;
