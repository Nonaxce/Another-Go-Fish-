const socket = io()

socket.on("connect", () => {
    socket.emit("player:ask", "yt65wDq", "AS")
})
