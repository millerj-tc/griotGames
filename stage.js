// when someone is debuffed, add a line about why they are not there that gives clue to how they were debuffed

// eval steps: evaluate hope, evaluate debuffs, evaluate

// make a "side switch"/betrayal call out between stages as well as a chars "refuse to participate" message

// make victory message display after all others

// interpersonal dynamics

// clue text for when someone is the worst at a stage, etc.

// chars buffed on certain locations like Chandra on Valakut and Teferi on Vesuva

// 2v1 buff (opp must have two characters that overpower char in order to win that stage)

// incorp character thumbnails into outputs

// NPC pictures in output?

import {GetStringOfCharsFromArray} from "./utils.js";

class stage
{
    constructor(stageHandler,id){
        
        this.stageHandler = stageHandler;
        this.id;
        this.location;
        this.nextStage;
        this.Eval = this._HighestValueWin;
        this.evalValue = "";
        this.displayText = "";
        this.winText = "";
        this.debuffText = "";
        this.leftDebuffCount = 0;
        this.rightDebuffCount = 0;
        
    }
    
    //ReturnDisplayText is private because the public method is GetDisplayText as defined in constructor :)
    
    _ReturnDisplayText(winners){
        
        console.log(this.winText.replace("[names]",GetStringOfCharsFromArray(winners)));
                    
        if(this.nextStage != undefined) this.nextStage.Eval();
        
        //return 
    }
    
    _GetPool(){
        
        // remember some stages have no location
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
    
    _HighestValueWin(value){
        
        let $leftSiders = [];
        let $rightSiders = [];
        
        let $winners = [];
        
        //console.log(this);
        
        let $pool = this.location.GetCharsHere();
        
        console.log($pool);
        
        // -- EVALUATE HOPE, DEBUFF IF NO ONE WINS AND HAVE MATHCING
        
        for(const obj of $pool){
            
            if(obj.IsDebuffed()) continue
            if(obj.alignment == "left") $leftSiders.push(obj)
            if(obj.alignment == "right") $rightSiders.push(obj)
        }
        
        const $evalValue = this.evalValue;
        
        $leftSiders.sort(function(a, b){return b[$evalValue] - a[$evalValue]});
        $rightSiders.sort(function(a, b){return - b[$evalValue] - a[$evalValue]});
        
        //--Remove 1 char from evaluation per debuff
        
        let $debuffedNames = [];
        
        for(let i = 0; i < this.leftDebuffCount; i++) $debuffedNames.push($leftSiders.shift())
        
        for(let i = 0; i < this.rightDebuffCount; i++) $debuffedNames.push($rightSiders.shift())
        
        //--Function to add debuff flavor to output should go right here
        
        //console.log($leftSiders);
        //console.log($rightSiders);
        
        
        for(let i = 0; i < 50; i++){
            
            console.log("iteration " + i);
            console.log($winners);
            console.log($leftSiders);
            console.log($rightSiders);
            
            if($winners.length > 0 || (i > $leftSiders.length - 1 && i > $rightSiders.length - 1)) break
            
            if($leftSiders[i][this.evalValue] > $rightSiders[i][this.evalValue] || $rightSiders[i] == undefined){
                
                $winners.push($leftSiders[i]);
                
                for(const obj of $leftSiders){
                    
                    if(obj[this.evalValue] == $leftSiders[i][this.evalValue] && obj != $leftSiders[i]) $winners.push(obj)
                }
            }
            
            if($rightSiders[i][this.evalValue] > $leftSiders[i][this.evalValue] || $leftSiders[i] == undefined){
                
                $winners.push($rightSiders[i]);
                
                for(const obj of $rightSiders){
                    
                    if(obj[this.evalValue] == $rightSiders[i][this.evalValue] && obj != $rightSiders[i]) $winners.push(obj)
                }
            }
        }
        
        //console.log($winners);  
        
        return this._ReturnDisplayText($winners)
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