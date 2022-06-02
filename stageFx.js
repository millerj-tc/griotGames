class stageFx
{
    constructor(stageFxHandler,scenarioFxTarget,incAmt=1){
        
        this.stageFxHandler = stageFxHandler;
        this.scenarioFxTarget = scenarioFxTarget;
        this.incrementAmount = incAmt;
        this.fxTeam;
        this.requiredConds = [];
    
    }
    
    TriggerFx(evalObj){
        
        if(typeof this.incrementAmount == "number") this.IncrementTarget()
        else if(this.incrementAmount == "complete") this._CompleteTarget()
    }
    
    IncrementTarget(){
        
        this.scenarioFxTarget.SetWinLocation(this.stageFxHandler.stage.location);
        
        this.scenarioFxTarget.SetIncrementingStage(this.stageFxHandler.stage);
        
        for(let i=0; i < this.incrementAmount; i++){
            
            this.scenarioFxTarget.Increment(this.fxTeam);
        }
        
    }
    
    _CompleteTarget(){
        
        console.log("completing");
        
        if(!this._CheckRequiredConds()) return
        
        this.scenarioFxTarget.CompleteEffect();
    }
    
    _CheckRequiredConds(){
        
        let $trueConds = 0;
        
        for(const cond of this.requiredConds){
            
            if(cond()) $trueConds++
        }
        
        if($trueConds == this.requiredConds.length) return true
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
        
        return $fx
    }
    
}