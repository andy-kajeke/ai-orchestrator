class ILLMProvider {

    async generate(messages, options = {}) {
        throw new Error("generate() not implemented");
    }

}

module.exports = ILLMProvider;