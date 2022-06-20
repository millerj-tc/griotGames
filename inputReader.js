import salonGenreMessage from "./salonGenre.js";

export class inputReader
{
    constructor(){
    
    }
    
    static inputReceived(inputField,input){
        
     
        this.sendInputMessage(inputField,input);
    }
    
    static sendInputMessage(inputField,input){
        
        const $ev = new Event(inputField,{detail:{input:input}});
        
        document.dispatchEvent($ev);
    }
}