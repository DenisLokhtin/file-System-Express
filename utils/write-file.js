import fs from 'fs';
import type_dictionary from "../libs/accepted-mime-types.js";
import {config} from "../configs/app-config.js";

const writeFile = async (fileName, mimeType) => {
    const type = type_dictionary[mimeType];
    return fs.createWriteStream(config.files.baseDirectory + fileName + type);
};

export default writeFile;