const path = require('path');
const express = require("express");
const WriteFile = require("../utils/WriteFile");
const ReadFile = require("../utils/ReadFile");
const pool = require("../db");
const router = express.Router();
const savePath = path.join(__dirname, '../uploads/');


router.put('/:fileName', async (req, res) => {
    const file = await pool.query(`SELECT * FROM file WHERE name = '${req.params.fileName}' LIMIT 1`)

    if (!file.rows.length) {
        await pool.query(
            "INSERT INTO file (path, name, mimeType, size) VALUES ($1, $2, $3, $4)",
            [savePath, req.params.fileName, req.headers['content-type'], req.headers['content-length']]
        );
    } else {
        await pool.query(
            "UPDATE file SET path = $1, mimetype = $2, size =  $3 WHERE name = $4;",
            [savePath, req.headers['content-type'], req.headers['content-length'], req.params.fileName]
        )
    }
    await WriteFile(req, res);
});

router.get('/:fileName', async (req, res) => {
    const file = await pool.query(`SELECT * FROM file WHERE name = '${req.params.fileName}' LIMIT 1`)

    if(!file.rows.length) return res.status(404).send('not found');

    await ReadFile(req, res, file.rows[0]);
});

module.exports = router;