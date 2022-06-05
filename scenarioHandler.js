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
    
    GotoScenario(scenario){
        
        console.error("WHAT IF YOU PUSH UNLOCKED CHARS TO AN ARRAY HELD BY THE SCENARIO THAT GETS RESET EVERYTIME YOU RUN IT BUT NOT WHEN YOU SWITCH SCENARIOS?";)
        
        if(scenario == undefined) return;
        
        if(this.currentScenario != null && this.currentScenario.hasOwnProperty("nextScenario)" && scenario == this.currentScenario.nextScenario)){
           
            if(this.currentScenario.savedLocCharSlots.length == 0) console.warn("SCENARIO LOCATION CHAR SLOTS WERE NOT SAVED CORRECTLY -- REWIND MAY FAIL");

            scenario.savedLocCharSlots = this.currentScenario.savedLocCharSlots;
            
        }
        
        this.currentScenario.runCount = 0;
        
        this.currentScenario = scenario;
        
        if(scenario != undefined && !this.gameHandler.gameOver){ 

            if(scenario.runCount == 0) {scenario.ScenarioPrep();console.log("prepping")}
            else scenario.ScenarioRun();
        }
    }
    
    LoadAllGameChars(){
        
        for(const obj of this.gameHandler.database.data){
            
            if(obj.dataType != "char") continue
            
            this.gameCharInstances.push({...obj});
        }
    }
}