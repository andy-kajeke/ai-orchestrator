export class IntentRouter {

    detect(message){

        const text = message.toLowerCase();

        if(text.includes("transfer") || text.includes("send money")){
            return { type: "TRANSFER" };
        }

        if(text.includes("balance")){
            return { type: "BALANCE" };
        }

        if(text.includes("transaction")){
            return { type: "TRANSACTIONS" };
        }

        if(text.includes("report")){
            return { type: "REPORT" };
        }

        return { type:"GENERAL_CHAT" };

    }

}