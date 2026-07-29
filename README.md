# AI Orchestrator

AI Orchestrator is a Node.js and Express service that routes user messages through an AI orchestration layer. It uses OpenAI for chat responses and OpenAI embeddings for semantic intent detection.

## Features

- Express API with versioned AI routes
- Health check endpoint
- Chat endpoint backed by an orchestrator layer
- Semantic intent routing for transfer, balance, transactions, reports, clarifications, and general chat
- OpenAI Responses API integration
- OpenAI embedding provider for intent classification
- Cosine similarity matching against configured intent examples

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

The server logs the active port when it starts.

During startup, the app initializes the semantic intent router by embedding the examples in `src/router/intent-examples.js`. This requires a valid `OPENAI_API_KEY` and network access before the HTTP server can start.

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
    "reply": "Transfer module coming soon.",
    "metadata": {
      "intent": "TRANSFER",
      "confidence": 0.82,
      "method": "semantic",
      "matchedPhrase": "Send UGX to Simon",
      "handledBy": "orchestrator"
    }
  }
}
```

For `GENERAL_CHAT`, the orchestrator forwards the message to the configured OpenAI chat provider and returns provider metadata such as model, response ID, and token usage.

For financial intents, the orchestrator currently returns placeholder responses such as `Transfer module coming soon.`

## Intent Routing

The active router is `SemanticIntentRouter`. It embeds each incoming message, compares it to the examples in `src/router/intent-examples.js`, and selects the closest intent using cosine similarity.

Supported intent types:

- `TRANSFER`
- `BALANCE`
- `TRANSACTIONS`
- `REPORT`
- `CLARIFICATION_REQUIRED`
- `GENERAL_CHAT`

Semantic routing settings are currently configured in `src/bootstrap/container.js`:

- `confidenceThreshold`: `0.55`
- `ambiguityMargin`: `0.05`

If the top semantic match is below the confidence threshold, the request falls back to `GENERAL_CHAT`. If the top matches are too close across different intents, the orchestrator returns a clarification prompt.

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
  router/intent.router.js        Legacy keyword intent detector
  router/semantic-intent.router.js
                                 Active semantic intent detector
  router/intent-examples.js      Example phrases used for semantic matching
  providers/OpenAIProvider.js    Active OpenAI LLM provider
  embeddings/                    OpenAI embedding provider
  interfaces/                    Provider interfaces
  tests/                         Manual test scripts
  utils/                         Shared utilities
```

## Manual Embedding Test

The embedding test calls the OpenAI API and requires network access plus `OPENAI_API_KEY`:

```bash
node src/tests/embedding.test.js
```

It compares similar and unrelated phrases, then prints cosine similarity scores.

## Git Notes

`node_modules/` and `.env` are ignored by Git. Commit `package-lock.json` so dependencies can be reproduced with `npm install`.
