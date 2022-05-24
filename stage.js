//// 100% Necessary

// hope stage fx // change hope to individual

// interpersonal dynamics

//inherent value of stats could do with Hope? interperonsal dynamics could also affect individual hope scores

// final stage win con

// better name for the Games

// add FAQ

// clue text for when someone is the worst at a stage, etc.

//// Very Nice

// include winning team name in victory message and change color of victory message to match winning team

// create a color for each location row so you can more easily see how the characters are assigned

// add color bar left/right to inline character portraits to show team

// chars buffed on certain locations like Chandra on Valakut and Teferi on Vesuva

// 2v1 buff (opp must have two characters that overpower char in order to win that stage)

// characters clue dialog in certain locations

//campfire scene before the adventure where the characters talk to each other and you?

//// Luxury/Future

// Each output line is a div so you can float the image, etc.

// NPC pictures in output?


import {GetStringOfCharsFromArray} from "./utils.js";
import {stageFxHandler} from "./stageFx.js";

class stage
{
    constructor(stageHandler,id){
        
        this.stageHandler = stageHandler;
        this.stageFxHandler = new stageFxHandler(this);
        this.id = id;
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
        
        //console.log(winners);
        
        if(winners.length == 0){
            
            $ui.UpdateOutput("No one was able to accomplish anything here this time!");
            
        }
        else{
            
            let $outputText = this.winText.replace("[names]",GetStringOfCharsFromArray(winners,"any",true));

            let $color;
            
            if(winners[0].alignment == "left") $color = "blue"
            if(winners[0].alignment == "right") $color = "red";
            
            let $span = document.createElement("span");
            $span.style.color = $color;
            $span.style.fontWeight = "bold";
            $span.style.fontSize = "24pt";
            $span.innerHTML = winners[0].alignment;
            
            $outputText = $outputText.replace("[alignment]",$span.outerHTML);

            $ui.UpdateOutput($outputText);

            this._TriggerStageFx(winners[0].alignment);
        }
        if(this.nextStage != undefined && !this.stageHandler.scenarioHandler.gameOver){ 
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
        
        let $allChars = this.stageHandler.scenarioHandler.locationHandler.GetAllCharsAtLocations();
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        for(const char0 of $allChars){
            
            for(const char1 of $allChars){
                
                if(char0.name == char1.name && char0.alignment == char1.alignment && char0 != char1) {
                    
                    $ui.UpdateOutput("<i><b>" + char0.name + " cannot occupy two spaces on the same team! This simulation is invalid!!!" + "</i></b>");
                }
            }
            
        }
    }
    
    _RemoveDuplicateChars(){
        
        let $allChars = this.stageHandler.scenarioHandler.locationHandler.GetAllCharsAtLocations(); 
        
        let $returnArr = [];
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        const $scenHand = this.stageHandler.scenarioHandler;
        
        let $dupesFound = [];
        
        for(const char0 of $allChars){
            
            let $dupeMatches = 0;
            
            for(const char1 of $allChars){
                
                if(char0.name == char1.name && char0 != char1){
                    
                    $dupeMatches++;
                    
                    //-- skip the rest if this is not relevant to the current location
                   
                    if(char0.location != this.location && char1.location != this.location) continue
                    
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
                            
                            $ui.UpdateOutput(GetStringOfCharsFromArray([char0],"any",true) + " has decided to side with team " + char0.alignment + "<br><br>");
                            $returnArr.push(char0);
                        }
                         else if($char0Hope < $char1Hope && !$dupePrinted){
                            
                            $ui.UpdateOutput(GetStringOfCharsFromArray([char1],"any",true)+ " has decided to side with team " + char1.alignment + "<br><br>");
                            $returnArr.push(char1);
                         }
                    
                        else if(!$dupePrinted) $ui.UpdateOutput(GetStringOfCharsFromArray([char0],"any",true) + " cannot decide between teams. They are sitting this one out.<br><br>");
                        }
                    //}
                }
            
                
            if($dupeMatches == 0 && char0.location == this.location) $returnArr.push(char0);
        }
        
        //console.log($returnArr);
            
        return $returnArr
    }
    
    _DeclareLocation(){
        
        this.stageHandler.scenarioHandler.gameHandler.uiHandler.UpdateOutput("- <i>" + this.location.displayName.toUpperCase() + "</i> -<br><br>" );
    }
    
    _TriggerStageFx(team){
        
        for(const fx of this.stageFxHandler.fxs){
            
            fx.IncrementTarget(team);
        }
    }
    
    _DisplayDebuffOutput(char){
        
        let $returnString = "";
        
        for(const fx of this.stageHandler.scenarioHandler.GetAllScenarioFxThatTargetStage(this,true)){
            
            let $replaceString = GetStringOfCharsFromArray([char],"any",true);
            
            console.log($replaceString);
            
            $returnString = fx.targetStageOutputText.replace("[names]",$replaceString);
            
            $returnString = $returnString +  "<br><br>";
            
            console.log($returnString);
    
        }
        
        return $returnString
    }
    
    _HighestValueWin(){
        
        this._DeclareLocation();
        
        let $leftSiders = [];
        let $rightSiders = [];
        
        let $winners = [];
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;        
        
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
        
        if($leftSiders.length != 0){
            
             for(let i = 0; i < this.leftDebuffCount; i++) {
                 
                 this.leftDebuffCount--;
                 
                 $ui.UpdateOutput(this._DisplayDebuffOutput($leftSiders.shift()))
             }
        }
        
       if($rightSiders.length != 0){
           
            for(let i = 0; i < this.rightDebuffCount; i++){
           
                this.rightDebuffCount--;
                $ui.UpdateOutput(this._DisplayDebuffOutput($rightSiders.shift()))
            }

       }
        
        
        //--Function to add debuff flavor to output should go right here
        
        
        
        
        for(let i = 0; i < 50; i++){
            
            if($leftSiders.length == 0 && $rightSiders.length == 0) break
            if($leftSiders.length == 0) {$winners.push($rightSiders[0]);break}
            if($rightSiders.length == 0) {$winners.push($leftSiders[0]);break}
            
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
        
        //this._TriggerStageFx($winners[0].alignment);  
        
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