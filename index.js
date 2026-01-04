import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// import routes
import { indexRouter } from "./routes/indexRouter.js";

// setup server
const app = express()
const server = createServer(app);
const io = new Server(server);

// static files
app.use(express.static('public'))

// index
app.get("/", indexRouter)

io.on("connection", (socket) => {
    console.log("A user connected")
})



// start server
const PORT = process.env.PORT || 3000;
const LOCAL_IP = process.env.LOCAL_IP || ""
server.listen(PORT, LOCAL_IP, (error) => {
    if (error) {
        throw error
    }
    console.log(`Server started at http://${LOCAL_IP || "localhost"}:${PORT}`)
})