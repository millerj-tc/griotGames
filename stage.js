import {GetStringOfCharsFromArray} from "./utils.js";
import {stageFxHandler} from "./stageFx.js";
import {GetCharsByAlignment,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";

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
        this.worstCharacterText = "[names] sucks at this";
        this.debug = false;
        
    }
    
    _DisplayWorstCharText(worstChars){
        
        //console.log(worstChar);
        
        let $string;
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        //console.log(this.stageHandler.scenarioHandler.gameOver);
        
        if(this.stageHandler.scenarioHandler.gameOver == false && worstChars.length > 0){
            
            $string = "<br><br>" + this.worstCharacterText.replace("[names]",GetStringOfCharsFromArray(worstChars,"any",true));
            $string = ReplaceWordsBasedOnPluralSubjects(worstChars,$string);
            $ui.UpdateOutput($string);
        }
    }
    
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
            
            //console.log("STAGE TEXT " + this.id);

            $ui.UpdateOutput($outputText);

            this._TriggerStageFx(winners[0].alignment);
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
                    
                    $ui.ClearOutput();
                    
                    $ui.UpdateOutput("<i><b>I am very sorry to inform you that " + char0.name + " cannot occupy two spaces on the same team... This simulation is invalid, please try again</i></b>");
                    
                    this.stageHandler.scenarioHandler.gameOver = true;
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
                        
                        //let $char0Hope = $scenHand.GetTeamHope(char0.alignment);
                        //let $char1Hope = $scenHand.GetTeamHope(char1.alignment);
                    
                    
                        
                        if((char0.hope > char1.hope) && !$dupePrinted){
                            
//                            console.warn(this.id);
//                            console.log("char0hope>>>");
//                            console.log(char0.hope);
//                            console.log("char1hope>>>");
//                            console.log(char1.hope);
                            
                            if(char0.lastWonHope != true){
                                $ui.UpdateOutput(GetStringOfCharsFromArray([char0],"any",true) + " has decided to side with team " + char0.alignment + ".<br><br>");
                                char0.lastWonHope = true;
                            }
                            
                            if(char0.location == this.location) $returnArr.push(char0);
                        }
                         else if((char0.hope < char1.hope) && !$dupePrinted){
                             
//                            console.warn(this.id);
//                            console.log("char0hope>>>");
//                            console.log(char0.hope);
//                            console.log("char1hope>>>");
//                            console.log(char1.hope);
                            
                            if(char1.lastWonHope != true){
                                
                                $ui.UpdateOutput(GetStringOfCharsFromArray([char1],"any",true)+ " has decided to side with team " + char1.alignment + ".<br><br>");
                                char1.lastWonHope = true;
                            }
                            
                             
                             if(char1.location == this.location) $returnArr.push(char1);
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
            //console.log(fx);
        }
    }
    
    _DisplayDebuffOutput(char){
        
        let $returnString = "";
        
        for(const fx of this.stageHandler.scenarioHandler.GetAllScenarioFxThatTargetStage(this,true)){
            
            let $replaceString = GetStringOfCharsFromArray([char],"any",true);
            
            //console.log($replaceString);
            
            $returnString = fx.targetStageOutputText.replace("[names]",$replaceString);
            
            $returnString = $returnString +  "<br><br>";
            
            //console.log($returnString);
    
        }
        
        return $returnString
    }
    
    _RemoveDebuffedChars(pool){
        
        let $returnArr = [];
        
        for(const obj of pool){
            
            if(obj.IsDebuffed()) continue
            else $returnArr.push(obj)
        }
        
        return $returnArr
    }
    
    _HighestValueWin(){
        
        if(this.debug) console.warn("===");
        
        this._DeclareLocation();
        
        let $leftSiders = [];
        let $rightSiders = [];
        
        let $winners = [];
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;        
        
        let $pool = this.location.GetCharsHere();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        if(this.stageHandler.scenarioHandler.gameOver) return
        
        $pool = this._RemoveDuplicateChars($pool);
        
        if(this.debug) console.log($pool);
        
        // -- EVALUATE HOPE, DEBUFF IF NO ONE WINS AND HAVE MATHCING
        
        $pool = this._RemoveDebuffedChars($pool);
        
        const $evalValue = this.evalValue;
        
        $leftSiders = GetCharsByAlignment($pool,"left");
        
        $rightSiders = GetCharsByAlignment($pool,"right"); 
        
        $leftSiders.sort(function(a, b){return b[$evalValue] - a[$evalValue]});
        $rightSiders.sort(function(a, b){return b[$evalValue] - a[$evalValue]});
        
        if(this.debug) console.log($leftSiders);
        if(this.debug) console.log($rightSiders);
        
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
        
        if(this.debug) console.log($leftSiders);
        if(this.debug) console.log($rightSiders);
        
        let $worstCharPool = $leftSiders.concat($rightSiders);
        
        //$worstCharPool.sort(function(a, b){return b[$evalValue] - a[$evalValue]});
        
        let $worstChars = this.stageHandler.scenarioHandler.gameHandler.database.GetCharsMoreThanOneStdBelowMeanForValue($evalValue,$worstCharPool);
        
        //console.log($worstChars);
        
        //$worstChars = $worstChars.filter(char => char.location == this.location);
        
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
                
                break
            }
            
            if($rightSiders[i][this.evalValue] > $leftSiders[i][this.evalValue] || $leftSiders[i] == undefined){
                
                $winners.push($rightSiders[i]);
                
                for(const obj of $rightSiders){
                    
                    if(obj[this.evalValue] == $rightSiders[i][this.evalValue] && obj != $rightSiders[i]) $winners.push(obj)
                }
                
                break
            }
        }
        
        if(this.debug) console.log($winners);
        
        for(const char0 of $winners){
            
           $worstChars = $worstChars.filter(char1 => char1.name != char0.name);
        }
        
        this._ReturnDisplayText($winners);
        
        this._DisplayWorstCharText($worstChars);
        
        this.stageHandler.GotoNextStage(this.nextStage);
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
    
//    MoveToNextStage(){
//        
//        this.currentStage = this.currentStage.nextStage;
//    }
    
    AddStage(id){
        
        const $stage = new stage(this,id);
        
        if(this.lastCreatedStage != undefined) this.lastCreatedStage.nextStage = $stage;
        
        this.stages.push($stage);
        
        this.lastCreatedStage = $stage;
        
        //console.log($stage);
        
        return $stage
    }
    
    GotoNextStage(stage){
        
        const $ui = this.scenarioHandler.gameHandler.uiHandler;
        
        this.currentStage = stage;
        
        if(stage != undefined && !this.scenarioHandler.gameOver){ 
            
            $ui.UpdateOutput("<br><br>");

            stage.Eval();
        }
    }
                
    GetStageEvalMessage(stage){
        
        
    }
}