class stageFx
{
    constructor(stageFxHandler,scenarioFxTarget,incAmt=1){
        
        this.stageFxHandler = stageFxHandler;
        this.scenarioFxTarget = scenarioFxTarget;
        this.incrementAmount = incAmt;
    
    }
    
    IncrementTarget(team){
        
        //console.log("incrementing-->");
        
        //console.log(this.scenarioFxTarget);
        
        this.scenarioFxTarget.SetWinLocation(this.stageFxHandler.stage.location);
        
        this.scenarioFxTarget.SetIncrementingStage(this.stageFxHandler.stage);
        
        for(let i=0; i < this.incrementAmount; i++){
            
            this.scenarioFxTarget.Increment(team);
        }
        
    }
}

export class stageFxHandler
{
    constructor(stage){
        
        this.stage = stage;
        this.fxs = [];
        
    }
    
    AddFx(scenarioFxTarget,incAmt){
        
        const $fx = new stageFx(this,scenarioFxTarget,incAmt);
        
        this.fxs.push($fx);
    }
    
}