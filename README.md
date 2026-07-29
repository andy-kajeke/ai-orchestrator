# Gypaid AI Orchestrator

Gypaid AI Orchestrator is a Node.js and Express service that routes user messages through a lightweight intent detector and an LLM provider. The current active provider is OpenAI, with placeholder files present for future Claude and Gemini support.

## Features

- Express API with versioned AI routes
- Health check endpoint
- Chat endpoint backed by an orchestrator layer
- Keyword-based intent routing for transfer, balance, transactions, reports, and general chat
- OpenAI Responses API integration
- OpenAI embedding provider and cosine similarity utility for semantic routing experiments

## Requirements

- Node.js 20 or newer
- npm
- OpenAI API key

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```bash
PORT=5000
LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5.5
```

Required:

- `OPENAI_API_KEY`: API key used by the OpenAI provider.

Optional:

- `PORT`: HTTP port. Defaults to `5000`.
- `LLM_PROVIDER`: LLM provider name. Defaults to `openai`.
- `OPENAI_MODEL`: OpenAI model used for chat responses. Defaults to `gpt-5.5`.

## Running the App

Development mode with Nodemon:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The server logs the active port and configured LLM provider when it starts.

## API

Base path:

```text
/api/v1/ai
```

### Health Check

```http
GET /api/v1/ai/health
```

Example response:

```json
{
  "status": "success",
  "message": "AI Orchestrator is healthy"
}
```

### Chat

```http
POST /api/v1/ai/chat
Content-Type: application/json
```

Request body:

```json
{
  "message": "Hello, what can you help me with?"
}
```

Example response:

```json
{
  "status": "success",
  "data": {
    "reply": "Hello! How can I help?",
    "metadata": {
      "provider": "openai",
      "model": "gpt-5.5",
      "responseId": "resp_...",
      "usage": null
    }
  }
}
```

For non-chat financial intents, the orchestrator currently returns placeholder responses such as `Transfer module coming soon.`

## Intent Routing

The current router uses simple keyword matching:

- `TRANSFER`: messages containing `transfer` or `send money`
- `BALANCE`: messages containing `balance`
- `TRANSACTIONS`: messages containing `transaction`
- `REPORT`: messages containing `report`
- `GENERAL_CHAT`: all other messages

`src/router/intent-examples.js`, `src/embeddings/OpenAIEmbeddingProvider.js`, and `src/utils/cosine-similarity.js` are available for semantic intent routing work.

## Project Structure

```text
src/
  app.js                         Express app setup
  server.js                      Server entrypoint
  bootstrap/container.js         Dependency wiring
  config/env.js                  Environment configuration
  controllers/ai.controller.js   HTTP controller
  routes/ai.routes.js            AI routes
  orchestrator/AIOrchestrator.js Intent-aware orchestration
  router/intent.router.js        Keyword intent detector
  providers/OpenAIProvider.js    Active OpenAI LLM provider
  embeddings/                    Embedding provider experiments
  interfaces/                    Provider interfaces
  tests/                         Manual test scripts
  utils/                         Shared utilities
```

## Manual Embedding Test

The embedding test calls the OpenAI API and requires network access plus `OPENAI_API_KEY`:

```bash
node src/tests/embedding.test.js
```

It prints the embedding vector length and the first few values.

## Git Notes

`node_modules/` and `.env` are ignored by Git. Commit `package-lock.json` so dependencies can be reproduced with `npm install`.
