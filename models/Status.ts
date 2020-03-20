export class Status {
    id: string;
    alias: string;
    message: string;

    constructor(id:string, alias:string, message: string){
        this.id = id;
        this.alias = alias  
        this.message = message;
    }
    
    getID(){
        return this.id;
    }
    setMessage(message:string){
        this.message = message;
    };
    getMessage(){
        return this.message;
    };
    getAlias(){
        return this.alias;
    };
}