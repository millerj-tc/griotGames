export class stageHandler
{
    constructor(scenario){
        
        this.scenario = scenario;
        
        this.stages = [];
        this.lastCreatedStage = undefined;
        this.currentStage = undefined;
    }
    
//    MoveToNextStage(){
//        
//        this.currentStage = this.currentStage.nextStage;
//    }
    
    AddStage(id,interactive = true){
        
        const $stage = this.scenario.GetScenarioStage(this,id);
        
        $stage.interactive = interactive;
        
        if(this.lastCreatedStage != undefined) this.lastCreatedStage.nextStage = $stage;
        
        this.stages.push($stage);
        
        this.lastCreatedStage = $stage;
        
        //console.log($stage);
        
        return $stage
    }
    
    GotoNextStage(stage){
        
        console.log("NEXT STAGE");
        console.log(this.scenario.scenarioOver);
        
        if(stage == undefined) console.warn("NextStage is undefined!!");
        
        const $ui = this.scenario.scenarioHandler.gameHandler.uiHandler;
        
        this.currentStage = stage;
        
        if(stage != undefined && !this.scenario.scenarioOver){ 
            
            //console.log("continuing");
            
            $ui.UpdateOutput("<br><br>");

            stage.EvalFlow();
        }
        
        if(this.scenario.scenarioOver){
            
            this.scenario.scenarioHandler.GotoNextScenario(this.scenario.nextScenario);
            
            console.warn(this.scenario.nextScenario);
        }
    }
}