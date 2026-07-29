import { env } from "../config/env.js";
import { OpenAIProvider } from "../providers/OpenAIProvider.js";
import { LLMService } from "../services/LLMService.js";
//import { IntentRouter } from "../router/intent.router.js";
import { AIOrchestrator } from "../orchestrator/AIOrchestrator.js";

import { OpenAIEmbeddingProvider } from "../embeddings/OpenAIEmbeddingProvider.js";
import { SemanticIntentRouter } from "../router/semantic-intent.router.js";
import { INTENT_EXAMPLES } from "../router/intent-examples.js";

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

const embeddingProvider = new OpenAIEmbeddingProvider(env.openai.apiKey);

const intentRouter = new SemanticIntentRouter({
  embeddingProvider,
  intentExamples: INTENT_EXAMPLES,
  confidenceThreshold: 0.55,
  ambiguityMargin: 0.05,
});

const orchestrator = new AIOrchestrator({ intentRouter, llmService });

export async function initializeContainer() {
  await intentRouter.initialize();

  return Object.freeze({
    llmProvider,
    llmService,
    embeddingProvider,
    intentRouter,
    orchestrator,
  });
}