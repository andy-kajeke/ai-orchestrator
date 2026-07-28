import dotenv from "dotenv";
import cosineSimilarity from "compute-cosine-similarity";
import { OpenAIEmbeddingProvider } from "../embeddings/OpenAIEmbeddingProvider.js";

dotenv.config();

const embeddingProvider = new OpenAIEmbeddingProvider(
  process.env.OPENAI_API_KEY,
);

const firstSentence = "Transfer UGX 5000 to Simon";
const secondSentence = "Send Simon UGX 5000";
const unrelatedSentence = "How do I cook rice?";

const firstVector = await embeddingProvider.embed(firstSentence);
const secondVector = await embeddingProvider.embed(secondSentence);
const unrelatedVector =
  await embeddingProvider.embed(unrelatedSentence);

const relatedScore = cosineSimilarity(
  firstVector,
  secondVector,
);

const unrelatedScore = cosineSimilarity(
  firstVector,
  unrelatedVector,
);

console.log({
  firstSentence,
  secondSentence,
  relatedScore,
});

console.log({
  firstSentence,
  unrelatedSentence,
  unrelatedScore,
});