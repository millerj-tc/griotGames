import {GetStringOfCharsFromArray} from "./utils.js";
import {stageFxHandler} from "./stageFx.js";
import {GetCharsByAlignment,ReplaceWordsBasedOnPluralSubjects} from "./utils.js";

export class evaluation
{
    constructor(stage){
        
        this.stage = stage;
        this.winTeam;
        this.winChar;
        this.location;
    }
}

export class stage
{
    constructor(stageHandler,id){
        
        this.stageHandler = stageHandler;
        this.stageFxHandler = new stageFxHandler(this);
        this.id = id;
        this.location;
        this.nextStage;
        
    }
    
}

export class stageHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
        
        this.stages = [];
        this.lastCreatedStage = undefined;
        this.currentStage;
    }
    
//    MoveToNextStage(){
//        
//        this.currentStage = this.currentStage.nextStage;
//    }
    
    AddStage(id){
        
        const $stage = new stage(this,id);
        
        if(this.lastCreatedStage != undefined) this.lastCreatedStage.nextStage = $stage;
        
        this.stages.push($stage);
        
        this.lastCreatedStage = $stage;
        
        //console.log($stage);
        
        return $stage
    }
    
    GotoNextStage(stage){
        
        const $ui = this.scenarioHandler.gameHandler.uiHandler;
        
        this.currentStage = stage;
        
        if(stage != undefined && !this.scenarioHandler.gameOver){ 
            
            $ui.UpdateOutput("<br><br>");

            stage.Eval();
        }
    }
                
    GetStageEvalMessage(stage){
        
        
    }
}