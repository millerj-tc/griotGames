// when someone is debuffed, add a line about why they are not there that gives clue to how they were debuffed

// eval steps: evaluate hope, evaluate debuffs, evaluate

// make a "side switch"/betrayal call out between stages as well as a chars "refuse to participate" message

// make victory message display after all others

import {GetStringOfCharsFromArray} from "./utils.js";

class stage
{
    constructor(stageHandler,id){
        
        this.stageHandler = stageHandler;
        this.id;
        this.nextStage;
        this.GetDisplayText = this._HighestValueWin;
        this.winText = "";
        this.debuffText = "";
        
    }
    
    _ReturnDisplayText(winners){
        
        
        
        return
    }
    
    _OneTeamWins
    
    _HighestValueWin(pool,value){
        
        let $highestVal = 0;
        
        let $winners = [];
        
        for(const obj of pool){
            
            if(obj.hasOwnProperty(value)){
                
                if(obj[value] > $highestVal) $winners = [obj]
                else if(obj[value] == $highestVal) $winners.push(obj)
            }
        }
        
        this._ReturnDisplayText($winners)
    }
}

export class stageHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
        
        this.stages = [];
        this.lastCreatedStage;
        this.currentStage;
    }
    
    MoveToNextStage(){
        
        this.currentStage = this.currentStage.nextStage;
    }
    
    AddStage(id){
        
        const $stage = new stage(this,id);
        
        this.lastCreatedStage.nextStage = $stage;
        
        this.stages.push($stage);
        
        this.lastCreatedStage = $stage;
    }
                
    GetStageEvalMessage(stage){
        
        
    }
}