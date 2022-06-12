export class evaluation
{
    constructor(stageFlowHandler){
        
        this.stageId = stageFlowHandler.stage.id; //must be id reference so that this can be stringified!!
        this.winners = [];
        this.losers = [];
        this.winTeam;
        this.winChar;
        this.location;
        this.pool = [];
        this.initialPool = [];
        this.prePhaseSkipModPool = undefined;
    }
    
    AddCharToPool(char) {this.pool.push(char.data)}
    
    GetEvalObjCharData(name, alignment = "any",allowFalseReturn = false){
        
        for(const charData of this.pool){
            
            if(alignment == "any" && charData.name == name) return charData
            else if(charData.name == name && charData.alignment == alignment) return charData
        }
        
        if(allowFalseReturn) return false
        else console.warn("GetEvalObjChar failed for " + name + " with alignment " + alignment);
    }
    
    GetCharsFromPool(alignment = "any"){
        
        if(alignment == "any") return this.pool
        else if (alignment == "left") return this.pool.filter(c => c.alignment == "left")
        else if (alignment == "right") return this.pool.filter(c => c.alignment == "right")
        else console.warn("evaluation.GetCharsFromPool() is malfunctioning");
    }
    
    GetCharsFromInitialPool(alignment = "any"){
        
        if(alignment == "any") return this.initialPool
        else if (alignment == "left") return this.initialPool.filter(c => c.alignment == "left")
        else if (alignment == "right") return this.initialPool.filter(c => c.alignment == "right")
        else console.warn("evaluation.GetCharsFromInitialPool() is malfunctioning");
    }
    
    SkipPhaseForChar(phaseFuncString,charName){
        
        const $evalCharData = this.GetEvalObjCharData(charName);
        
        if($evalCharData.skipPhases == undefined) $evalCharData.skipPhases = [];
        
        $evalCharData.skipPhases.push(phaseFuncString);
    }
    
    UnskipPhaseForChar(phaseFuncString,charName){
        
        const $evalCharData = this.GetEvalObjCharData(charName);
        
        
        $evalCharData.skipPhases = $evalCharData.skipPhases.filter(f => f != phaseFuncString);
    }
}