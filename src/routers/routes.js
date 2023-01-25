import express from "express";
import {upload, download} from "../controllers/file_controller.js";

const router = express.Router({mergeParams: true});

router.put("/", upload);

router.get("/", download);

export default router;