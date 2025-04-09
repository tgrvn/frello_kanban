import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({status: true, message: "Welcome to the server"});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});