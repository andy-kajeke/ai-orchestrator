export class LLMProviderInterface {
  async generate(_messages, _options = {}) {
    throw new Error("generate() must be implemented by the LLM provider");
  }
}