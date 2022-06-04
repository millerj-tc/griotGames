import {locationHandler} from "./location.js";
import {stageHandler} from "./stageHandler.js";
import {charHandler} from "./character.js";
import {GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";


class scenarioFx
{
    constructor(scenario,reqdInc,type="wincon"){
        
        this.scenario = scenario;
        this.requiredIncrements = reqdInc;
        this.currentLeftIncrements = 0;
        this.currentRightIncrements = 0;
        this.completeEffectOutputText = "";
        this.targetStageOutputText = "";
        this.targetStage;
        this.newNextStage;
        this.targetChars;
        this.incrementingStage;
        this.winLocation;
        this.winningChar;
        this.winTeam;
        this.fxType = type;
        
        if(type == "wincon") this.CompleteEffect = this.WinCon;
        if(type == "stageSelect") this.CompleteEffect = this.StageSelect;
        if(type == "debuff") this.CompleteEffect = this.StageDebuff;
        if(type == "teamHopeBuff") this.CompleteEffect = this.TeamHopeBuff;
        if(type == "finalWincon") this.CompleteEffect = this.WinCon;
        if(type == "moveToInteractivePhase") this.CompleteEffect = this.MoveToInteractivePhase;
        
    }
    
    MoveToInteractivePhase(){
        
        this.scenario.gameHandler.uiHandler.ExpandRosterDisplay();
        
        this.scenario.playingNoninteractiveStages = false;
        
        this.scenario.gameHandler.uiHandler.CreateLocationTable();
        
        this.scenario.gameHandler.uiHandler.CreateLocationRows();
        
        this.scenario.gameHandler.uiHandler.CreateEvalGoButton();
        
        this.scenario.gameHandler.uiHandler._CreateCollapseButton();
        
        this.scenario.gameHandler.uiHandler.CreateLockButton();
        
        this.scenario.gameHandler.uiHandler.SetRosterCollapsibleCoords();
        
        this.scenario.locationHandler.RandomizeStartingTeams();
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
            //console.log(this);
            this.CompleteEffect();
        }
    }
    
    StageSelect(){
        
        console.log("selecting");
        
        if(this.targetStage == "undefined") console.error("Essential properties for scenarioFx have not been set!");
        
        this.targetStage.nextStage = this.newNextStage;
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
        
        if(this.currentLeftIncrements == this.requiredIncrements) this.targetChars = this.scenario.locationHandler.GetAllCharsAtLocations("left");
        
        if(this.currentRightIncrements == this.requiredIncrements) this.targetChars = this.scenario.locationHandler.GetAllCharsAtLocations("right");
        
        for(const char of this.targetChars){
            
            char.hope++
            //console.trace();
        }
        
        //console.log("HOPE TEXT " + this.winLocation.id);
        
        this.PrintCompleteEffectOutput($text);
    }
    
    PrintCompleteEffectOutput(text,wincon=false){
        
        if((this.completeEffectOutputText != "")){

            
            if(wincon == true || !this.scenario.gameOver){
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput("<br><br>");
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
            } 
            //else if(wincon == true)this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
        }
    }
    
    WinCon(){
        
        if(this.scenario.gameOver) return
        
        let $text;
        
        this.scenario.gameOver = true;
        
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
        
        let $winningChars = this.scenario.locationHandler.GetAllCharsAtLocations();
            
            let $winningCharString;
        
            $winningCharString = GetStringOfCharsFromArray($winningChars,team,true);
        
            this.winTeam = team;
        
            return $winningCharString
    }
    
    _LowestCumeTiebreaker(){
        
        let $leftTeamCume = 0;
        
        let $rightTeamCume = 0 ;
        
        const $leftTeam = this.scenario.locationHandler.GetAllCharsAtLocations("left");
        
        for(const char of $leftTeam){
            
            $leftTeamCume += char.cume;
        }
        
        const $rightTeam = this.scenario.locationHandler.GetAllCharsAtLocations("right");
        
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

export class scenario
{
    constructor(scenarioHandler,id){
        
        this.scenarioHandler = scenarioHandler;
        this.id = id;
        this.uiHandler = this.scenarioHandler.gameHandler.uiHandler;
        this.locationHandler = new locationHandler(this);
        this.stageHandler = new stageHandler(this);
        this.charHandler = new charHandler(this);
        this.leftTeamHope = 0;
        this.rightTeamHope = 0;
        
        this.usesLocationAssignment = true;
        this.playingNoninteractiveStages = false;
        
        this.scenarioOver = false;
        
        this.fxs = [];
        
        this.scenarioCharInstances = [];
        this.savedLocCharSlots = [];
        
        this.runCount = 0;
        
    }
    
    ScenarioPrep(fromPreviousScenario = false){
        
        console.warn("===");
        
        this.scenarioOver = false;
        
        this.fxs = [];
        
        this.scenarioCharInstances = [];
        
        this.locationHandler = new locationHandler(this);
        
        this.initLocations(this);
        
        this.LoadScenarioChars(fromPreviousScenario);
        
        this.charHandler.AddFunctionsToCharacters(this.scenarioCharInstances);
        
        this.uiHandler.CreateLocationTable();
        
        this.stageHandler = new stageHandler(this);  

        this.initStages(this);
        
        this.initScenarioFx(this);
        
        this.uiHandler.CreateLocationRows();
        
        if(this.previousScenario != undefined) this.uiHandler.CreateScenarioRewindButton();
        
        this.uiHandler.CreateEvalGoButton();
        
        this.uiHandler._CreateCollapseButton();
        
        this.uiHandler.CreateLockButton();
        
        this.uiHandler.SetRosterCollapsibleCoords();
        
        this._LoadChoices();
        
        this.locationHandler.RandomizeSlotsWithNoSaveData();
        
        if(this.runCount == 0) this.uiHandler.ExpandRosterDisplay();
        
        this.leftTeamHope = 0;
        
        this.rightTeamHope = 0;
        
        
    }
    
    ScenarioRun(){
        
        this.ClearThisScenarioOutput();
        
        this.stageHandler.stages[0].EvalFlow();
        
        this._HighlightChangedDivs();
        
        this._StoreCurrentOutput();
        
        
        
        this.runCount++;
    }
    
    SaveChoices(){
        
        this.savedLocCharSlots = [];
        
        for(const loc of this.locationHandler.locations){
        
            for(const slot of loc.charSlots){
                this.savedLocCharSlots.push({characterName: slot.character.name,alignment: slot.character.alignment, locationId: slot.location.id, selectId: slot.selectId});
            }
                
        }
    }
    
    _LoadChoices(){
        
        for(const savedCharSlot of this.savedLocCharSlots){
            
            for(const loc of this.locationHandler.locations){
                
                const $locObj = this.locationHandler.GetLocationById(savedCharSlot.locationId)
                
                if($locObj != loc) continue
                
                for(const charSlot of loc.charSlots){
                    
                    if(savedCharSlot.selectId == charSlot.selectId){
                        
                        let $charInst = this.GetScenarioChar(savedCharSlot.characterName);
                        
                        charSlot.UpdateChar($charInst);
                        
                        document.getElementById(savedCharSlot.selectId).value = savedCharSlot.characterName;
                    }
                }
            }
        }
    }

    LoadScenarioChars(fromPreviousScenario = false){
        
        let $sourceArr;
        
        if(fromPreviousScenario) $sourceArr = this.previousScenario.scenarioCharInstances;
        else $sourceArr = this.scenarioHandler.gameCharInstances;
        
        for(const char of $sourceArr){
            
            const $jsonData = JSON.stringify(char);
            const $charDeepCopy = JSON.parse($jsonData);

            this.scenarioCharInstances.push($charDeepCopy);
            //this.scenarioCharBeginInstances.push($charDeepCopy);
        }
    }
    
    GetScenarioChar(name,alignment="any"){
        
        for(const char of this.scenarioCharInstances){
            
            if(char.name == name && alignment == "any") return char
            else if (char.name == name && char.alignment == alignment) return char
        }
    }
    
    GetAllChars(unlockedFor = ""){
        
        let $returnArr = [];
        
        for(const obj of this.scenarioCharInstances){
            
            if(unlockedFor == "both" && (obj.unlocked.includes("left") || char.unlocked.includes("right"))) $returnArr.push(obj);
            else if(unlockedFor == "left" && obj.unlocked.includes("left")) $returnArr.push(obj);
            else if(unlockedFor == "right" && obj.unlocked.includes("right")) $returnArr.push(obj);
            else if(unlockedFor == "") $returnArr.push(obj);
        }
        
        return $returnArr
    }
    
    GetTeamHope(team){
        
        if(team == "left") return this.leftTeamHope
        if(team == "right") return this.rightTeamHope
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
    
    ClearThisScenarioOutput(){
        
        for(const div of document.querySelectorAll(".outputDiv" + this.id)) div.remove()
    }
    
    _StoreCurrentOutput(){
        
        this.uiHandler.storedOutputDivs = [];
        
        const $divArr = document.querySelectorAll(".outputDiv" + this.id);
       
        
        for(const div of $divArr){
        
            this.uiHandler.storedOutputDivs.push(div.innerText);
        } 

    }
    
    _HighlightChangedDivs(){
                
        if(this.runCount < 1) return
        
        const $outputDivs = document.querySelectorAll(".outputDiv" + this.id);
        
        console.log($outputDivs);
        
        let $matches;
        
        for(const output of $outputDivs){
            
            $matches = 0;
            
            for(const oldOutput of this.uiHandler.storedOutputDivs){
                                
                if(output.innerText == oldOutput){
                    
                    $matches++;
                    
                }
            }

            if($matches > 0) output.style.backgroundColor = "";
            else output.style.backgroundColor = "yellow";
        }
    }
    
    EvalScenarioBeginInterpersFxs(){
        
        const $ui = this.scenarioHandler.gameHandler.uiHandler;
        
        let $spokenStrings = [];
        
        for(const char of this.locationHandler.GetAllCharsAtLocations()){
            
            if(!char.hasOwnProperty("interpersFxs")) continue
            
            if(char.interpersFxs.length > 0){
                
                for(const fx of char.interpersFxs){
                    
                    let $interpersTargetArr = [];
                
                    for(const targetString of fx.targetCharsStrings){
                        
                        let $targChar = this.scenarioHandler.gameHandler.database.GetObjFromString(targetString);
                        
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
                                
                                //console.warn(spokenString);
                                //console.warn($outputText);
                                
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