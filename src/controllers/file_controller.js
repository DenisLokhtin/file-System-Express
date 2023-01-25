import {getFile, uploadFile} from "../services/file_service.js";

export const upload = async (req, res) => {
   await uploadFile(req, res);
};

export const download = async (req, res) => {
    await getFile(req, res);
};

