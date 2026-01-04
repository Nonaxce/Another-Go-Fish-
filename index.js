import express from "express";


const app = express();







const PORT = process.env.PORT || 3000;
const LOCAL_IP = process.env.LOCAL_IP || ""
app.listen(PORT, LOCAL_IP, (error) => {
    if (error) {
        throw error
    }
    console.log(`Server started at http://${LOCAL_IP || "localhost"}:${PORT}`)
})