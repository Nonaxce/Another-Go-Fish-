import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// import routes
import { indexRouter } from "./routes/indexRouter.js";

// import managers
import { handleAskForCard, handleCardDraw } from "./gameManager/cardManager.js";

// setup server
const app = express()
const server = createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 24576  // 24KB 
});

// static files
app.use(express.static('public'))

// index
app.get("/", indexRouter)

// connc
io.on("connection", (socket) => {
    console.log("A player connected")


    socket.on("disconnect", () => {
        console.log("A player left")
    })
    // player ask for a card 
    socket.on("player:ask", (card, player) => handleAskForCard(card, player))
    // player draws a card from deck
    socket.on("player:draw", () => handleCardDraw(socket))
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