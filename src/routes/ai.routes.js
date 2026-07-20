import { Router } from "express";
import { container } from "../bootstrap/container.js";
import { createAIController } from "../controllers/ai.controller.js";

const router = Router();

const aiController = createAIController({
  orchestrator: container.orchestrator,
});

router.post("/chat", aiController.chat);

export default router;