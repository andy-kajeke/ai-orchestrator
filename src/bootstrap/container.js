import { env } from "../config/env.js";
import { OpenAIProvider } from "../providers/OpenAIProvider.js";
import { LLMService } from "../services/LLMService.js";

function createLLMProvider() {
  switch (env.llmProvider.toLowerCase()) {
    case "openai":
      return new OpenAIProvider({
        apiKey: env.openai.apiKey,
        model: env.openai.model,
      });

    default:
      throw new Error(
        `Unsupported LLM provider configured: ${env.llmProvider}`,
      );
  }
}

const llmProvider = createLLMProvider();

const llmService = new LLMService({
  provider: llmProvider,
});

export const container = Object.freeze({
  llmProvider,
  llmService,
});