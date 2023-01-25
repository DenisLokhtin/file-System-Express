import express from "express";
import fs from "fs";
import {directory} from "./configs/app_config.js";
import * as dotenv from 'dotenv';
import routes from "./src/routers/routes.js";

dotenv.config();

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

const app = express();
app.use(express.json());
app.use(express.static('data'));
const port = Number(process.env.PORT) || 5000;


app.use("/file/:fileName", routes);


app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});

