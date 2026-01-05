async function handleCardDraw(socket) {
    let turn = ""
    if (!socket) {
        return;
    }
    if (turn !== socket.id) {
        // return; testing purposes
    }

    // ...
    // code that gets a card from the deck
    // ...

    try {
        // This sends the event ONLY to the player who triggered it or the current turn.
        // This is so that their private state aka hand state remains.. private.
        await socket.to(socket.id).emit("player:draw", { message: "hand" });

        // This sends the event to all players EXCEPT the one who triggered it.
        // This is so that the event will not be sent twice and corrupt the state
        await socket.broadcast.emit("player:draw");
    } catch (error) {
        console.error("socket can't send", error)
    }
}

async function handleAskForCard(card, targetPlayer) {
    if (turn !== socket.id) {
        // handle
    }
    console.log(`Player ${socket.id} asked ${player} for ${card}`);
}

// export
export {
    handleCardDraw,
    handleAskForCard
}