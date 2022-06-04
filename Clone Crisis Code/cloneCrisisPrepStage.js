import {cloneCrisisStage} from "./cloneCrisisStage.js";
import {ReplacePronouns,GetStringOfCharsFromArray,ReplaceWordsBasedOnPluralSubjects} from "./../utils.js";

export class cloneCrisisPrepStage extends cloneCrisisStage
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
        
        this.stageHandler.scenario.SaveChoices();
        
        this._DeclareLocation();
        
        this._StageHeaderOutput();
        
        this._NPCOpeningLineOutput();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        this._NoninteractiveEvalFlow();
        
        this.firstRun = false;
        
        this.stageHandler.scenario.scenarioOver = true;
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
     _NoninteractiveEvalFlow(){

        this.stageHandler.scenario.scenarioHandler.gameHandler.OfferSubmissionLinkAfterXRuns();

        const $evalObj = this._CreateEvalObj();

        this._DeclareLocation();

        this._StageHeaderOutput();

        this._NPCOpeningLineOutput();

        this._SetEvalPool($evalObj);

        this._NoninteractiveCloneCrisisBattle($evalObj);

        this._ValidateWinnersAndLosers($evalObj);

        this._ResultDisplayText($evalObj);

        this._HighlightChangedDivs();

        this._StoreCurrentOutputToEvalArr();

        this.firstRun = false;

        this._TriggerStageFx($evalObj);

        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
    _NoninteractiveCloneCrisisBattle(evalObj){
    
        
        this._NPCRecruitedAndUnlockedWithinTwoCharisma(evalObj);

    }
    
    _NPCRecruitedAndUnlockedWithinTwoCharisma(evalObj){
        
        if(this.npcs == null) return
        
        for(const npc of this.npcs){    
        
            let $leftRecruiters = [];

            let $rightRecruiters = [];

            for(const char of evalObj.pool){

                if(Math.abs(char.charisma - npc.charisma) <= 2){
                    
                   console.error("is next line calling the right thing??? shouldn't it get scenarioCharInstances?"); this.stageHandler.scenario.scenarioHandler.gameHandler.database.GetObjFromString(npc.name).unlocked.push(char.alignment);

                    if(char.alignment == "left") $leftRecruiters.push(char);

                    if(char.alignment == "right") $rightRecruiters.push(char);


                }
            }

            const $recruitedString = GetStringOfCharsFromArray(npc, "any","S");

            const $leftRecruitersString = GetStringOfCharsFromArray($leftRecruiters,"any","S");

            const $rightRecruitersString = GetStringOfCharsFromArray($rightRecruiters,"any","S");

            this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $leftRecruitersString);

            this.stageHandler.scenario.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv($recruitedString + " considers the arguments of " + $rightRecruitersString);
            
            }
        
        }
}