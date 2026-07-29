import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { initializeContainer } from "./bootstrap/container.js";

async function startServer() {
  try {
    const container = await initializeContainer();

    const app = createApp({
      orchestrator: container.orchestrator,
    });

    const server = app.listen(env.port, () => {
      console.log(
        `AI Orchestrator running on port ${env.port}`,
      );
    });

    process.on("SIGTERM", () => {
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", () => {
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
}

startServer();