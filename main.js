import express from "express";
import fs from "fs";
import {config} from "./configs/app-config.js";
import * as dotenv from 'dotenv';
import routes from "./src/routers/routes.js";

dotenv.config();

console.log(config.files.baseDirectory);

if (!fs.existsSync(config.files.baseDirectory)) {
    fs.mkdirSync(config.files.baseDirectory);
}

const app = express();
app.use(express.json());
app.use(express.static('data'));
const port = +process.env.PORT || 5000;


app.use("/file/:fileName", routes);


app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});

