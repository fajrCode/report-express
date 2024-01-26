import express from "express";
import report from './report.js'
import path from 'path'
import { fileURLToPath } from "url";

const app = express();

//di es module tidak bisa menggunakan __dirname lgsg, maka di buat terlebih dahulu
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))


app.use(report)

export default app