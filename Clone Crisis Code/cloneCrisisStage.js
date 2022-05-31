import {stage,evaluation} from "./stage.js";

export class cloneCrisisStage extends stage
{
    constructor(stageHandler){
        
        super(stageHandler);
        
        this.evalValue = "";
        this.displayText = "";
        this.winText = "";
        this.debuffText = "";
        this.leftDebuffCount = 0;
        this.rightDebuffCount = 0;
        this.worstCharacterText = "[names] sucks at this";
        this.debug = false;
        this.evalDiv = document.createElement("div");
        this.NPC;
    }

    EvalFlow(){
        
        if(this.stageHandler.scenarioHandler.gameOver) return
        
        const $eval = new evaluation(this);
        
        this._MoveCurrentOutputToEvalDiv();
        
        this._DeclareLocation();
        
        this._WarnIfDupeCharsOnSameTeam();
        
        this._SetEvalPool($eval);
        
        this._RemoveDebuffedCharsFromPool($eval)
        
        this._CloneCrisisBattle($eval);
        
        this._ResultDisplayText($eval);
        
        this._HighlightChangedDivs();
        
        this._TriggerStageFx($eval.winners[0].alignment);
        
        this.stageHandler.GotoNextStage(this.nextStage);
    }
    
    _CharLastTeammateAtLoc(char){
        
        
    }
    
    _CloneCrisisBattle(eval){
        
        const $highestCharismaChar = eval.pool.sort(function(a, b){return b.charisma- a.charisma});
        
        this.NPC.alignment = $highestCharismaChar.alignment;
        
        eval.pool.push(this.NPC);
        
        for(const char of eval.pool){
            
            
        }
    }
}