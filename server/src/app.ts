import "dotenv/config";
import express from "express";
import router from "@/routes";
import cookieParser from "cookie-parser";
import requestIp from "request-ip";
import cors from "cors";
import errorHandler from "@/middlewares/errorHandler";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(requestIp.mw());
app.use(cookieParser());

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});