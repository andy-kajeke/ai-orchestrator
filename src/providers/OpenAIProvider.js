const ILLMProvider = require("../interfaces/ILLMProvider");

class OpenAIProvider extends ILLMProvider {

    async generate(messages) {

        console.log("Talking to OpenAI...");

    }

}

module.exports = OpenAIProvider;