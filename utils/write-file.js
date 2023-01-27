import fs from 'fs';
import type_dictionary from "../libs/accepted-mime-types.js";
import {config} from "../configs/app-config.js";

const writeFile = async (res, req, fileName, mimeType) => {
    const type = type_dictionary[mimeType];

    await req.pipe(await fs.createWriteStream(config.files.baseDirectory + fileName + type))
        .on('error', (err) => {
            return res.status(500).send(err);
        })
        .on('finish', () => {
            return res.status(200).send('File uploaded successfully');
        });
};

export default writeFile;