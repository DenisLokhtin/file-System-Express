import fs from 'fs';
import path from 'path';
import type_dictionary from "../libs/accepted_mime_types.js";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {directory} from "../configs/app_config.js";

const savePath = path.join(__dirname, '..', directory);

const write_file = async (fileName, mimeType, res, req) => {
    if (!fileName) return res.status(407).send('name is required')

    const type = type_dictionary[mimeType];

    await res.pipe(await fs.createWriteStream(savePath + fileName + type))
        .on('error', (err) => {
            return req.status(500).send(err);
        })
        .on('finish', () => {
            return req.status(200).send('File uploaded successfully');
        });
};

export default write_file;