import fs from 'fs';
import type_dictionary from "../libs/accepted-mime-types.js";
import {config} from "../configs/app-config.js";

const readFile = async (res, fileName, mimetype) => {
    const type = type_dictionary[mimetype];
    const filePath = config.files.baseDirectory + fileName + type;

    res.attachment(fileName);
    res.type(mimetype);

    fs.createReadStream(filePath).pipe(res);
};

export default readFile;
