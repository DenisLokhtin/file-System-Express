const fs = require('fs');
const path = require('path');
const type_dictionary = require("./types");

const ReadFile = async (req, res, file) => {
    const name = req.params.fileName;
    const type = type_dictionary[file.mimetype];
    const fileName = '../uploads/' + name + type;
    const filePath = path.join(__dirname, fileName);
    res.attachment(name);
    res.setHeader('content-type', file.mimetype);
    fs.createReadStream(filePath).pipe(res);
};

module.exports = ReadFile;
