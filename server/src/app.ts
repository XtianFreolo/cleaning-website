import express from "express";
import cors from "cors";

import quoteRoutes from "./routes/quoteRoutes";
import pool from "./db/pool";
const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        message: "Cleaning website API is running",
    });
});

app.get("/api/db-test", async (_req, res) => {
    try {

        const result = await pool.query(
            "SELECT NOW() AS current_time"
        );

        return res.status(200).json({
            message: "Database connected successfully.",
            databaseTime: result.rows[0].current_time,
        });
    } catch (error) {

        console.error("Database connection error:", error);

        return res.status(500).json({
            message: "Database connection failed.",
        });
    }
});

app.use("/api/quotes", quoteRoutes);

export default app;