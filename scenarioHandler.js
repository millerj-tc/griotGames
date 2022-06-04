import {scenario} from "./scenario.js";

export class scenarioHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.scenarios = [];
        this.gameCharInstances = [];
        this.lastCreatedScenario = undefined;
        this.currentScenario;
    }
    
    AddScenario(id){
        
        const $scenario = new scenario(this,id);
        
        if(this.lastCreatedScenario != undefined) {
            $scenario.previousScenario = this.lastCreatedScenario;
            this.lastCreatedScenario.nextScenario = $scenario;
        }
        
        this.scenarios.push($scenario);
        
        if(this.scenarios.length == 1) this.currentScenario = $scenario
        
        this.lastCreatedScenario = $scenario;
        
        return $scenario
    }
    
    GotoNextScenario(scenario){
        
        if(scenario == undefined) return;
        
        scenario.savedLocCharSlots = this.currentScenario.savedLocCharSlots;
        
        this.currentScenario = scenario;
        
        if(scenario != undefined && !this.gameHandler.gameOver){ 

            scenario.ScenarioPrep();
        }
    }
    
    LoadAllGameChars(){
        
        for(const obj of this.gameHandler.database.data){
            
            if(obj.dataType != "char") continue
            
            this.gameCharInstances.push({...obj});
        }
    }
}