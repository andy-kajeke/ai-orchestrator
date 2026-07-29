import { Router } from "express";
import { createAIController } from "../controllers/ai.controller.js";

export function createAIRoutes({ orchestrator }) {
  const router = Router();

  const aiController = createAIController({
    orchestrator,
  });

  router.post("/chat", aiController.chat);

  return router;
}