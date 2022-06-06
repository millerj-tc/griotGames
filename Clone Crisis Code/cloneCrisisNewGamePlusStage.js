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
    }

    EvalFlow(tournamentMode){
        
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
        
        this._EndGameIfTeamAllCaptured();
        
        this.stageHandler.scenario.scenarioHandler.gameHandler.OfferSubmissionLinkAfterXRuns();
                
        this._ResultDisplayText($evalObj);
        
        this.firstRun = false;
                
        this._TriggerStageFx($evalObj);
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
    
    _CloneCrisisBattle(evalObj){
        
        //console.warn("BATTLE");
        
        this._NPCRecruitedByClosestCharisma(evalObj);
        
        this._BetsyAndLoganAreScary(evalObj);
        
        this._NPCRecruitOutput(evalObj);
        
        this._LowestCunningConfusedUnlessAlone(evalObj);
        
        this._LowestCunningCyclopsShield(evalObj);
        
        this._LowestCunningConfusedOutput(evalObj);
        
        this._CompareCunningOfEachTeamsSpeedster(evalObj);
        
        this._SpeedAndCunningDebuffOutput(evalObj);
        
        this._AloneCharPowerTrumps(evalObj);
        
        if(evalObj.winners.length == 0) this._GreatestUnmatchedPowerCapturesLowestToughness(evalObj);
        
        this._BishopIsImmune(evalObj);
        
        this._GreatestPowerCaptureOutput(evalObj);
        
        this._SetSpecialOutputGroup0ToRemainingLosingChars(evalObj);
    }
    
    _CompareCunningOfEachTeamsSpeedster(evalObj){
        
        let $speedEvalPool = this._ReturnArrWithTeamDupedCharsRemoved(evalObj.pool);
        
        if($speedEvalPool.length == 0) return
        
        let $leftTeam = $speedEvalPool.filter(c => c.alignment == "left");
        
        let $rightTeam = $speedEvalPool.filter(c => c.alignment == "right");
        
        let $leftSpeedster = $leftTeam.sort(function(a, b){return b.speed - a.speed})[0];
        
        let $rightSpeedster = $rightTeam.sort(function(a, b){return b.speed - a.speed})[0];
        
        let $highestSpeedChar;
        
        if($leftSpeedster.cunning > $rightSpeedster.cunning) {
            evalObj.outwittedSpeedChar = $rightSpeedster;
            $highestSpeedChar = $leftSpeedster;
        }
        else if($leftSpeedster.cunning < $rightSpeedster.cunning) {
            evalObj.outwittedSpeedChar = $leftSpeedster;
            $highestSpeedChar = $rightSpeedster;
        }
        else console.warn("_CompareCunningOfEachTeamsSpeedster is malfunctioning, comparing " + $leftSpeedster.name + " and " + $rightSpeedster.name)
        
        let $enemyAlign = $highestSpeedChar.GetEnemyAlignment();
        
        const $enemyArr = evalObj.GetCharsFromPool($enemyAlign);

        if($enemyArr.length < 1) return

        const $highestPowerEnemyOfSpeediestChar = $enemyArr.sort(function(a, b){return b.power - a.power})[0];

        if(this._CharLastTeammateAtLoc($highestPowerEnemyOfSpeediestChar)) return

        evalObj.pool = evalObj.pool.filter(c => c != $highestPowerEnemyOfSpeediestChar);

        evalObj.speedDebuffedChar = $highestPowerEnemyOfSpeediestChar;

        evalObj.speediestChar = $highestSpeedChar;
    }
    
    _SpeedAndCunningDebuffOutput(evalObj){
        
        if(evalObj.speedDebuffedChar != null){ 
            
            const $speediestCharOutput = GetStringOfCharsFromArray(evalObj.speediestChar,"any","S");
            const $outwittedCharOutput = GetStringOfCharsFromArray(evalObj.outwittedSpeedChar, "any","S");
            const $speedDebuffedCharOutput = GetStringOfCharsFromArray(evalObj.speedDebuffedChar,"any","S");
            const $onTheirHeelsOutput = ReplacePronouns(evalObj.speedDebuffedChar, " on [their] heels!")
            this.uiHandler.NewStageOutputDiv($speediestCharOutput + " has outwitted " + $outwittedCharOutput ", knocking " + $speedDebuffedCharOutput + $onTheirHeelsOutput);
            
        }
    }

}