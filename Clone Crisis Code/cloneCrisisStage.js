import {stage,evaluation} from "./../stage.js";
import {ReplacePronouns,GetStringOfCharsFromArray} from "./../utils.js";

export class cloneCrisisStage extends stage
{
    constructor(stageHandler,id){
        
        super(stageHandler,id);
        
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
        
        this._EndGameIfTeamAllCaptured();
        
        //console.warn(this.id);
        
        this._ResetNPCRecruitmentProperties();
        
        if(this.stageHandler.scenarioHandler.gameOver) return   
        
        //if(this.id == "loc0") this.location.unslottedChars = [];
        
        const $evalObj = new evaluation(this);
        
        this._DeclareLocation();
        
        this._StageHeaderOutput();
        
        this._NPCOpeningLineOutput();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        this._SetEvalPool($evalObj);
        
        this._VsOutput($evalObj);
        
        this._RemoveDebuffedCharsFromPool($evalObj);
        
        this._CloneCrisisBattle($evalObj);
        
        this._ValidateWinnersAndLosers($evalObj);
                
        this._ResultDisplayText($evalObj);
        
        this._HighlightChangedDivs();
        
        this._StoreCurrentOutputToEvalArr();
        
        this.firstRun = false;
        
        //console.log($evalObj);
        
        this._TriggerStageFx($evalObj);
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
    _EndGameIfTeamAllCaptured(){
        
        const $leftTeam = this.location.GetCharsHere("any","left");
        
        const $rightTeam = this.location.GetCharsHere("any","right");
        
        //console.log($leftTeam);
        
        //console.log($rightTeam);
        
        if($leftTeam.length == 0){
            
            this.uiHandler.NewStageOutputDiv(`<span style="font-weight:bold;color:red;font-size:calc(15px + 1.5vw)">The right team has won!</span>`);
            this.stageHandler.scenarioHandler.gameOver = true;
        }
        
        if($rightTeam.length == 0){
            
            this.uiHandler.NewStageOutputDiv(`<span style="font-weight:bold;color:blue;font-size:calc(15px + 1.5vw)">The left team has won!</span>`);
            this.stageHandler.scenarioHandler.gameOver = true;
        } 
    }
    
    _NPCOpeningLineOutput(){
        
        if(this.NPC == undefined) return
        
        const $npcPortrait = GetStringOfCharsFromArray(this.NPC,"any","M");
        
        if(this.NPC.openingLine != undefined) {
            
            const $newDiv = this.uiHandler.NewStageOutputDiv("<i>" + $npcPortrait + "</i>: " + this.NPC.openingLine);
            
            $newDiv.querySelector("img").style.float = "left";
//            console.log($newDiv.querySelector("img").naturalHeight);
//            $newDiv.style.height = String($newDiv.querySelector("img").naturalHeight + "px");
            $newDiv.querySelector("img").style.marginRight = "20px";
//            $newDiv.style.padding = "20px";
//            $newDiv.style.paddingLeft = String(($newDiv.querySelector("img").naturalWidth + 20) + "px");
            
        }
    }
    
    _VsOutput(evalObj){
        
        const $charsHere = this.location.GetCharsHere();
        
        const $leftString = GetStringOfCharsFromArray($charsHere,"left","S");
        
        const $rightString = GetStringOfCharsFromArray($charsHere,"right","S");
        
        this.uiHandler.NewStageOutputDiv($leftString + " vs " + $rightString);
    }
    
    _CloneCrisisBattle(evalObj){
        
        //console.warn("BATTLE");
        
        this._NPCRecruitedByClosestCharisma(evalObj);
        
        this._NPCRecruitOutput();
        
        this._LowestCunningConfusedUnlessAlone(evalObj);
        
        this._LowestCunningConfusedOutput(evalObj);
        
        this._HighestSpeedDebuffsGreatestPower(evalObj);
        
        this._HighestSpeedDebuffOutput(evalObj);
        
        this._AloneCharPowerTrumps(evalObj);
        
        if(evalObj.winners.length == 0) this._GreatestUnmatchedPowerCapturesLowestToughness(evalObj);
        
        this._GreatestPowerCaptureOutput(evalObj);
        
        this._SetSpecialOutputGroup0ToRemainingLosingChars(evalObj);
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
            
            this.location.AddUnslottedChar(this.NPC);
        }
    }
    
    _ResetNPCRecruitmentProperties(){
        
        if(this.NPC == null) return
        
        this.NPC.alignment = null;
        this.NPC.recruited = false;
    }
    
    _NPCRecruitOutput(){
        
        if(this.NPC == null) return
        
        if(this.NPC.recruited){
            
            this.stageHandler.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.NPC,"any","S") + " has decided to side with the " + this.NPC.alignment + " team.");
        }
        else this.stageHandler.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.NPC,"any","S") + " can't decide who to believe.");
    }
    
    _LowestCunningConfusedUnlessAlone(evalObj){
        
        const $lowestCunningChar = evalObj.pool.sort(function(a, b){return a.cunning - b.cunning})[0];
        
        const $secondLowestCunningChar = evalObj.pool.sort(function(a, b){return a.cunning - b.cunning})[1];
        
        if($lowestCunningChar.name == $secondLowestCunningChar.name) return
        
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
        
        if(evalObj.confusedCharacter == null) return
        
        const $pronounedString = ReplacePronouns(evalObj.confusedCharacter," imperfectly executes [their] team plan, [they] is out of position!");
        
        if(evalObj.confusedCharacter != null) this.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(evalObj.confusedCharacter,"any","S") + $pronounedString);
    }
    
    _HighestSpeedDebuffsGreatestPower(evalObj){
        
        let $speedEvalPool = this._ReturnArrWithTeamDupedCharsRemoved(evalObj.pool);
        
        if($speedEvalPool.length == 0) return
        
        const $highestSpeedChar = $speedEvalPool.sort(function(a, b){return b.speed - a.speed})[0];
        
        let $enemyAlign = $highestSpeedChar.GetEnemyAlignment();
        
        const $enemyArr = evalObj.GetCharsFromPool($enemyAlign);
        
        if($enemyArr.length < 1) return
        
        const $highestPowerEnemyOfSpeediestChar = $enemyArr.sort(function(a, b){return b.power - a.power})[0];
        
        if(this._CharLastTeammateAtLoc($highestPowerEnemyOfSpeediestChar)) return
        
        evalObj.pool = evalObj.pool.filter(c => c != $highestPowerEnemyOfSpeediestChar);
        
        evalObj.speedDebuffedChar = $highestPowerEnemyOfSpeediestChar;
        
        evalObj.speediestChar = $highestSpeedChar;
    }
    
    _HighestSpeedDebuffOutput(evalObj){
        
        if(evalObj.speedDebuffedChar != null){ 
            
            const $speediestCharOutput = GetStringOfCharsFromArray(evalObj.speediestChar,"any","S");
            const $speedDebuffedCharOutput = GetStringOfCharsFromArray(evalObj.speedDebuffedChar,"any","S");
            const $onTheirHeelsOutput = ReplacePronouns(evalObj.speedDebuffedChar, " on [their] heels!")
            this.uiHandler.NewStageOutputDiv($speediestCharOutput + " attacks with blinding speed, knocking " + $speedDebuffedCharOutput + $onTheirHeelsOutput);
            
        }
    }
    
    _GreatestUnmatchedPowerCapturesLowestToughness(evalObj){
        
        let $greatestPowerChar
        
        for(const char of evalObj.pool.sort(function(a, b){return b.power - a.power})){
         
            let $matches = 0;
            
            for(const otherChar of evalObj.pool){
                
                //console.log(char.name + otherChar.name);
                if(char.name == otherChar.name && char != otherChar) $matches++
            }
            
            if($matches > 0) continue
            else{
                
                $greatestPowerChar = char;
                break
            }
        
        }
        
        //console.log($greatestPowerChar);
        
        let $enemyAlign = $greatestPowerChar.GetEnemyAlignment();
        
        const $enemyArr = evalObj.GetCharsFromInitialPool($enemyAlign);
        
        if($enemyArr.length < 1) return
        
        this._AutoSortWinnersAndLosers(evalObj,$greatestPowerChar);
        
        evalObj.winCredit = $greatestPowerChar;
        
        const $lowestToughnessEnemyOfPowerfulestChar = $enemyArr.sort(function(a, b){return a.toughness - b.toughness})[0];
        
        //console.log(this.location.GetCharsHere());
        
        this.location.RemoveCharDuringRun($lowestToughnessEnemyOfPowerfulestChar);
        
        //console.log(this.location.GetCharsHere());
        
        evalObj.removedChar = $lowestToughnessEnemyOfPowerfulestChar;
        
    }
    
    _AloneCharPowerTrumps(evalObj){
        
        let $aloneChars = [];
        
        for(const char of evalObj.pool){
            
            if(this._CharLastTeammateAtLoc(char)) $aloneChars.push(char);
        }
        
        let $bigStrongEnemies;
        
        for(const aloneChar of $aloneChars){
            
             $bigStrongEnemies = [];
            
            for(const enemy of this.location.GetCharsHere("any",aloneChar.GetEnemyAlignment())){
                
                if(enemy.name == "Wolverine" ||
                  enemy.name == "Beast" ||
                  enemy.name == "Black Panther" ||
                  enemy.name == "Psylocke" ||
                  enemy.name == "Ghostrider" ||
                  enemy.name == "Jessica Jones" || 
                  enemy.name == "Colossus") {
                    
                    $bigStrongEnemies.push(enemy);
                }
            }
                   
            if($bigStrongEnemies.length > 1){
                    
                evalObj.removedChar = aloneChar;
                this._AutoSortWinnersAndLosers(evalObj,$bigStrongEnemies[0]);
                evalObj.winCredit = $bigStrongEnemies;
                this.location.RemoveCharDuringRun(aloneChar);
            }
        }
    }
    
    _GreatestPowerCaptureOutput(evalObj){
        
        if(evalObj.removedChar != null){
        
            const $winningAlignment = evalObj.removedChar.GetEnemyAlignment();
            
            //console.log(evalObj.removedChar);
            
            //console.log($winningAlignment);

            let $powerSortedWinChars = this.location.GetCharsHere("any",$winningAlignment);
            
            //console.warn($powerSortedWinChars);
            
            $powerSortedWinChars.sort(function(a,b){return b.power - a.power});

            this.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(evalObj.removedChar,"any","S") + " has been captured by " + GetStringOfCharsFromArray(evalObj.winCredit,"any","S") + "!");
        }
    }
    
    _SetSpecialOutputGroup0ToRemainingLosingChars(evalObj){
        
        evalObj.specialOutputGroup0 = evalObj.losers.filter(c => c != evalObj.removedChar);
    }
}