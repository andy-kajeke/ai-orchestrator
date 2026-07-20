import dotenv from "dotenv";

dotenv.config();

function requireEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = Object.freeze({
  port: Number(process.env.PORT ?? 5000),

  openai: {
    apiKey: requireEnvironmentVariable("OPENAI_API_KEY"),
    model: process.env.OPENAI_MODEL ?? "gpt-5.5",
  },

  llmProvider: process.env.LLM_PROVIDER ?? "openai",
});