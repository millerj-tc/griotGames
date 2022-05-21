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
    
    _OneTeamWins(winners){
        
        
    }
    
    _HighestValueWin(pool,value){
        
        let $leftSiders = [];
        let $rightSiders = [];
        
        for(const obj of pool){
            
            if(obj.alignment == "left") $leftSiders.push(obj)
            if(obj.alignment == "right") $rightSiders.push(obj)
        }
        
        $leftSiders.sort(function(a, b){return b[value] - a[value]});
        $rightSiders.sort(function(a, b){return - b[value] - a[value]});
        
        //$leftSiders.reverse();
        //$rightSiders.reverse();
        
        console.log($leftSiders);
        console.log($rightSiders);
        
        // NEED TO ALTER THE MAGIC DATABASE SO THAT YOU DON'T HAVE TO PERFORM PER CARD OPERATIONS IN REAL TIME
        
//        let $highestVal = 0;
//        
//        let $winners = [];
//        
//        for(const obj of pool){
//            
//            if(obj.hasOwnProperty(value)){
//                
//                if(obj[value] > $highestVal) $winners = [obj]
//                else if(obj[value] == $highestVal) $winners.push(obj)
//            }
//        }
        
        this._ReturnDisplayText($winners)
    }
}

export class stageHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
        
        this.stages = [];
        this.lastCreatedStage = undefined;
        this.currentStage;
    }
    
    MoveToNextStage(){
        
        this.currentStage = this.currentStage.nextStage;
    }
    
    AddStage(id){
        
        const $stage = new stage(this,id);
        
        if(this.lastCreatedStage != undefined)this.lastCreatedStage.nextStage = $stage;
        
        this.stages.push($stage);
        
        this.lastCreatedStage = $stage;
        
        return $stage
    }
                
    GetStageEvalMessage(stage){
        
        
    }
}