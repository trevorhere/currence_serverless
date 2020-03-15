const moment = require('moment');

export class Status {
    id: string;
    alias: string;
    message: string;
    user_id: string;
    user_alias: string;
    created_at: string;

    constructor(user_id: string, user_alias:string, message: string){
        this.id = Math.random().toString();
        this.created_at = moment().format();     
        this.user_alias = user_alias  
        this.user_id = user_id;
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
    getUserID(){
        return this.user_id;
    };
}