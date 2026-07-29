import { cosineSimilarity } from "../utils/cosine-similarity.js";

export class SemanticIntentRouter {
  constructor({
    embeddingProvider,
    intentExamples,
    confidenceThreshold = 0.55,
    ambiguityMargin = 0.05,
  }) {
    if (!embeddingProvider) {
      throw new Error("SemanticIntentRouter requires embeddingProvider");
    }

    this.embeddingProvider = embeddingProvider;
    this.intentExamples = intentExamples;
    this.confidenceThreshold = confidenceThreshold;
    this.ambiguityMargin = ambiguityMargin;
    this.intentVectors = [];
    this.initialized = false;
  }

  async initialize() {
    const vectors = [];

    for (const intent of this.intentExamples) {
      for (const phrase of intent.phrases) {
        const embedding = await this.embeddingProvider.embed(phrase);

        vectors.push({
          type: intent.type,
          phrase,
          embedding,
        });
      }
    }

    this.intentVectors = vectors;
    this.initialized = true;

    console.log(
      `Semantic intent router initialized with ${vectors.length} examples`,
    );
  }

  async detect(message) {
    if (!this.initialized) {
      throw new Error(
        "SemanticIntentRouter must be initialized before use",
      );
    }

    const queryEmbedding =
      await this.embeddingProvider.embed(message);

    const matches = this.intentVectors
      .map((intentVector) => ({
        type: intentVector.type,
        matchedPhrase: intentVector.phrase,
        confidence: cosineSimilarity(
          queryEmbedding,
          intentVector.embedding,
        ),
      }))
      .sort((first, second) => second.confidence - first.confidence);

    const bestMatch = matches[0];
    const secondBestMatch = matches[1];

    if (!bestMatch || bestMatch.confidence < this.confidenceThreshold) {
      return {
        type: "GENERAL_CHAT",
        confidence: bestMatch?.confidence ?? 0,
        method: "semantic",
        reason: "BELOW_CONFIDENCE_THRESHOLD",
      };
    }

    if (
      secondBestMatch &&
      bestMatch.type !== secondBestMatch.type &&
      bestMatch.confidence - secondBestMatch.confidence <
        this.ambiguityMargin
    ) {
      return {
        type: "CLARIFICATION_REQUIRED",
        confidence: bestMatch.confidence,
        method: "semantic",
        candidates: [
          {
            type: bestMatch.type,
            confidence: bestMatch.confidence,
          },
          {
            type: secondBestMatch.type,
            confidence: secondBestMatch.confidence,
          },
        ],
      };
    }

    return {
      type: bestMatch.type,
      confidence: bestMatch.confidence,
      method: "semantic",
      matchedPhrase: bestMatch.matchedPhrase,
    };
  }
}