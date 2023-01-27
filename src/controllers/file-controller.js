import FileStorage from "../services/file-service.js";
import writeFile from "../../utils/write-file.js";
import readFile from "../../utils/read-file.js";

const fileStorage = new FileStorage();


class FileController {
    constructor() {
    }

    async upload(req, res) {
        if (req.headers['content-length'] === '0') return res.status(404).send('file not send');

        const fileName = req.params.fileName;

        if (!fileName) return res.status(407).send('name is required')

        const type = req.headers['content-type'];
        const size = req.headers['content-length'];
        const writer = await writeFile(fileName, type);

        await req.pipe(writer)
            .on('error', (err) => {
                return res.status(500).send(err);
            })
            .on('finish', () => {
                return res.status(200).send('File uploaded successfully');
            });
        await fileStorage.uploadFile(fileName, type, size);
    }

    async download(req, res) {
        const name = req.params.fileName;

        if (!name) return res.status(407).send('name is required')

        const file = await fileStorage.getFile(name);

        if (!file.rows[0]) return res.status(404).send('not found');

        const reader = await readFile(file.rows[0].name, file.rows[0].mimetype);

        res.attachment(file.rows[0].name);
        res.type(file.rows[0].mimetype);
        reader.pipe(res);
    }
}

export default FileController;


