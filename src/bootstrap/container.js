import { env } from "../config/env.js";
import { OpenAIProvider } from "../providers/OpenAIProvider.js";
import { LLMService } from "../services/LLMService.js";
import { IntentRouter } from "../router/intent.router.js";
import { AIOrchestrator } from "../orchestrator/AIOrchestrator.js";

function createLLMProvider() {
  switch (env.llmProvider.toLowerCase()) {
    case "openai":
      return new OpenAIProvider({
        apiKey: env.openai.apiKey,
        model: env.openai.model,
      });

    default:
      throw new Error(`Unsupported LLM provider configured: ${env.llmProvider}`);
  }
}

const llmProvider = createLLMProvider();

const llmService = new LLMService({ provider: llmProvider });

const intentRouter = new IntentRouter();

const orchestrator = new AIOrchestrator({ intentRouter, llmService });

export const container = Object.freeze({
  llmProvider,
  llmService,
  intentRouter,
  orchestrator
});