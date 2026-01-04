import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws"

import { indexRouter } from "./routes/indexRouter.js";

const app = express()
const server = createServer(app);

app.use(express.static('public'))

app.get("/", indexRouter)

const PORT = process.env.PORT || 3000;
const LOCAL_IP = process.env.LOCAL_IP || ""
app.listen(PORT, LOCAL_IP, (error) => {
    if (error) {
        throw error
    }
    console.log(`Server started at http://${LOCAL_IP || "localhost"}:${PORT}`)
})