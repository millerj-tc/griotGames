class interpersHopeFx
{
    constructor(char,location="team"){
        
        this.ownerCharacter = char;
        this.targetCharsStrings; //ARRAY!
        this.effectText;
        this.hopeModifier;
    }
}

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
            char.IncrementHope = this.IncrementHope;
            char.AddInterpers = this.AddInterpers;
            char.hope = 0;
        }
    }
    
    AddInterpers(type,location){
                    
        let $fx;
        
        if(type == "hope") $fx = new interpersHopeFx(this,location);

        this.interpersFxs.push($fx);
        
        return $fx
        
    }
    
    IncrementHope(){
        
        this.hope++
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