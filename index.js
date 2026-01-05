import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// import routes
import { indexRouter } from "./routes/indexRouter.js";

// setup server
const app = express()
const server = createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 10240  // 10KB 
});

// static files
app.use(express.static('public'))

// index
app.get("/", indexRouter)

// connc
io.on("connection", (socket) => {
    console.log("A player connected")
    let turn = "" // placeholder im just testing


    socket.on("disconnect", () => {
        console.log("A player left")
    })

    socket.on("player:ask", (player, card) => {
        if (turn !== socket.id) {
            // handle
        }
        console.log(`Player ${socket.id} asked ${player} for ${card}`);
    })

    socket.on("player:draw", () => {
        if (turn !== socket.id) {
            return;
        }
        // code that gets a card from the deck
        // ...

        // This sends the event ONLY to the player who triggered it or the current turn.
        // This is so that their private state aka hand state remains.. private.
        socket.to(socket.id).emit("player:draw", { message: "hand" });

        // This sends the event to all players EXCEPT the one who triggered it.
        // This is so that the event will not be sent twice and corrupt the state
        socket.broadcast.emit("player:draw");


        console.log("Player drew a card")
    })
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