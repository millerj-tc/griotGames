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
        this.location;
        this.nextStage;
        this.GetDisplayText = this._HighestValueWin;
        this.displayText = "";
        this.winText = "";
        this.debuffText = "";
        this.leftDebuffCount = 0;
        this.rightDebuffCount = 0;
        
    }
    
    //ReturnDisplayText is private because the public method is GetDisplayText as defined in constructor :)
    
    _ReturnDisplayText(winners){
        
        return this.winText.replace("[names]",GetStringOfCharsFromArray(winners));
    }
    
    _OneTeamWins(winners){
        
        
    }
    
    _GetNondebuffedChars(pool){
        
        // THIS IS ALL WRONG
        
//        let $returnArr = [];
//        
//        for(const obj of pool){
//            
//            let $debuffCount = 0;
//            
//            for(const debuff of obj.debuffs){
//                
//                if(debuff.stageId == this.id) $debuffCount++
//            }
//            
//            if($debuffCount == 0) $returnArr.push(obj);
//        }
//        
//        return $returnArr
    }
    
    // ALL CAPS NOTE this should all be fetched internally by getting list of chars from associated location, etc.
    
    _HighestValueWin(pool,value){
        
        let $leftSiders = [];
        let $rightSiders = [];
        
        let $winners = [];
        
        let $pool = pool;
        
        for(const obj of $pool){
            
            if(obj.IsDebuffed()) continue
            if(obj.alignment == "left") $leftSiders.push(obj)
            if(obj.alignment == "right") $rightSiders.push(obj)
        }
        
        $leftSiders.sort(function(a, b){return b[value] - a[value]});
        $rightSiders.sort(function(a, b){return - b[value] - a[value]});
        
        //remove 1 char from evaluation per debuff
        
        for(let i = 0; i < this.leftDebuffCount; i++) $leftSiders.shift()
        
        for(let i = 0; i < this.rightDebuffCount; i++) $rightSiders.shift()
        
        
        for(let i = 0; i < 50; i++){
            
            if($winners.length > 0 || (i > $leftSiders.length - 1 && i > $rightSiders.length - 1)) break
            
            if($leftSiders[i][value] > $rightSiders[i][value] || $rightSiders[i] == undefined){
                
                $winners.push($leftSiders[i]);
                
                for(const obj of $leftSiders){
                    
                    if(obj[value] == $leftSiders[i][value] && obj != $leftSiders[i]) $winners.push(obj)
                }
            }
            
            if($rightSiders[i][value] > $leftSiders[i][value] || $leftSiders[i] == undefined){
                
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