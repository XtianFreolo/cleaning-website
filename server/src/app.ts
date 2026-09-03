import express from "express";
import cors from "cors";

import quoteRoutes from "./routes/quoteRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        message: "Cleaning website API is running",
    });
});

app.use("/api/quotes", quoteRoutes);

export default app;