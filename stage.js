import {GetStringOfCharsFromArray} from "./utils.js";
import {stageFxHandler} from "./stageFx.js";
import {GetCharsByAlignment,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";

export class evaluation
{
    constructor(stage){
        
        this.stage = stage;
        this.winTeam;
        this.winChar;
        this.location;
    }
}

export class stage
{
    constructor(stageHandler,id){
        
        this.stageHandler = stageHandler;
        this.stageFxHandler = new stageFxHandler(this);
        this.id = id;
        this.location;
        this.nextStage;
        
    }
    
    _MoveCurrentOutputToEvalDiv(){
        
        this.evalDiv = document.getElementById("output");
    }
    
    _HighlightChangedDivs(){
        
        const $outputDivs = document.querySelectorAll(".outputDiv");
        
        const $oldOutputDivs = this.evalDiv.querySelectorAll(".outputDiv");
        
        for(const output of $outputDivs){
            
            for(const oldOutput of $oldOutputDivs){
                
                if(output == oldOutput){
                    
                    output.style.backgroundColor = "yellow";
                }
            }
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
    
    _RemoveDebuffedCharsFromPool(eval){
        
        let $returnArr = [];
        
        for(const obj of eval.pool){
            
            if(obj.IsDebuffed()) continue
            else $returnArr.push(obj)
        }
        
        eval.pool = $returnArr;
    }
    
    _SetEvalPool(eval){
        
        eval.pool = this.location.GetCharsHere();
    }
    
    _DeclareLocation(){
        
        this.stageHandler.scenarioHandler.gameHandler.uiHandler.UpdateOutput("- <i>" + this.location.displayName.toUpperCase() + "</i> -<br><br>" );
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
    
    _TriggerStageFx(team){
        
        for(const fx of this.stageFxHandler.fxs){
            
            fx.IncrementTarget(team);
            //console.log(fx);
        }
    }
    
    _ResultDisplayText(eval){
        
        const $ui = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        //console.log(winners);
        
        if(eval.winners.length == 0){
            
            $ui.NewStageOutputDiv("No one was able to accomplish anything here this time!");
            
        }
        else{
            
            let $outputText = this.winText.replace("[names]",GetStringOfCharsFromArray(eval.winners,"any",true));

            let $color;
            
            if(eval.winners[0].alignment == "left") $color = "blue"
            if(eval.winners[0].alignment == "right") $color = "red";
            
            let $span = document.createElement("span");
            $span.style.color = $color;
            $span.style.fontWeight = "bold";
            $span.style.fontSize = "calc(15px + 1.5vw)";
            $span.innerHTML = eval.winners[0].alignment;
            
            $outputText = $outputText.replace("[alignment]",$span.outerHTML);
            
            //console.log("STAGE TEXT " + this.id);

            $ui.NewStageOutputDiv($outputText);

        }
        
        //return 
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

            stage.EvalFlow();
        }
    }
}