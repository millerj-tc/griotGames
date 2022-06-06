class scenarioGamestate
{
    constructor(){
    
        this.postLastRunValues = [];
    }
}

class cloneCrisisPlusScenarioGamestate exports scenarioGamestate
{
    constructor(){
        
        super();
    }
    
    UnlockCharacter(char,alignment){
        
        this.postLastRunValues.push({
         
            name: char.name,
            alignment: char.alignment;
        });
    }
    
    ResetScenarioToPostLastRunValues(){
        
        
    }
}