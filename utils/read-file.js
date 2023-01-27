import fs from 'fs';
import type_dictionary from "../libs/accepted-mime-types.js";
import {config} from "../configs/app-config.js";

const readFile = async (fileName, mimetype) => {
    const type = type_dictionary[mimetype];
    const filePath = config.files.baseDirectory + fileName + type;

    return fs.createReadStream(filePath);
};

export default readFile;
