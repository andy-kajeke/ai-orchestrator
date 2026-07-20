export class LLMService {
  constructor({ provider }) {
    if (!provider || typeof provider.generate !== "function") {
      throw new TypeError(
        "LLMService requires a provider implementing generate()",
      );
    }

    this.provider = provider;
  }

  async chat({ messages, instructions, model }) {
    return this.provider.generate(messages, {
      instructions,
      model,
    });
  }
}