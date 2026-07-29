export class AIOrchestrator {
  constructor({ intentRouter, llmService }) {
    this.intentRouter = intentRouter;
    this.llmService = llmService;
  }

  async handle(message) {
    const intent = await this.intentRouter.detect(message);

    console.log("Detected intent:", intent);

    switch (intent.type) {
      case "TRANSFER":
        return {
          text: "Transfer module coming soon.",
          metadata: {
            intent: intent.type,
            confidence: intent.confidence,
            method: intent.method,
            matchedPhrase: intent.matchedPhrase,
            handledBy: "orchestrator",
          },
        };

      case "BALANCE":
        return {
          text: "Balance module coming soon.",
          metadata: {
            intent: intent.type,
            confidence: intent.confidence,
            method: intent.method,
            handledBy: "orchestrator",
          },
        };

      case "TRANSACTIONS":
        return {
          text: "Transactions module coming soon.",
          metadata: {
            intent: intent.type,
            confidence: intent.confidence,
            method: intent.method,
            handledBy: "orchestrator",
          },
        };

      case "REPORT":
        return {
          text: "Report module coming soon.",
          metadata: {
            intent: intent.type,
            confidence: intent.confidence,
            method: intent.method,
            handledBy: "orchestrator",
          },
        };

      case "CLARIFICATION_REQUIRED":
        return {
          text:
            "I am not fully certain what you want to do. Could you clarify your request?",
          metadata: {
            intent: intent.type,
            confidence: intent.confidence,
            candidates: intent.candidates,
            handledBy: "orchestrator",
          },
        };

      case "GENERAL_CHAT":
      default:
        return this.llmService.chat({
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        });
    }
  }
}