const ILLMProvider = require("../interfaces/ILLMProvider");

class GeminiProvider extends ILLMProvider {

    async generate(messages){

        console.log("Talking to Gemini...");

    }

}

module.exports = GeminiProvider;