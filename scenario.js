import {locationHandler} from "./location.js";
import {stageHandler} from "./stage.js";
import {charHandler} from "./character.js";
import {GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";

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
        this.incrementingStage;
        this.winLocation;
        this.winningChar;
        this.winTeam;
        this.fxType = type;
        
        if(type == "wincon") this.CompleteEffect = this.WinCon;
        if(type == "debuff") this.CompleteEffect = this.StageDebuff;
        if(type == "teamHopeBuff") this.CompleteEffect = this.TeamHopeBuff;
        if(type == "finalWincon") this.CompleteEffect = this.WinCon;
        
    }
    
    SetWinLocation(location){
        
        this.winLocation = location;
    }
    
    SetIncrementingStage(stage){
        
        this.incrementingStage = stage;
    }
    
    Increment(team){
        
        if(team == "left") this.currentLeftIncrements++
        if(team == "right") this.currentRightIncrements++
        
        this._ProceedToCompleteEffect();
    }
    
    _ProceedToCompleteEffect(){
        
        
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements) this.CompleteEffect()
        
        if(this.requiredIncrements == "relative" && this.incrementingStage == this.targetStage){ 
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

            
            if(wincon == true || !this.scenarioHandler.gameOver){
                
                this.scenarioHandler.gameHandler.uiHandler.UpdateOutput("<br><br>");
                
                this.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
            } 
            //else if(wincon == true)this.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
        }
    }
    
    WinCon(){
        
        console.log("GAME OVER");
        
        let $text;
        
        this.scenarioHandler.gameOver = true;
        
        let $winningCharString
            
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements){
            
            if(this.currentLeftIncrements == this.requiredIncrements) $winningCharString = this._TeamWins("left");
            if(this.currentRightIncrements == this.requiredIncrements) $winningCharString = this._TeamWins("right");
            
            this._PrepOutputText($winningCharString);
            
        }
        else if(this.requiredIncrements == "relative"){
            
            if(this.currentLeftIncrements > this.currentRightIncrements){
                $winningCharString = this._TeamWins("left");
                this._PrepOutputText($winningCharString);
            }
            else if(this.currentRightIncrements > this.currentLeftIncrements){
                $winningCharString = this._TeamWins("right");
                this._PrepOutputText($winningCharString);
            }
            else if(this.fxType == "finalWincon") this._LowestCumeTiebreaker();
        }
    }
    
    _PrepOutputText(winningCharString){
        
            let $text = this.completeEffectOutputText.replace("[names]",winningCharString);
            
            let $teamColor;
        
            if(this.winTeam == "left") $teamColor = "blue";
            if(this.winTeam == "right") $teamColor = "red";
        
            $text = `<b><span style="color:` + $teamColor + `">` + $text + "</span></b>";

            this.PrintCompleteEffectOutput($text,true);
    }
    
    _TeamWins(team){
        
        let $winningChars = this.scenarioHandler.locationHandler.GetAllCharsAtLocations();
            
            let $winningCharString;
        
            $winningCharString = GetStringOfCharsFromArray($winningChars,team,true);
        
            this.winTeam = team;
        
            return $winningCharString
    }
    
    _LowestCumeTiebreaker(){
        
        let $leftTeamCume = 0;
        
        let $rightTeamCume = 0 ;
        
        const $leftTeam = this.scenarioHandler.locationHandler.GetAllCharsAtLocations("left");
        
        for(const char of $leftTeam){
            
            $leftTeamCume += char.cume;
        }
        
        const $rightTeam = this.scenarioHandler.locationHandler.GetAllCharsAtLocations("right");
        
        for(const char of $rightTeam){
            
            $rightTeamCume += char.cume;
        }
        
        console.log($leftTeamCume);
        console.log($rightTeamCume);
        
        let $winningCharString
        
        if($leftTeamCume < $rightTeamCume) $winningCharString = this._TeamWins("left");
        else if($leftTeamCume > $rightTeamCume) $winningCharString = this._TeamWins("right");
        else this._TeamWins("error");
        
        this.completeEffectOutputText = "The world loves an underdog story! [names] have impressed the world with their chutzpah and are declared the winners of the Games!";
        
        this._PrepOutputText($winningCharString);
        
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
            
            if(obj.dataType == "char") $returnArr.push(obj);
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
    
    _GetInterpersMessageString(fx,targetChars){
        
        let $returnString;
        
        $returnString = fx.effectText.replace("[targets]",GetStringOfCharsFromArray(targetChars,"any",true));
        
        $returnString = $returnString.replace("[owner]",GetStringOfCharsFromArray([fx.ownerCharacter],"any",true));
        
        //console.log($returnString);
        
        $returnString = ReplaceWordsBasedOnPluralSubjects(targetChars,$returnString);
        
        return $returnString
    }
    
    _InterpersFxsHopeMods(char,amt){
        
        char.ModHope(amt);
    }
    
    EvalScenarioBeginInterpersFxs(){
        
        const $ui = this.gameHandler.uiHandler;
        
        let $spokenStrings = [];
        
        for(const char of this.locationHandler.GetAllCharsAtLocations()){
            
            if(char.interpersFxs.length > 0){
                
                for(const fx of char.interpersFxs){
                    
                    let $interpersTargetArr = [];
                
                    for(const targetString of fx.targetCharsStrings){
                        
                        let $targChar = this.gameHandler.database.GetObjFromString(targetString);
                        
                        $interpersTargetArr.push($targChar);
                    }
                    
                    if(fx.location = "team"){
                        
                        let $charTeamMembers = this.locationHandler.GetAllCharsAtLocations(char.alignment);
                        
                        let $targMatches = [];
                        
                        for(const otherChar of $charTeamMembers){
                            
                            for(const target of $interpersTargetArr){
                                
                                if(otherChar.name == target.name){
                                    
                                    $targMatches.push(otherChar);
                                    this._InterpersFxsHopeMods(otherChar,fx.hopeModifier);
                                    //$charsWhoHaveSpoken.push(char);
                                    //console.warn(otherChar);
                                }
                            }
                        }
                        
                        if($targMatches.length > 0){
                            
                            
                            // if it's not sorted, semantically identical strings in a different order of characters will both print
                            $targMatches = $targMatches.sort();
                            
                            let $outputText = this._GetInterpersMessageString(fx,$targMatches);
                            
                            let $itsAlreadyBeenSaid = false;
                            
                            for(const spokenString of $spokenStrings){
                                
                                console.warn(spokenString);
                                console.warn($outputText);
                                
                                if(spokenString == $outputText) $itsAlreadyBeenSaid = true;
                            }
                            
                            if(!$itsAlreadyBeenSaid){
                                $ui.UpdateOutput($outputText);

                                $spokenStrings.push($outputText);
                            }
                            
                        }
                    }
                }
            }
        }
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