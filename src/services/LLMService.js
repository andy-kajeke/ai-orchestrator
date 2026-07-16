class LLMService {

    constructor(provider){

        this.provider = provider;

    }

    async chat(messages){

        return this.provider.generate(messages);

    }

}

module.exports = LLMService;