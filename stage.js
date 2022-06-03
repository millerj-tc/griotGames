import {GetStringOfCharsFromArray} from "./utils.js";
import {GetCharsByAlignment,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";
import {stageFxHandler} from "./stageFx.js";


export class evaluation
{
    constructor(stage){
        
        this.stage = stage;
        this.winners = [];
        this.losers = [];
        this.winTeam;
        this.winChar;
        this.location;
        this.pool = [];
        this.initialPool = [];
    }
    
    GetCharsFromPool(alignment = "any"){
        
        if(alignment == "any") return this.pool
        else if (alignment == "left") return this.pool.filter(c => c.alignment == "left")
        else if (alignment == "right") return this.pool.filter(c => c.alignment == "right")
        else console.warn("evaluation.GetCharsFromPool() is malfunctioning");
    }
    
    GetCharsFromInitialPool(alignment = "any"){
        
        if(alignment == "any") return this.initialPool
        else if (alignment == "left") return this.initialPool.filter(c => c.alignment == "left")
        else if (alignment == "right") return this.initialPool.filter(c => c.alignment == "right")
        else console.warn("evaluation.GetCharsFromInitialPool() is malfunctioning");
    }
}

export class stage
{
    constructor(stageHandler,id){
        
        this.stageHandler = stageHandler;
        this.stageFxHandler = new stageFxHandler(this);
        this.uiHandler = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        this.id = id;
        this.location;
        this.nextStage;
        this.evalArr = [];
        this.firstRun = true;
        this.stageHeader = "";
        this.stalemateText = "";
        this.displayWintextAfterGameover = false;
        
    }
    
    _StageHeaderOutput(){
        
        if(this.stageHeader != ""){
            
            this.uiHandler.NewStageOutputDiv(this.stageHeader);
        }
    }
    
    _StoreCurrentOutputToEvalArr(){
        
        this.evalArr = [];
        
        const $divArr = document.querySelectorAll(".outputDiv");
       
        
        for(const div of $divArr){
        
            this.evalArr.push(div.innerText);
        } 

    }
    
    _HighlightChangedDivs(){
        
        if(this.firstRun) return
        
        const $outputDivs = document.querySelectorAll(".outputDiv");
        
        let $matches;
        
        for(const output of $outputDivs){
            
            $matches = 0;
            
            for(const oldOutput of this.evalArr){
                
                if(output.innerText == oldOutput){
                    
                    $matches++;
                    
                }
            }

            if($matches > 0) output.style.backgroundColor = "";
            else output.style.backgroundColor = "yellow";
        }
    }
    
    _DisplayDebuffOutput(char){
        
        let $returnString = "";
        
        for(const fx of this.stageHandler.scenarioHandler.GetAllScenarioFxThatTargetStage(this,true)){
            
            let $replaceString = GetStringOfCharsFromArray([char],"any","S");
            
            $returnString = fx.targetStageOutputText.replace("[names]",$replaceString);
            
            $returnString = $returnString +  "<br><br>";
            
    
        }
        
        return $returnString
    }
    
    _RemoveDebuffedCharsFromPool(evalObj){
        
        let $returnArr = [];
        
        for(const obj of evalObj.pool){
            
            if(obj.IsDebuffed()) continue
            else $returnArr.push(obj)
        }
        
        evalObj.pool = $returnArr;
    }
    
    _SetEvalPool(evalObj){
        
        evalObj.pool = this.location.GetCharsHere();
        
        for(const char of evalObj.pool){
            
            char.stageImmune = false;
            
            char.stageDisabled = false;
        }
        
        evalObj.initialPool = evalObj.pool;
        
    }
    
    _RemoveCharsResultInMirror(chars,evalObj){
        
        // IN PROGRESS
        
        let $passedCharArr;
        
        if(chars.hasOwnProperty("dataType")) $passedCharArr = [chars]
        else $passedCharArr = chars
        
        //let $testArr = evalObj.pool.filter()
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
    
    _DeclareLocation(){
        
        console.log(this.location);
        
        if(this.location.displayName != "") this.stageHandler.scenarioHandler.gameHandler.uiHandler.UpdateOutput("- <i>" + this.location.displayName.toUpperCase() + "</i> -<br><br>" );
    }
    
     _CharLastTeammateAtLoc(char){
        
        const $teammatesWithMyAlignment = this.location.GetCharsHere("any",char.alignment).length;
        
        if($teammatesWithMyAlignment > 1) return false
        else if($teammatesWithMyAlignment == 1) return true
        else console.warn("Error: _CharLastTeammateAtLoc() is malfunctioning");
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
    
    _TriggerStageFx(evalObj){
        
        for(const fx of this.stageFxHandler.fxs){
            
            fx.TriggerFx(evalObj);

        }
    }
    
    _AutoSortWinnersAndLosers(evalObj,char,isWinner = true){
        
        if(evalObj.stalemate) return
        
        if(isWinner){
            evalObj.winners = this.location.GetCharsHere("any",char.alignment,true);
            evalObj.losers = this.location.GetCharsHere("any",char.GetEnemyAlignment(),true);
        }
        else{
            evalObj.winners = this.location.GetCharsHere("any",char.GetEnemyAlignment(),true);
            evalObj.losers = this.location.GetCharsHere("any",char.alignment,true);
        }
        
    }
    
    _ValidateWinnersAndLosers(evalObj){
        
        const $totalChars = this.location.GetCharsHere("any","any",true).length;
        
        // if(evalObj.winners.length + evalObj.losers.length != $totalChars) console.error("Invalid winners and losers arrays on eval obj!");
    }
    
    _CheckIfSkipResultDisplayText(){
        

        
        if(!this.displayWintextAfterGameover && this.stageHandler.scenarioHandler.gameOver) return true
        
        return false
    }
    
    
    _ResultDisplayText(evalObj){
        
        if(this._CheckIfSkipResultDisplayText()) return
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;

        
        if(evalObj.winners.length == 0){
            
            let $stalemateOutput;
            
            if(this.stalemateText == "") $stalemateOutput = "No one was able to accomplish anything here this time!"
            else $stalemateOutput = this.stalemateText;
            
            $ui.NewStageOutputDiv($stalemateOutput);
            
        }
        else{
            
            let $outputText = this.winText.replace("[winners names]",GetStringOfCharsFromArray(evalObj.winners,"any","S"));
            
            $outputText = $outputText.replace("[losers names]",GetStringOfCharsFromArray(evalObj.losers,"any","S"));
            
            $outputText = $outputText.replace("[specialOutputGroup0 names]",GetStringOfCharsFromArray(evalObj.specialOutputGroup0,"any","S"));
            
            $outputText = ReplaceWordsBasedOnPluralSubjects(evalObj.specialOutputGroup0,$outputText);

            let $color;
            
            if(evalObj.winners[0].alignment == "left") $color = "blue"
            if(evalObj.winners[0].alignment == "right") $color = "red";
            
            let $span = document.createElement("span");
            $span.style.color = $color;
            $span.style.fontWeight = "bold";
            $span.style.fontSize = "calc(15px + 1.5vw)";
            $span.innerHTML = evalObj.winners[0].alignment;
            
            $outputText = $outputText.replace("[alignment]",$span.outerHTML);
        

            $ui.NewStageOutputDiv($outputText);

        } 
    }
    
}