import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/v1/ai/health", (_req, res) => {
  return res.status(200).json({
    status: "success",
    message: "AI Orchestrator is healthy",
  });
});

app.use("/api/v1/ai", aiRoutes);

app.use((req, res) => {
  return res.status(404).json({
    status: "failed",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

export default app;