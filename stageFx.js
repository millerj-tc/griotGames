class stageFx
{
    constructor(stageFxHandler,scenarioFxTarget){
        
        this.stageFxHandler = stageFxHandler;
        this.scenarioFxTarget = scenarioFxTarget;
    
    }
    
    IncrementTarget(team){
        
        console.log("incrementing-->");
        
        console.log(this.scenarioFxTarget);
        
        this.scenarioFxTarget.Increment(team);
        
        this.scenarioFxTarget.SetWinLocation(this.stageFxHandler.stage.location);
    }
}

export class stageFxHandler
{
    constructor(stage){
        
        this.stage = stage;
        this.fxs = [];
        
    }
    
    AddFx(scenarioFxTarget){
        
        const $fx = new stageFx(this,scenarioFxTarget);
        
        this.fxs.push($fx);
    }
    
}