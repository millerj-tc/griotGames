export class charHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
    }
    
    AddFunctionsToCharacters(){
        
        for(const char of this.scenarioHandler.gameHandler.database.data){
            
            char.IsDebuffed = this.IsDebuffed;
        }
    }
    
    IsDebuffed(){
        
        console.log(this);
        
        return false
        
    }
}