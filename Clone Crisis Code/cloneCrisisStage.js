import {stage,evaluation} from "./stage.js";

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
    
    _CloneCrisisBattle(eval){
        
        this._ResetNPCRecruitmentProperties();
        
        this._NPCRecruitedByClosestCharisma(eval);
        
        this._NPCRecruitOutput();
        
        this._LowestCunningConfusedUnlessAlone(eval);
        
        this._LowestCunningConfusedOutput(eval);
    }
    
    _NPCRecruitedByClosestCharisma(eval){
        
        if(this.NPC == null) return
        
        let $evalArr = [];
        
        let $diffArr = [];
        
        let $returnArr = [];
        
        for(const char of eval.pool){
            
            let $charismaDiff = Math.abs(char.charisma - this.NPC.charisma);
            
            $evalArr.push([char,$charismaDiff]);
            
            $diffArr.push($charismaDiff);
        }
        
        let $matchDiff = $diffArr.min();
        
        for(const i of $evalArr){
            
            if(i[1] == $matchDiff) $returnArr.push(i[0]);
        }
        
        if($returnArr.length == 1){
            
            this.NPC.alignment = $returnArr[0].alignment;
            
            this.NPC.recruited = true;
            
            eval.pool.push(this.NPC);
        }
    }
    
    _ResetNPCRecruitmentProperties(){
        
        this.NPC.alignment = null;
        this.NPC.recruited = false;
    }
    
    _NPCRecruitOutput(){
        
        this.stageHandler.scenarioHandler.gameHandler.uiHandler.NewStageOutputDiv(this.NPC.name + " has decided to side with the " + this.NPC.alignment + " team.");
    }
    
    _CharLastTeammateAtLoc(char){
        
        const $teammatesWithMyAlignment = char.location.GetCharsHere("any",char.alignment).length;
        
        if($teammatesWithMyAlignment > 1) return false
        else if($teammatesWithMyAlignment == 1) return true
        else console.warn("Error: _CharLastTeammateAtLoc() is malfunctioning");
    }
    
    _LowestCunningConfusedUnlessAlone(eval){
        
        const $lowestCunningChar = eval.pool.sort(function(a, b){return a.cunning - b.cunning})[0];
        
        for(const char of eval.pool){
            
            if(this._CharLastTeammateAtLoc(char)) continue
            
            if(char == $lowestCunningChar){
                
                eval.pool.filter(c => c != $lowestCunningChar);
                eval.confusedCharacter = char;
            }
        }
    }
    
    _LowestCunningConfusedOutput(eval){
        
        if(eval.confusedCharacter != null) this.uiHandler.NewStageOutputDiv(eval.confusedCharacter.name + " imperfectly execute their team plan, they are out of position!");
    }
}