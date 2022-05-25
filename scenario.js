import {locationHandler} from "./location.js";
import {stageHandler} from "./stage.js";
import {charHandler} from "./character.js";
import {GetStringOfCharsFromArray} from "./utils.js";

class scenarioFx
{
    constructor(scenarioHandler,reqdInc,type="wincon"){
        
        this.scenarioHandler = scenarioHandler;
        this.requiredIncrements = reqdInc;
        this.currentLeftIncrements = 0;
        this.currentRightIncrements = 0;
        this.completeEffectOutputText = "";
        this.targetStageOutputText = "";
        this.targetStage;
        this.targetChars;
        this.winLocation;
        this.winningChar;
        
        if(type == "wincon") this.CompleteEffect = this.WinCon;
        if(type == "debuff") this.CompleteEffect = this.StageDebuff;
        if(type == "teamHopeBuff") this.CompleteEffect = this.TeamHopeBuff;
        
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
        
        if(this.requiredIncrements == "relative" && this.winLocation == this.targetStage){ 
            console.log(this);
            this.CompleteEffect();
        }
    }
    
    
    
    StageDebuff(){
        
        if(this.targetStage == "undefined") console.error("Essential properties for scenarioFx have not been set!");
        
        let $text = this.completeEffectOutputText;
        
        let $winningCharString
        
        if(this.currentLeftIncrements == this.requiredIncrements){
            $winningCharString = GetStringOfCharsFromArray(this.winLocation.GetCharsHere(),"left",true);
            this.targetStage.rightDebuffCount++
        }
        if(this.currentRightIncrements == this.requiredIncrements){
            $winningCharString = GetStringOfCharsFromArray(this.winLocation.GetCharsHere(),"right",true);
            this.targetStage.leftDebuffCount++
        }
        
        $winningCharString = 
        
        $text = this.completeEffectOutputText.replace("[names]",$winningCharString);
        
        this.PrintCompleteEffectOutput($text);
    }
    
    TeamHopeBuff(){
        
        let $text = this.completeEffectOutputText;
        
        if(this.currentLeftIncrements == this.requiredIncrements) this.targetChars = this.scenarioHandler.locationHandler.GetAllCharsAtLocations("left");
        
        if(this.currentRightIncrements == this.requiredIncrements) this.targetChars = this.scenarioHandler.locationHandler.GetAllCharsAtLocations("right");
        
        for(const char of this.targetChars){
            
            char.hope++
            //console.trace();
        }
        
        //console.log("HOPE TEXT " + this.winLocation.id);
        
        this.PrintCompleteEffectOutput($text);
    }
    
    PrintCompleteEffectOutput(text,wincon=false){
        
        if((this.completeEffectOutputText != "")){
            
            if(wincon == true || !this.scenarioHandler.gameOver) this.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
            //else if(wincon == true)this.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
        }
    }
    
    WinCon(){
        
        console.log("GAME OVER");
        
        let $text;
        
        this.scenarioHandler.gameOver = true;
        
        this.scenarioHandler.gameHandler.uiHandler.UpdateOutput("<br><br>");
        
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements){
            
            //console.log(this);
            
            let $winningChars = this.scenarioHandler.locationHandler.GetAllCharsAtLocations();
            
            console.log($winningChars);
            
            let $winningCharString;
        
            if(this.currentLeftIncrements == this.requiredIncrements){

                $winningCharString = GetStringOfCharsFromArray($winningChars,"left",true);

                //console.log($winningCharString);
            }
        
            if(this.currentRightIncrements == this.requiredIncrements){

                $winningCharString = GetStringOfCharsFromArray($winningChars,"right",true);

            }
            
            console.log($winningCharString);
            
            $text = this.completeEffectOutputText.replace("[names]",$winningCharString);
            
            $text = `<b><span style="color:green">` + $text + "</span></b>";

            this.PrintCompleteEffectOutput($text,true);
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
    
    GetAllChars(){
        
        let $returnArr = [];
        
        for(const obj of this.gameHandler.database.data){
            
            if(obj.dataType == "char") $returnArr.push(char);
        }
        
        return $returnArr
    }
    
    GetTeamHope(team){
        
        if(team == "left") return this.leftTeamHope
        if(team == "right") return this.rightTeamHope
    }
    
    ScenarioReset(){
        
        //console.clear();
        
        //console.warn("RESET");
        
        this.gameOver = false;
        
         for(const scenfx of this.fxs){
                
                scenfx.currentLeftIncrements = 0;
                scenfx.currentRightIncrements = 0;
            }
        
        //console.warn(this.GetAllChars().length);
        
        for(const char of this.locationHandler.GetAllCharsAtLocations()){
            
            char.hope = 0;
        }
        
        //console.log(this.locationHandler.GetAllCharsAtLocations());
            
    }
    
    
    
    GetAllScenarioFxThatTargetStage(stage,triggeredOnly=true){
        
        let $returnArr = [];
        
        for(const fx of this.fxs){
            
            if(fx.targetStage == stage){
                
                if(!triggeredOnly)$returnArr.push(fx)
                
                else if(fx.currentLeftIncrements == fx.requiredIncrements || fx.currentRightIncrements == fx.requiredIncrements) $returnArr.push(fx)
            } 
        }
        
        return $returnArr
    }
    
    AddScenarioFx(reqdInc,type){
        
        const $fx = new scenarioFx(this,reqdInc,type)
        this.fxs.push($fx);
        
        return $fx
    }
}