import { Router } from "express"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

export {
    indexRouter
}