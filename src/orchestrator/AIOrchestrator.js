export class AIOrchestrator {

    constructor({ intentRouter, llmService }){
        this.intentRouter = intentRouter;
        this.llmService = llmService;
    }

    async handle(message){

        const intent = this.intentRouter.detect(message);

        console.log(intent);

        switch(intent.type){

            case "GENERAL_CHAT":
                return this.llmService.chat({
                    messages:[ 
                        {
                            role:"user",
                            content:message
                        }
                    ]
                });

            case "TRANSFER":
                return { text:"Transfer module coming soon." };

            case "BALANCE":
                return { text:"Balance module coming soon." };

            case "REPORT":
                return { text:"Report module coming soon." };

            default:
                return { text:"Unknown Intent." };
        }

    }

}