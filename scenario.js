import {locationHandler} from "./location.js";
import {stageHandler} from "./stage.js";
import {charHandler} from "./character.js";
import {GetStringOfCharsFromArray} from "./utils.js";

class scenarioFx
{
    constructor(scenarioHandler,reqdInc){
        
        this.scenarioHandler = scenarioHandler;
        this.requiredIncrements = reqdInc;
        this.currentLeftIncrements = 0;
        this.currentRightIncrements = 0;
        this.CompleteEffect = this.WinCon;
        this.outputText = "";
        this.winLocation;
        
    }
    
    SetWinLocation(location){
        
        this.winLocation = location;
    }
    
    Increment(team){
        
        if(team == "left") this.currentLeftIncrements++
        if(team == "right") this.currentRightIncrements++
        
        this._ProceedToCompleteEffect();
    }
    
    _ProceedToCompleteEffect(){
        
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements) this.CompleteEffect()
    }
    
    WinCon(){
        
        console.log("GAME OVER");
        
        this.scenarioHandler.gameOver = true;
        
        this.scenarioHandler.gameHandler.uiHandler.UpdateOutput("<br><br>");
        
        if(this.currentLeftIncrements == this.requiredIncrements){
            
            console.log("left wins!");
            
            let $winningChars = this.winLocation.GetCharsHere('any',"left");
            
            console.log($winningChars);
            
            let $winningCharString = GetStringOfCharsFromArray($winningChars,"left",true);
            
            console.log($winningCharString);
            
            let $printedString = this.outputText.replace("[names]",$winningCharString);
            
            console.log($printedString);
            
            this.scenarioHandler.gameHandler.uiHandler.UpdateOutput($printedString);
        }
        
        if(this.currentRightIncrements == this.requiredIncrements){
            
            let $winningChars = this.winLocation.GetCharsHere('any',"right");
            
            let $winningCharString = GetStringOfCharsFromArray($winningChars,"right",true);
            
            let $printedString = this.outputText.replace("[names]",$winningCharString)
            
            this.scenarioHandler.gameHandler.uiHandler.UpdateOutput($printedString);
        }
    }
}

export class scenarioHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.locationHandler = new locationHandler(this);
        this.stageHandler = new stageHandler(this);
        this.charHandler = new charHandler(this);
        this.leftTeamHope = 0;
        this.rightTeamHope = 0;
        
        this.gameOver = false;
        
        this.fxs = [];
        
    }
    
    GetTeamHope(team){
        
        if(team == "left") return this.leftTeamHope
        if(team == "right") return this.rightTeamHope
    }
    
    EvalScenarioFx(){
        
        
    }
    
    AddScenarioFx(reqdInc){
        
        const $fx = new scenarioFx(this,reqdInc)
        this.fxs.push($fx);
        
        return $fx
    }
}