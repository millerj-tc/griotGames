import {evaluation} from "./evaluation.js";

class evalState
{
    constructor(stagePhase,evalObj,stepId){
        
        this.stagePhase = stagePhase;
        this.stepId = stepId;
        
        this.evalState = {};
        
        for(const prop in evalObj){
            
            if(typeof prop == "function") continue
            
            try {this.evalState[prop.key] = prop.value}
            catch(err) {
                if(err.message.includes("circular structure")){continue}
                else{
                    console.warn("non-circular error while copying evalObj into evalState at " + this.stagePhase.id);
                    console.warn(err.message);
                }
            }
        }
    }
}

class stagePhase
{
    constructor(stageFlowHandler,func,id = null){
        
        this.stageFlowHandler = stageFlowHandler;
        this.stage = this.stageFlowHandler.stage;
        this._Run = func;
        this.previousPhase;
        this.nextPhase;
        this.evalStates = [];
        this.lastCreatedEvalState;
        this.currentEvalState;
        
        if(this.id != null) this.id = id
        else this.id = String(this.stageFlowHandler.stage.id + "Step" + this.stageFlowHandler.phases.length);
    }
    
    StartRun(evalObj){
        
        if(evalObj == undefined) console.warn(this.stageFlowHandler.stage.id + " " + this.previousPhase.id + " failed to pass me a legit evalObj " + "(I'm " + this.stageFlowHandler.stage.id + " " + this.id + ")")
        if(this._Run == undefined) console.warn("I don't have _Run() defined!!  " + "(I'm " + this.stageFlowHandler.stage.id + " " + this.id + ")")
        
        const $scenario = this.stageFlowHandler.stage.stageHandler.scenario;
        
        if($scenario.scenarioOver) $scenario.scenarioHandler.GotoScenario($scenario.nextScenario)
        
        this.RecordEvalState(evalObj,"preRun")
        
        this._Run(evalObj);
        this._EndRun(evalObj);
    }
    _EndRun(evalObj){
        
        const $stage = this.stageFlowHandler.stage;
        
        this.RecordEvalState(evalObj,"postRun")
        
        if(this.nextPhase != undefined) this.nextPhase.StartRun(evalObj);
        
        else $stage.stageHandler.GotoNextStage($stage.nextStage);
    }
    RecordEvalState(evalObj,stepId){
        
        const $evalState = new evalState(this,evalObj,stepId);
        
        if(this.lastCreatedEvalState != undefined) {
            $evalState.previousEvalState = this.lastCreatedEvalState;
            this.lastCreatedEvalState.nextEvalState = $evalState;
        }
        
        this.evalStates.push($evalState);
        
        if(this.evalStates.length == 1) this.currentEvalState = $evalState
        
        this.lastCreatedEvalState = $evalState;
        
        return $evalState
    }
    GetEvalState(stepId){
        
        for(const state of this.evalStates){
            
            if(state.stepId == stepId) return state
        }
        
        console.warn("GetEvalState failed for " + stepId + " " + this._Run + " " + this.stageFlowHandler.stage.id);
    }
    
    _CharHasAcrossTeamsDupeMatch(char,evalObj){
        
        for(const obj of evalObj.pool){
            
            if(obj.dataType == "char" && obj.name == char.name && obj.alignment != char.alignment) return true
        }
        
        return false
    }
    
     _CharLastTeammateAtLoc(char){
        
        const $teammatesWithMyAlignment = this.stage.location.GetCharsHere("any",char.alignment).length;
        
        if($teammatesWithMyAlignment > 1) return false
        else if($teammatesWithMyAlignment == 1) return true
        else console.warn("Error: _CharLastTeammateAtLoc() is malfunctioning: " + char.name + " asked how many friends were present and was told " + $teammatesWithMyAlignment);
    }
    
     _ReturnArrWithTeamDupedCharsRemoved(arr){
        
        let $returnArr = [];
        
        for(const char of arr){
         
            let $matches = 0;
            
            for(const otherChar of arr){

                if(char.name == otherChar.name && char.alignment != otherChar.alignment) $matches++
            }
            
            if($matches > 0) continue
            else{
                
                $returnArr.push(char);
            }
        
        }
        
        return $returnArr
    }
    
    _CheckIfSkipResultDisplayText(){
    
        if(!this.stage.displayWintextAfterGameover && this.stage.stageHandler.scenario.scenarioOver) return true
        
        return false
    }
    
    
}

export class stageFlowHandler
{
    constructor(stage){
        
        this.stage = stage;
        this.phases = [];
        this.lastCreatedPhase;
        this.currentPhase;
    }
    
    AddPhase(func,id){
        
        const $phase = new stagePhase(this,func,id);
        
        if(this.lastCreatedPhase != undefined) {
            $phase.previousPhase = this.lastCreatedPhase;
            this.lastCreatedPhase.nextPhase = $phase;
        }
        
        this.phases.push($phase);
        
        if(this.phases.length == 1) this.currentPhase = $phase
        
        this.lastCreatedPhase = $phase;
        
        return $phase
    }
    
    RunPhases(tournamentMode = false){
        
        this.stage.tournamentMode = tournamentMode;
        
        this.stage.firstRun = false;
        
        const $evalObj = new evaluation(this);
        
        this.currentPhase.StartRun($evalObj);
    }
}