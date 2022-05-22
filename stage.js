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
        
        let $winners = [];
        
        for(const obj of pool){
            
            if(obj.alignment == "left") $leftSiders.push(obj)
            if(obj.alignment == "right") $rightSiders.push(obj)
        }
        
        $leftSiders.sort(function(a, b){return b[value] - a[value]});
        $rightSiders.sort(function(a, b){return - b[value] - a[value]});
        
        for(let i = 0; i < 50; i++){
            
            if($winners.length > 0 || (i > $leftSiders.length - 1 && i > $rightSiders.length - 1)) break
            
            if($leftSiders[i][value] > $rightSiders[i][value]){
                
                $winners.push($leftSiders[i]);
                
                for(const obj of $leftSiders){
                    
                    if(obj[value] == $leftSiders[i][value] && obj != $leftSiders[i]) $winners.push(obj)
                }
            }
            
            if($rightSiders[i][value] > $leftSiders[i][value]){
                
                $winners.push($rightSiders[i]);
                
                for(const obj of $rightSiders){
                    
                    if(obj[value] == $rightSiders[i][value] && obj != $rightSiders[i]) $winners.push(obj)
                }
            }
        }
        
        //console.log($winners);  
        
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