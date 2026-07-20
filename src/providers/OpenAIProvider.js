import OpenAI from "openai";
import { LLMProviderInterface } from "../interfaces/llmProviderInterface.js";

export class OpenAIProvider extends LLMProviderInterface {
  constructor({ apiKey, model }) {
    super();

    if (!apiKey) {
      throw new Error("OpenAI API key is required");
    }

    if (!model) {
      throw new Error("OpenAI model is required");
    }

    this.model = model;
    this.client = new OpenAI({ apiKey });
  }

  async generate(messages, options = {}) {
    this.#validateMessages(messages);

    const response = await this.client.responses.create({
      model: options.model ?? this.model,

      instructions:
        options.instructions ??
        "You are a helpful AI assistant. Respond clearly and accurately.",

      input: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    if (!response.output_text) {
      throw new Error("The LLM provider returned an empty response");
    }

    return {
      text: response.output_text,

      metadata: {
        provider: "openai",
        model: options.model ?? this.model,
        responseId: response.id,
        usage: response.usage ?? null,
      },
    };
  }

  #validateMessages(messages) {
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new TypeError("messages must be a non-empty array");
    }

    for (const message of messages) {
      if (!message?.role || !message?.content) {
        throw new TypeError(
          "Each message must contain a role and non-empty content",
        );
      }
    }
  }
}