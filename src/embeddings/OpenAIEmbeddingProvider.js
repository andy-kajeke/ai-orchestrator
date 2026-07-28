import OpenAI from "openai";
import { EmbeddingProviderInterface } from "../interfaces/EmbeddingProviderInterface.js";

export class OpenAIEmbeddingProvider extends EmbeddingProviderInterface {

    constructor(apiKey) {
        super();

        this.client = new OpenAI({ apiKey });
    }

    async embed(text) {

        const response = await this.client.embeddings.create({
            model: "text-embedding-3-small",
            input: text
        });

        return response.data[0].embedding;
    }
}
