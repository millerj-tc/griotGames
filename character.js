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
    constructor(scenario){
        
        this.scenario = scenario;
    }
    
    AddFunctionsToCharacters(arr){
        
        for(const char of arr){
            
            char.debuffed = false;
            char.IsDebuffed = this.IsDebuffed;
            char.Debuff = this.Debuff;
            char.Rebuff = this.Rebuff;
            char.ModHope = this.ModHope;
            char.AddInterpers = this.AddInterpers;
            char.GetEnemyAlignment = this.GetEnemyAlignment;
            char.hope = 0;
            char.lastWonHope = null;
            char.removedDuringRun = false;
        }
    }
    
    AddInterpers(type,location){
                    
        let $fx;
        
        if(type == "hope") $fx = new interpersHopeFx(this,location);

        this.interpersFxs.push($fx);
        
        return $fx
        
    }
    
    GetEnemyAlignment(){
        
        if(this.alignment == "left") return "right";
        else if(this.alignment == "right") return "left";
        else {
            console.warn(this)
            console.warn(".GetEnemyAlignment() is malfunctioning");
        }
    }
    
    ModHope(amt){
        
        this.hope += amt;
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