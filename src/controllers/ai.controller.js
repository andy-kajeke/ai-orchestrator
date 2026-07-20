export function createAIController({ orchestrator }) {
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

        const result = await orchestrator.handle(message);

        return res.status(200).json({
          status: "success",
          data: {
            reply: result.text,
            metadata: result.metadata ?? null,
          },
        });
      } catch (error) {
        console.error("AI request failed:", error);

        return res.status(500).json({
          status: "failed",
          message: "Unable to process request",
        });
      }
    },
  };
}