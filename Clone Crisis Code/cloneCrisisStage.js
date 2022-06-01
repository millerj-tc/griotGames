import {stage,evaluation} from "./../stage.js";
import {ReplacePronouns} from "./../utils.js";

export class cloneCrisisStage extends stage
{
    constructor(stageHandler){
        
        super(stageHandler);
        
        this.uiHandler = this.stageHandler.scenarioHandler.gameHandler.uiHandler;
        
        this.evalValue = "";
        this.displayText = "";
        this.winText = "";
        this.debuffText = "";
        this.leftDebuffCount = 0;
        this.rightDebuffCount = 0;
        this.worstCharacterText = "[names] sucks at this";
        this.debug = false;
        this.evalDiv = document.createElement("div");
        this.NPC = null;
    }

    EvalFlow(){
        
        if(this.stageHandler.scenarioHandler.gameOver) return
        
        //console.warn("START FLOW");
        
        const $evalObj = new evaluation(this);
        
        this._DeclareLocation();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        this._SetEvalPool($evalObj);
        
        ////console.log($evalObj.testProp);
        
        this._RemoveDebuffedCharsFromPool($evalObj)
        
        this._CloneCrisisBattle($evalObj);
                
        this._ResultDisplayText($evalObj);
        
        this._HighlightChangedDivs();
        
        this._StoreCurrentOutputToEvalArr();
        
        this.firstRun = false;
        
        this._TriggerStageFx($evalObj.winners[0].alignment);
        
        
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
    _CloneCrisisBattle(evalObj){
        
        //console.warn("BATTLE");
        
        this._ResetNPCRecruitmentProperties();
        
        this._NPCRecruitedByClosestCharisma(evalObj);
        
        this._NPCRecruitOutput();
        
        this._LowestCunningConfusedUnlessAlone(evalObj);
        
        this._LowestCunningConfusedOutput(evalObj);
        
        this._HighestSpeedDebuffsGreatestPower(evalObj);
        
        this._HighestSpeedDebuffOutput(evalObj);
        
        this._GreatestPowerCapturesLowestToughness(evalObj);
    }
    

    _NPCRecruitedByClosestCharisma(evalObj){
        
        if(this.NPC == null) return
        
        let $evalArr = [];
        
        let $diffArr = [];
        
        let $returnArr = [];
        
        //evalObj.testProp = "test";
        
        for(const char of evalObj.pool){
            
            ////console.log(char.charisma);
            ////console.log(this.NPC.charisma);
            
            let $charismaDiff = Math.abs(char.charisma - this.NPC.charisma);
            
            $evalArr.push({char: char,diff: $charismaDiff});
            
            $diffArr.push($charismaDiff);
        }
        
        //console.log($diffArr);
        
        let $matchDiff = Math.min(...$diffArr);
        
        //console.log($matchDiff);
        
        for(const cpkg of $evalArr){
            
            if(cpkg.diff == $matchDiff) $returnArr.push(cpkg.char);
        }
        
        //console.log($returnArr);
        
        for(const char of $returnArr){
            
            for(const otherChar of $returnArr){
                
                if(char.name == otherChar.name && char != otherChar){
                    
                    $returnArr = $returnArr.filter(c => c != char);
                    $returnArr = $returnArr.filter(c => c != otherChar);
                }
            }
        }
        
        $returnArr.sort(function(a, b){return b.charisma - a.charisma})
        
        //console.log($returnArr);
        //console.log(this.NPC.charisma);
        
        if($returnArr.length >= 1){
            
            this.NPC.alignment = $returnArr[0].alignment;
            
            this.NPC.recruited = true;
            
            evalObj.pool.push(this.NPC);
        }
    }
    
    _ResetNPCRecruitmentProperties(){
        
        this.NPC.alignment = null;
        this.NPC.recruited = false;
    }
    
    _NPCRecruitOutput(){
        
        if(this.NPC.recruited){
            this.stageHandler.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(this.NPC.name + " has decided to side with the " + this.NPC.alignment + " team.");
        }
    }
    
    _CharLastTeammateAtLoc(char){
        
        const $teammatesWithMyAlignment = this.location.GetCharsHere("any",char.alignment).length;
        
        if($teammatesWithMyAlignment > 1) return false
        else if($teammatesWithMyAlignment == 1) return true
        else console.warn("Error: _CharLastTeammateAtLoc() is malfunctioning");
    }
    
    _LowestCunningConfusedUnlessAlone(evalObj){
        
        const $lowestCunningChar = evalObj.pool.sort(function(a, b){return a.cunning - b.cunning})[0];
        
        for(const char of evalObj.pool){
            
            if(this._CharLastTeammateAtLoc(char)) continue
            
            ////console.log(evalObj.pool);
            
            if(char == $lowestCunningChar){
                
                evalObj.pool = evalObj.pool.filter(c => c != $lowestCunningChar);
                evalObj.confusedCharacter = char;
            }
            
            ////console.log(evalObj.pool);
        }
    }
    
    _LowestCunningConfusedOutput(evalObj){
        
        ////console.log(evalObj.confusedCharacter);
        
        const $pronounedString = ReplacePronouns(evalObj.confusedCharacter," imperfectly executes [their] team plan, [they] is out of position!");
        
        if(evalObj.confusedCharacter != null) this.uiHandler.NewStageOutputDiv(evalObj.confusedCharacter.name + $pronounedString);
    }
    
    _HighestSpeedDebuffsGreatestPower(evalObj){
        
        const $highestSpeedChar = evalObj.pool.sort(function(a, b){return b.speed - a.speed})[0];
        
        let $enemyAlign = $highestSpeedChar.GetEnemyAlignment();
        
        const $enemyArr = evalObj.GetCharsFromPool($enemyAlign);
        
        if($enemyArr.length < 1) return
        
        const $highestPowerEnemyOfSpeediestChar = $enemyArr.sort(function(a, b){return b.power - a.power})[0];
        
        evalObj.pool = evalObj.pool.filter(c => c != $highestPowerEnemyOfSpeediestChar);
        
        evalObj.speedDebuffedChar = $highestPowerEnemyOfSpeediestChar;
        
        evalObj.speediestChar = $highestSpeedChar;
    }
    
    _HighestSpeedDebuffOutput(evalObj){
        
        if(evalObj.speedDebuffedChar != null) this.uiHandler.NewStageOutputDiv(evalObj.speedDebuffedChar.name + " is distracted by the speed of " + evalObj.speediestChar.name);
    }
    
    _GreatestPowerCapturesLowestToughness(evalObj){
        
        const $greatestPowerChar = evalObj.pool.sort(function(a, b){return b.power - a.power})[0];
        
        let $enemyAlign = $greatestPowerChar.GetEnemyAlignment();
        
        const $enemyArr = evalObj.GetCharsFromInitialPool($enemyAlign);
        
        if($enemyArr.length < 1) return
        
        evalObj.winners.push($greatestPowerChar);
        
        //console.log(evalObj.winners);
    }
}