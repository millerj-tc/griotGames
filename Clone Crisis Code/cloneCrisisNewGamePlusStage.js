import {cloneCrisisStage} from "./cloneCrisisStage.js";
import {ReplacePronouns,GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./../utils.js";

export class cloneCrisisNewGamePlusStage extends cloneCrisisStage
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
        this.tournamentMode = false;
        
        this.EvalFlow = this.AltEvalFlow;
        
        this._CloneCrisisBattle = this._AltCloneCrisisBattle;
    }

    AltEvalFlow(tournamentMode){
        
        this.tournamentMode = tournamentMode;
        
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
        
        this._EndGameIfTeamAllCapturedPlus($evalObj);
        
        this.stageHandler.scenario.scenarioHandler.gameHandler.OfferSubmissionLinkAfterXRuns();
                
        this._ResultDisplayText($evalObj);
        
        this.firstRun = false;
                
        this._TriggerStageFx($evalObj);
        
        this._IncreaseXpForAllParticipatingChars($evalObj);
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
    
    _AltCloneCrisisBattle(evalObj){
        
        this._UnlockedCharsSideWithNearestUntiedCharisma(evalObj);
        
        // -- Unlocked Char Side Select Output has to happen within loop because there could be multiple within stage
        
        this._LowestCunningConfusedUnlessAlone(evalObj);
        
        this._LowestCunningCyclopsShield(evalObj);
        
        this._LowestCunningConfusedOutput(evalObj);
        
        this._HighestSpeedDebuffsGreatestPower(evalObj);
        
        this._EnragedCharStrikesBack(evalObj);
        
        this._EnragedCharStrikesBackOutput(evalObj);
        
        this._HighestSpeedDebuffOutput(evalObj);
        
        this._SpeedDebuffedCharGetsEnraged(evalObj);
        
        this._SpeedDebuffEnrageOutput(evalObj);
        
        this._AloneCharPowerTrumps(evalObj);
        
        if(evalObj.winners.length == 0) this._GreatestUnmatchedPowerCapturesLowestToughness(evalObj);
        
        this._BishopIsImmune(evalObj);
        
        this._AlsoRemoveTeamDupedUnlockedCharIfMirrorIsCaptured(evalObj);
        
        this._GreatestPowerCaptureOutput(evalObj);
        
        this._AutoSortWinnersAndLosers(evalObj,evalObj.winCredit);
        
        this._SetSpecialOutputGroup0ToRemainingLosingChars(evalObj);
    }
    
    _SpeedDebuffedCharGetsEnraged(evalObj){
        
        if(evalObj.speedDebuffedChar == undefined) return
        
        evalObj.speedDebuffedChar.Enrage();
    }
    
    _SpeedDebuffEnrageOutput(evalObj){
        
        if(evalObj.speedDebuffedChar == undefined) return
        
        const $speedDebuffedCharOutput = GetStringOfCharsFromArray(evalObj.speedDebuffedChar,"any","S");
        
        this.stage.uiHandler.NewStageOutputDiv($speedDebuffedCharOutput + " bellows in rage!");
    }
    
    _EnragedCharStrikesBack(evalObj){
        
        if(evalObj.speedDebuffedChar == null) return
        
        if(evalObj.speedDebuffedChar.rage > 0){
            
            evalObj.pool.push(evalObj.speedDebuffedChar);
            
            evalObj.enragedChar = evalObj.speedDebuffedChar;
            
            evalObj.pool = evalObj.pool.filter(c => c != evalObj.speediestChar);
            
            evalObj.speedDebuffedChar.Sooth();
            
            evalObj.rageSlammedChar = evalObj.speediestChar;
            
            evalObj.speediestChar = null;
            
            evalObj.speedDebuffedChar = null;

        }
        
    }
    
    _EnragedCharStrikesBackOutput(evalObj){
        
        if(evalObj.enragedChar == undefined) return
        
        const $enragedCharOutput = GetStringOfCharsFromArray(evalObj.enragedChar,"any","S");
        
        const $slammedCharOutput = GetStringOfCharsFromArray(evalObj.rageSlammedChar,"any","S");
        
        const $they = ReplacePronouns(evalObj.enragedChar, " Like lightning, [they] snags ");
        
        const $them = ReplacePronouns(evalObj.rageSlammedChar, "[them]");
        
        this.stage.uiHandler.NewStageOutputDiv($enragedCharOutput + " has had enough!!" + $they + $slammedCharOutput + " by the ankle and slams " + $them + " into the ground!");
    }
    
    _UnlockedCharsSideWithNearestUntiedCharisma(evalObj){
        
        let $dupeRemovedPool = this._ReturnArrWithTeamDupedCharsRemoved(evalObj.pool);
        
        let $lockedCharsPool = [];
        
        for(const char of evalObj.pool){
            
            const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(char.name);
            
            // only evaluate chars that are duped across teams
            
            if($ogCharObj.unlocked.length == 0 && this._CharHasAcrossTeamsDupeMatch(char,evalObj)) $lockedCharsPool.push(char);
        }
        
        let $diffArr = [];
        
        for(const char of $lockedCharsPool){
            
            evalObj.this.stageLoopCharismaChar = null;
            
            evalObj.charismaStalemateChar = null;
            
            for(const otherChar of $dupeRemovedPool){
                
                let $charismaDiff = Math.abs(char.charisma - otherChar.charisma);
                
                if(char != otherChar) $diffArr.push({char:otherChar,diff:$charismaDiff});
            }
            
            if($diffArr.length > 0){
                
                let $penultimateCharming = null;
                
                if($diffArr.length > 1) $penultimateCharming = $diffArr.sort(function(a,b){return a.diff - b.diff})[1];
        
                let $mostCharming = $diffArr.sort(function(a,b){return a.diff - b.diff})[0];

                if($penultimateCharming != null && $penultimateCharming.diff == $mostCharming.diff && $penultimateCharming.char.charisma > $mostCharming.char.charisma) $mostCharming = $penultimateCharming
                
                else if($penultimateCharming.diff == $mostCharming.diff && $penultimateCharming.char.charisma == $mostCharming.char.charisma){
                    
                    if(char.alreadySpokenOnCharisma) continue
                    
                    
                    const $stalemateOutput = GetStringOfCharsFromArray(char,"any","S");
        
                    this.stage.uiHandler.NewStageOutputDiv($stalemateOutput + " can't decide who to believe!");
                    
                    if(evalObj.GetEvalObjChar(char.name,char.GetEnemyAlignment(),true) != false) {
                    
                        const $mirrorChar = evalObj.GetEvalObjChar(char.name,char.GetEnemyAlignment());

                        $mirrorChar.alreadySpokenOnCharisma = true;
                    
                        $mirrorChar.stageImmune = true;
                        
                        //evalObj.pool = evalObj.pool.filter(c => c!= $mirrorChar);
                    }
                            
                    continue
                }
            
                evalObj.this.stageLoopCharismaChar = $mostCharming.char;
                
                if($mostCharming.char.alignment == char.alignment){
                    
                    evalObj.convincedChar = char;
                    
                    const $mirrorChar = evalObj.GetEvalObjChar(char.name,char.GetEnemyAlignment());
                    
                    $mirrorChar.alreadySpokenOnCharisma = true;
                
                    this._UnlockedCharsSideSelectOutput(evalObj);
                }
            
            }
        
        }
        
    }
    
    _UnlockedCharsSideSelectOutput(evalObj){
        
        if(evalObj.thisLoopCharismaChar == null) return
        
        //if(evalObj.convincedChar.scaredByPowerCouple) return
        
        const $convincedOutput = GetStringOfCharsFromArray(evalObj.convincedChar,"any","S");
        
        this.stage.uiHandler.NewStageOutputDiv($convincedOutput + " sides with team " + evalObj.convincedChar.alignment);
    }
    
    _EndGameIfTeamAllCapturedPlus(evalObj){
        
        let $leftTeam = this.stage.location.GetCharsHere("any","left");
        
        let $rightTeam = this.stage.location.GetCharsHere("any","right");
        
        for(const char of $leftTeam){
            
            const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(char.name);
           
            //if there's a copy of the char on the right team and it was initially locked, remove from arr for this.stage eval
            if($rightTeam.filter(c => c.name == char.name).length > 0 && $ogCharObj.unlocked.length == 0) $leftTeam = $leftTeam.filter(c => c != char)
        }
        
        for(const char of $rightTeam){
            
            const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(char.name);
           
            //if there's a copy of the char on the right team and it was initially locked, remove from arr for this eval
            if($leftTeam.filter(c => c.name == char.name).length > 0 && $ogCharObj.unlocked.length == 0) {$rightTeam = $rightTeam.filter(c => c != char)}
        }
        
        if($leftTeam.length == 0){
            
            this.stage.uiHandler.NewStageOutputDiv(`<span style="font-weight:bold;color:red;font-size:calc(15px + 1.5vw)">The right team has won!</span>`);
            this.stage.stageHandler.scenario.scenarioOver = true;
            this.stage.stageHandler.scenario.SetScenarioWinningTeam("right");
        }
        
        if($rightTeam.length == 0){
            
            this.stage.uiHandler.NewStageOutputDiv(`<span style="font-weight:bold;color:blue;font-size:calc(15px + 1.5vw)">The left team has won!</span>`);
            this.stage.stageHandler.scenario.scenarioOver = true;
            this.stage.stageHandler.scenario.SetScenarioWinningTeam("left");
        } 
    }
    
    _AlsoRemoveTeamDupedUnlockedCharIfMirrorIsCaptured(evalObj){
        
        if(evalObj.removedChar == null) return
        
        const $ogCharObj = this.stage.stageHandler.scenario.scenarioHandler.GetGameChar(evalObj.removedChar.name);
        
        const $mirrorChar = evalObj.GetEvalObjChar(evalObj.removedChar.name,evalObj.removedChar.GetEnemyAlignment(),true); 
           
        if($ogCharObj.unlocked.length == 0) {
            
            this.stage.location.RemoveCharDuringRun($mirrorChar)
        }
    }
}