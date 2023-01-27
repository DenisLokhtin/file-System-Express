import express from "express";
import FileController from "../controllers/file-controller.js";

const router = express.Router({mergeParams: true});
const fileController = new FileController();

router.put("/", fileController.upload);

router.get("/", fileController.download);

export default router;