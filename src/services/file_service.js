import path from "path";
import write_file from "../../utils/write_file.js";
import read_file from "../../utils/read_file.js";
import pool from "../../configs/storage_config.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const savePath = path.join(__dirname, "../data/");


export const uploadFile = async (req, res) => {
    if(req.headers['content-length'] === '0') return res.status(404).send('file not send');

    const fileName = req.params.fileName;
    const type = req.headers['content-type'];
    const size = req.headers['content-length'];

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
    await write_file(fileName, type, req, res);
};

export const getFile = async (req, res) => {
    const file = await pool.query(`SELECT * FROM file WHERE name = '${req.params.fileName}' LIMIT 1`)

    if(!file.rows.length) return res.status(404).send('not found');

    await read_file(req, res, file.rows[0].name, file.rows[0].mimetype);
};

