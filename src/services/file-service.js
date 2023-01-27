import path from "path";
import {fileURLToPath} from 'url';
import postgres from "../../configs/storage-config.js";
import pkg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const {Pool} = pkg;
const savePath = path.join(__dirname, "../data/");
const pool = new Pool(postgres);

class FileStorage {
    constructor() {
    }

    async uploadFile(fileName, type, size) {
        const file = await pool.query(`SELECT * FROM file WHERE name = '${fileName}' LIMIT 1`)

        if (!file.rows.length) {
            await pool.query(
                "INSERT INTO file (path, name, mimeType, size) VALUES ($1, $2, $3, $4)",
                [savePath, fileName, type, size]
            );
        } else {
            await pool.query(
                "UPDATE file SET path = $1, mimetype = $2, size =  $3 WHERE name = $4;",
                [savePath, type, size, fileName]
            )
        }
    }

    async getFile(fileName) {
        return await pool.query(`SELECT * FROM file WHERE name = '${fileName}' LIMIT 1`)
    }
}

export default FileStorage;