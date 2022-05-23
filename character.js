export class charHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
    }
    
    AddFunctionsToCharacters(){
        
        for(const char of this.scenarioHandler.gameHandler.database.data){
            
            char.debuffed = false;
            char.IsDebuffed = this.IsDebuffed;
            char.Debuff = this.Debuff;
            char.Rebuff = this.Rebuff;
        }
    }
    
    Debuff(){
        
        this.debuffed = true;
    }
    
    Rebuff(){
        
        this.debuffed = false;
    }
    
    IsDebuffed(){
        
        return this.debuffed
        
    }
}