const ILLMProvider = require("../interfaces/ILLMProvider");

class ClaudeProvider extends ILLMProvider {

    async generate(messages){

        console.log("Talking to Claude...");

    }

}

module.exports = ClaudeProvider;