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
        
        this.evalFlow = this.AltEvalFlow;
        
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
        
        this._EndGameIfTeamAllCaptured();
        
        this.stageHandler.scenario.scenarioHandler.gameHandler.OfferSubmissionLinkAfterXRuns();
                
        this._ResultDisplayText($evalObj);
        
        this.firstRun = false;
                
        this._TriggerStageFx($evalObj);
        
        this._IncreaseXpForAllParticipatingChars($evalObj);
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
    
    _AltCloneCrisisBattle(evalObj){
        
        this._NPCRecruitedByClosestCharisma(evalObj);
        
        this._BetsyAndLoganAreScary(evalObj);
        
        this._NPCRecruitOutput(evalObj);
        
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
        
        this._GreatestPowerCaptureOutput(evalObj);
        
        this._SetSpecialOutputGroup0ToRemainingLosingChars(evalObj);
    }
    
    _SpeedDebuffedCharGetsEnraged(evalObj){
        
        if(evalObj.speedDebuffedChar == undefined) return
        
        evalObj.speedDebuffedChar.Enrage();
    }
    
    _SpeedDebuffEnrageOutput(evalObj){
        
        if(evalObj.speedDebuffedChar == undefined) return
        
        const $speedDebuffedCharOutput = GetStringOfCharsFromArray(evalObj.speedDebuffedChar,"any","S");
        
        this.uiHandler.NewStageOutputDiv($speedDebuffedCharOutput + " bellows in rage!");
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
        
        this.uiHandler.NewStageOutputDiv($enragedCharOutput + " has had enough!!" + $they    + $slammedCharOutput + " by the ankle and slam " + $them + " into the ground!");
    }
}