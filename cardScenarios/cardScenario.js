import {cardZoneHandler} from "./cardZone.js";
import {stageHandler} from "./stageHandler.js";
import {character} from "./character.js";
import {card} from "./card.js";
import {GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "../systemUtils/utils.js";




export class cardScenario
{
    constructor(cardScenarioHandler,id){
        
        this.cardScenarioHandler = cardScenarioHandler;
        this.id = id;
        this.uiHandler = this.cardScenarioHandler.gameHandler.uiHandler;
        this.cardZoneHandler = new cardZoneHandler(this);
        this.stageHandler = new stageHandler(this);
        this.leftTeamHope = 0;
        this.rightTeamHope = 0;
        
        this.usesCardZoneAssignment = true;
        this.playingNoninteractiveStages = false;
        
        this.scenarioOver = false;
        
        this.fxs = [];
        
        this.scenarioCharInstances = [];
        this.savedLocCharSlots = [];
        
        this.runCount = 0;
        
    }
    
    ScenarioPrep(loadCharsFromLastScenarioRun = false){
        
        console.log("==" + " " + this.id);
        
        this.LoadAndResetScenarioCharacters();
        
        this.cardZoneHandler = new cardZoneHandler(this);
        
        this.initCardZones(this);
        
        
        
        //this.uiHandler.CreateCardZoneTable();
        
        this.stageHandler = new stageHandler(this);  

        this.initStages(this);
        
        this._ResetCurrentStage();
        
        this.initScenarioFx(this);
        
        this.initCardZoneMenu(this);
        
        //this.uiHandler.CreateCardZoneRows();
        
        this.CreateRosterDivButtons();
        
        this._LoadPreviousChoicesForCharSlotsOrRandomize();
        
        this.uiHandler.ExpandRosterDisplay();
        
        
    }
    
    CreateRosterDivButtons(){
        
        this.uiHandler.CreateScenarioRewindButton();
        
        this.uiHandler.CreateEvalGoButton();
        
        this.uiHandler._CreateCollapseButton();
        
        this.uiHandler.CreateLockButton();
        
        this.uiHandler.SetRosterCollapsibleCoords();
    }
    
    ScenarioRun(tournamentMode = false){
        
        this.scenarioOver = false;
        
        this.fxs = [];
        
        this._ResetCardZoneUnslottedChars();
        
        this.LoadAndResetScenarioCharacters();
        
        this._ResetCharacterObjectsInSlots();
        
        this.ClearThisScenarioOutput();
        
        this.SaveChoices();
        
        this._ResetCurrentStage();
        
        this.stageHandler.stages[0].stageFlowHandler.RunPhases(tournamentMode);
        
        this._HighlightChangedDivs();
        
        this._StoreCurrentOutput();
        
        this.runCount++;
    }
    
    SetScenarioWinningTeam(team){
        

        
        this.winningTeam = team;
    }
    
    _ResetCurrentStage(){
        
        this.stageHandler.currentStage = this.stageHandler.stages[0];
    }
    
    _ResetCardZoneUnslottedChars(){
        
        for(const loc of this.cardZoneHandler.cardZones){
            
            loc.unslottedChars = [];
        }
    }
    
    LoadAndResetScenarioCharacters(loadCharsFromLastScenarioRun){
        
        this.scenarioCharInstances = [];
        
        this.LoadScenarioCards(loadCharsFromLastScenarioRun);
        
    }
    
    _ResetCharacterObjectsInSlots(){
        
        for(const loc of this.cardZoneHandler.cardZones){
            
            for(const slot of loc.charSlots){
                
                const $freshChar = this.GetScenarioChar(slot.character.name);
                
                slot.UpdateChar($freshChar);
            }
        }
    }
    
    _LoadPreviousChoicesForCharSlotsOrRandomize(){
        
        this._LoadChoices();
        
        this.cardZoneHandler.RandomizeSlotsWithNoSaveData();
    }
    
    SaveChoices(){
        
        this.savedLocCharSlots = [];
        
        for(const loc of this.cardZoneHandler.cardZones){
        
            for(const slot of loc.charSlots){
                
                const $charXp = ((slot.character.xp.left + slot.character.xp.right)/2);
                
                this.savedLocCharSlots.push({characterName: slot.character.name,alignment: slot.character.alignment, cardZoneId: slot.cardZone.id, selectId: slot.selectId});
            }
                
        }
    }
    
    _LoadChoices(){
        
        for(const savedCharSlot of this.savedLocCharSlots){
            
            for(const loc of this.cardZoneHandler.cardZones){
                
                const $locObj = this.cardZoneHandler.GetCardZoneById(savedCharSlot.cardZoneId)
                
                if($locObj.id != loc.id) continue
                
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

    LoadScenarioCards(fromPreviousScenario = false){
        
        let $sourceArr;
        
        let $returnArr = [];
        
        let $firstScen = true;
        
        if(this.previousScenario == null) {
            

            $sourceArr = this.cardScenarioHandler.gameHandler.database.data;
            
        }
        else {
            $firstScen = false;
            $sourceArr = this.previousScenario.scenarioCardInstances;
        }
        
        for(const c of $sourceArr){
            
            let $jsonData
            
            if($firstScen) $jsonData = JSON.stringify(c);
            else $jsonData = JSON.stringify(c.data);
            
            const $charDeepCopyData = JSON.parse($jsonData);
            
            let $scenChar;
            
            if(c.dataType == "char") $scenChar = new character(this)
            else $scenChar = new card(this);
            
            $scenChar.data = $charDeepCopyData;
            
            if($firstScen) $scenChar.AddGenericProperties();

            $returnArr.push($scenChar);
        }
        
        this.scenarioCharInstances = [];
        
        this.scenarioCharInstances = $returnArr;
        
    }
    
    GetAllCards(unlockedFor = ""){
        
        let $returnArr = [];
        
        for(const c of this.scenarioCharInstances){
            
            if(unlockedFor == "both" && (c.data.unlocked.includes("left") || char.unlocked.includes("right"))) $returnArr.push(c);
            else if(unlockedFor == "left" && c.data.unlocked.includes("left")) $returnArr.push(c);
            else if(unlockedFor == "right" && c.data.unlocked.includes("right")) $returnArr.push(c);
            else if(unlockedFor == "") $returnArr.push(c);
        }
        
        return $returnArr
    }
    
    GetScenarioCard(name,alignment="any"){
        
        
        //-- SNEAKY ERRORS MAY RESULT FROM BEING PASSED NULL NAME
        
        
        if(name == null) return false
        
        for(const card of this.scenarioCardInstances){
            
            if(card.data.name == name && alignment == "any") return card
            else if (card.data.name == name && card.data.alignment == alignment) return card
        }
        
        console.warn("GetScenarioCard failed for input: " + name);    
    }
    
    GetAllChars(unlockedFor = ""){
        
        let $returnArr = [];
        
        for(const card of this.scenarioCharInstances){
            
            if(card.dataType != "char") continue
            
            if(unlockedFor == "both" && (card.data.unlocked.includes("left") || char.unlocked.includes("right"))) $returnArr.push(card);
            else if(unlockedFor == "left" && card.data.unlocked.includes("left")) $returnArr.push(card);
            else if(unlockedFor == "right" && card.data.unlocked.includes("right")) $returnArr.push(card);
            else if(unlockedFor == "") $returnArr.push(card);
        }
        
        return $returnArr
    }
    
    _GetInterpersMessageString(fx,targetChars){
        
        let $returnString;
        
        $returnString = fx.effectText.replace("[targets]",GetStringOfCharsFromArray(targetChars,"any",true));
        
        $returnString = $returnString.replace("[owner]",GetStringOfCharsFromArray([fx.ownerCharacter],"any",true));
        
        $returnString = ReplaceWordsBasedOnPluralSubjects(targetChars,$returnString);
        
        return $returnString
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