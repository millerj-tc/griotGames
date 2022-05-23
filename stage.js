// when someone is debuffed, add a line about why they are not there that gives clue to how they were debuffed

// change "winner" property of stage to see who won

// eval steps: evaluate hope, evaluate debuffs, evaluate

// make a "side switch"/betrayal call out between stages as well as a chars "refuse to participate" message

// make victory message display after all others

// interpersonal dynamics

// clue text for when someone is the worst at a stage, etc.

// chars buffed on certain locations like Chandra on Valakut and Teferi on Vesuva

// 2v1 buff (opp must have two characters that overpower char in order to win that stage)

// NPC pictures in output?

// characters clue dialog in certain locations

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
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        $ui.UpdateOutput("--- <i>" + this.location.displayName.toUpperCase() + "</i> ---<br><br>" );
        
        let $outputText = this.winText.replace("[names]",GetStringOfCharsFromArray(winners,"any",true));
        
        $outputText = $outputText.replace("[alignment]",winners[0].alignment);
       
        $ui.UpdateOutput($outputText);
                    
        if(this.nextStage != undefined){ 
            $ui.UpdateOutput("<br><br>");   
            this.nextStage.Eval();
        }
        
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
    
    _WarnIfDupeCharsOnSameTeam(){
        
        let $allChars = [];
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        for(const loc of this.stageHandler.scenarioHandler.locationHandler.locations){
            
            for(const slot of loc.charSlots){
                
                $allChars.push(slot.character);
            }
        }
        
        for(const char0 of $allChars){
            
            for(const char1 of $allChars){
                
                if(char0.name == char1.name & char0.alignment == char1.alignment && char0 != char1) {
                    
                    $ui.UpdateOutput("<i><b>" + char0.name + " cannot occupy two spaces on the same team! This simulation is invalid!!!" + "</i></b>");
                }
            }
            
        }
    }
    
    _RemoveDuplicateChars(pool){
        
        let $returnArr = [];
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        const $scenHand = this.stageHandler.scenarioHandler;
        
        let $dupesFound = [];
        
        for(const char0 of pool){
            
            let $dupeMatches = 0;
            
            for(const char1 of pool){
                
                if(char0.name == char1.name && char0 != char1){
                    
                    $dupeMatches++;
                    
                    //if(char0.alignment == char1.alignment) 
                    //else {
                        
                        
                        let $dupePrinted = false;
                        
                        for(const dupe of $dupesFound){
                            
                            if(dupe.name == char0.name) $dupePrinted = true;
                        }
                        
                        $dupesFound.push(char0);
                        
                        let $char0Hope = $scenHand.GetTeamHope(char0.alignment);
                        let $char1Hope = $scenHand.GetTeamHope(char1.alignment);
                        
                        if($char0Hope > $char1Hope && !$dupePrinted){
                            
                            $ui.UpdateOutput(char0.name + " has decided to side with team " + char0.alignment + "<br><br>");
                            $returnArr.push(char0);
                        }
                         else if($char0Hope < $char1Hope && !$dupePrinted){
                            
                            $ui.UpdateOutput(char1.name + " has decided to side with team " + char1.alignment + "<br><br>");
                            $returnArr.push(char1);
                         }
                        else if(!$dupePrinted) $ui.UpdateOutput(char0.name + " cannot decide between teams. They are sitting this one out.<br><br>");
                        }
                    //}
                }
            
                
            if($dupeMatches == 0) $returnArr.push(char0);
        }
        
        console.log($returnArr);
            
        return $returnArr
    }
    
    _HighestValueWin(){
        
        let $leftSiders = [];
        let $rightSiders = [];
        
        let $winners = [];
        
        //console.log(this);
        
        let $pool = this.location.GetCharsHere();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        $pool = this._RemoveDuplicateChars($pool);
        
        //console.log($pool);
        
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
            
            //console.log("iteration " + i);
            //console.log($winners);
            //console.log($leftSiders);
            //console.log($rightSiders);
            
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