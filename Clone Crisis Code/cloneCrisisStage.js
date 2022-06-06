import {stage,evaluation} from "./../stage.js";
import {ReplacePronouns,GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./../utils.js";

export class cloneCrisisStage extends stage
{
    constructor(stageHandler,id){
        
        super(stageHandler,id);
        
        this.uiHandler = this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler;
        
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
        
        this._ResetNPCRecruitmentProperties();
        
        if(this.stageHandler.scenario.scenarioOver) return   
                
        const $evalObj = this._CreateEvalObj();
        
        this._DeclareLocation();
        
        this._StageHeaderOutput();
        
        this._NPCOpeningLineOutput();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        this._SetEvalPool($evalObj);
        
        this._VsOutput($evalObj);
        
        this._RemoveDebuffedCharsFromPool($evalObj);
        
        this._CloneCrisisBattle($evalObj);
        
        this._ValidateWinnersAndLosers($evalObj);
        
        this._EndGameIfTeamAllCaptured();
        
        this.stageHandler.scenario.scenarioHandler.gameHandler.OfferSubmissionLinkAfterXRuns();
                
        this._ResultDisplayText($evalObj);
        
        this.firstRun = false;
                
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
            this.stageHandler.scenario.scenarioOver = true;
        }
        
        if($rightTeam.length == 0){
            
            this.uiHandler.NewStageOutputDiv(`<span style="font-weight:bold;color:blue;font-size:calc(15px + 1.5vw)">The left team has won!</span>`);
            this.stageHandler.scenario.scenarioOver = true;
        } 
    }
    
    _NPCOpeningLineOutput(){
        
        if(this.NPC == undefined) return
        
        const $npcPortrait = GetStringOfCharsFromArray(this.NPC,"any","M",false);
        
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
        
        this._BetsyAndLoganAreScary(evalObj);
        
        this._NPCRecruitOutput();
        
        this._LowestCunningConfusedUnlessAlone(evalObj);
        
        this._LowestCunningCyclopsShield(evalObj);
        
        this._LowestCunningConfusedOutput(evalObj);
        
        this._HighestSpeedDebuffsGreatestPower(evalObj);
        
        this._HighestSpeedDebuffOutput(evalObj);
        
        this._AloneCharPowerTrumps(evalObj);
        
        if(evalObj.winners.length == 0) this._GreatestUnmatchedPowerCapturesLowestToughness(evalObj);
        
        this._BishopIsImmune(evalObj);
        
        this._GreatestPowerCaptureOutput(evalObj);
        
        this._SetSpecialOutputGroup0ToRemainingLosingChars(evalObj);
    }
    
    _NoninteractiveCloneCrisisBattle(evalObj){
    
        
        this._NPCRecruitedAndUnlockedWithinTwoCharisma(evalObj);

    }
    
    _NPCRecruitedAndUnlockedWithinTwoCharisma(evalObj){
        
        if(this.NPC == null) return
        
        evalObj.npc = this.NPC;
        
        evalObj.charismaChar = null;
        
        let $leftRecruiters = [];
        
        let $rightRecruiters = [];
        
        for(const char of evalObj.pool){
            
            if(Math.abs(char.charisma - this.NPC.charisma) <= 2){
                
                this.stageHandler.scenario.scenarioHandler.gameHandler.database.GetObjFromString(this.NPC.name).unlocked.push(char.alignment);
                
                if(char.alignment == "left") $leftRecruiters.push(char);
                
                if(char.alignment == "right") $rightRecruiters.push(char);

                
            }
        }
        
        const $recruitedString = GetStringOfCharsFromArray(this.NPC, "any","S");
        
        const $leftRecruitersString = GetStringOfCharsFromArray($leftRecruiters,"any","S");
        
        const $rightRecruitersString = GetStringOfCharsFromArray($rightRecruiters,"any","S");

        this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $leftRecruitersString);
        
        this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $rightRecruitersString);
    }
    

    _NPCRecruitedByClosestCharisma(evalObj){
        
        if(this.NPC == null) return
        
        evalObj.npc = this.NPC;
        
        let $evalArr = [];
        
        let $diffArr = [];
        
        let $returnArr = [];
        
        for(const char of evalObj.pool){
            
            let $charismaDiff = Math.abs(char.charisma - this.NPC.charisma);
            
            $evalArr.push({char: char,diff: $charismaDiff});
            
            $diffArr.push($charismaDiff);
        }

        
        let $matchDiff = Math.min(...$diffArr);

        
        for(const cpkg of $evalArr){
            
            if(cpkg.diff == $matchDiff) $returnArr.push(cpkg.char);
        }

        
        for(const char of $returnArr){
            
            for(const otherChar of $returnArr){
                
                if(char.name == otherChar.name && char != otherChar){
                    
                    $returnArr = $returnArr.filter(c => c != char);
                    $returnArr = $returnArr.filter(c => c != otherChar);
                }
            }
        }
        
        $returnArr.sort(function(a, b){return b.charisma - a.charisma})

        if($returnArr.length >= 1){
            
            evalObj.charismaChar = $returnArr[0];
            
            this.NPC.alignment = $returnArr[0].alignment;
            
            evalObj.npc.alignment = $returnArr[0].alignment;
            
            this.NPC.recruited = true;
            
            evalObj.pool.push(this.NPC);
            
            this.location.AddUnslottedChar(this.NPC);
        }
    }
    
    _BetsyAndLoganAreScary(evalObj){
        
        if(this.NPC != undefined && this.NPC.recruited && this.NPC.name != "Venom"){
            
            let $matches = 0;
            
            let $psylockeAndWolverine = [];
            
            for(const char of this.location.GetCharsHere("any",this.NPC.GetEnemyAlignment(),true)){
                
                if(char.name == "Wolverine" || char.name == "Psylocke"){
                    
                    $matches++;
                    
                    $psylockeAndWolverine.push(char);
                }
            }
            
            if($matches == 2){
                
                this.NPC.recruited = false;
                
                this.NPC.alignment = null;
                
                this.NPC.scaredByPowerCouple = true;
                
                this.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.NPC,"any","S") + " was thinking about joining up with " + GetStringOfCharsFromArray(evalObj.charismaChar,"any","S") + " but " + GetStringOfCharsFromArray($psylockeAndWolverine,"any","S") + ReplacePronouns(this.NPC," convince [them] to mind [their] own fucking business. They're pretty intimidating..."));
                
                this.location.RemoveCharDuringRun(this.NPC);
            }
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
            
            this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.NPC,"any","S") + " has decided to side with the " + this.NPC.alignment + " team.");
        }
        else if(!this.NPC.scaredByPowerCouple) this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(this.NPC,"any","S") + " can't decide who to believe.");
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
    
    _LowestCunningCyclopsShield(evalObj){
        
        if(evalObj.confusedCharacter != null){
            
            const $confusedCharAllies = this.location.GetCharsHere("any",evalObj.confusedCharacter.alignment,true);
            
            for(const char of $confusedCharAllies){
                
                if(char.name == "Cyclops"){
                    
                    const $cyclops = this.location.GetCharsHere("Cyclops",evalObj.confusedCharacter.alignment,true);
                    
                    this.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray($cyclops,"any","S") + " explains the plan carefully to " + GetStringOfCharsFromArray(evalObj.confusedCharacter,"any","S") + ReplacePronouns(evalObj.confusedCharacter,", and [they] executes the plan better than usual!"));
                    
                    evalObj.pool.push(evalObj.confusedCharacter);
                    
                    evalObj.confusedCharacter = null;
                    
                }
            }
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
            
            if($matches > 0 || char.stageDisabled) continue
            else{
                
                $greatestPowerChar = char;
                break
            }
        
        }
        
        if($greatestPowerChar == undefined) return
        
        let $enemyAlign = $greatestPowerChar.GetEnemyAlignment();
        
        let $enemyArr = evalObj.GetCharsFromInitialPool($enemyAlign);
        
        $enemyArr = $enemyArr.filter(c => c.stageImmune == false);
        
        if($enemyArr.length < 1) return
        
        this._AutoSortWinnersAndLosers(evalObj,$greatestPowerChar);
        
        evalObj.winCredit = $greatestPowerChar;
        
        const $lowestToughnessEnemyOfPowerfulestChar = $enemyArr.sort(function(a, b){return a.toughness - b.toughness})[0];
        
        
        this.location.RemoveCharDuringRun($lowestToughnessEnemyOfPowerfulestChar);
        
        
        evalObj.removedChar = $lowestToughnessEnemyOfPowerfulestChar;
        
    }
    
    _BishopIsImmune(evalObj){
        
        if(evalObj.removedChar != null && evalObj.removedChar.name == "Bishop" && (evalObj.winCredit.name == "Cyclops" || evalObj.winCredit.name == "Psylocke")){
            
            evalObj.removedChar.stageImmune = true;
            
            evalObj.winCredit.stageDisabled = true;
            
            this.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(evalObj.removedChar,"any","S") + " is immune to the energy attack from " + GetStringOfCharsFromArray(evalObj.winCredit,"any","S") + "!");
            
            evalObj.removedChar.removedDuringRun = false;
            
            evalObj.removedChar = null;
            
            console.log(evalObj);
            
            this._GreatestUnmatchedPowerCapturesLowestToughness(evalObj);
        }
        
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
                  (enemy.name == "Psylocke" && aloneChar.name != "Bishop") ||
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
            
      

            let $powerSortedWinChars = this.location.GetCharsHere("any",$winningAlignment);
            
      
            
            $powerSortedWinChars.sort(function(a,b){return b.power - a.power});
            
            

            this.uiHandler.NewStageOutputDiv(GetStringOfCharsFromArray(evalObj.winCredit,"any","S") + ReplaceWordsBasedOnPluralSubjects(evalObj.winCredit," [[manages/manage]] to capture ") + GetStringOfCharsFromArray(evalObj.removedChar,"any","S") + "!");
        }
    }
    
    _SetSpecialOutputGroup0ToRemainingLosingChars(evalObj){
        
        evalObj.specialOutputGroup0 = evalObj.losers.filter(c => c != evalObj.removedChar);
    }
}