import fs from 'fs';
import path from 'path';
import type_dictionary from "../libs/accepted_mime_types.js";
import {fileURLToPath} from 'url';
import {directory} from "../configs/app_config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Path = path.join(__dirname, '..', directory);

const read_file = async (req, res, fileName, mimetype) => {
    if (!fileName) return res.status(407).send('name is required')

    const type = type_dictionary[mimetype];
    const filePath = Path + fileName + type;

    res.attachment(fileName);
    res.setHeader('content-type', mimetype);

    fs.createReadStream(filePath).pipe(res);
};

export default read_file;
