export function createAIController({ llmService }) {
  if (!llmService) {
    throw new Error("AI controller requires llmService");
  }

  return {
    async chat(req, res) {
      try {
        const message = req.body?.message?.trim();

        if (!message) {
          return res.status(400).json({
            status: "failed",
            message: "Message is required",
          });
        }

        const result = await llmService.chat({
          messages: [
            {
              role: "user",
              content: message,
            },
          ],

          instructions:
            "You are the AI learning assistant. Explain concepts practically and clearly.",
        });

        return res.status(200).json({
          status: "success",
          data: {
            reply: result.text,
            metadata: result.metadata,
          },
        });
      } catch (error) {
        console.error("AI chat request failed:", error);

        return res.status(503).json({
          status: "failed",
          message:
            "The AI service is temporarily unavailable. Please try again.",
        });
      }
    },
  };
}