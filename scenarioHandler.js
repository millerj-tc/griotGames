import {scenario} from "./scenario.js";
import {charHandler} from "./character.js";

export class scenarioHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.charHandler = new charHandler(this);
        
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
                
        console.log(scenario);
        
        if(scenario == undefined || this.gameHandler.gameOver) return;
        
        this.gameHandler.uiHandler.storedOutputDivs = [];
        
        if(this.currentScenario != null && this.currentScenario.hasOwnProperty("nextScenario") && scenario == this.currentScenario.nextScenario){
           
            if(this.currentScenario.savedLocCharSlots.length == 0) console.warn("SCENARIO LOCATION CHAR SLOTS WERE NOT SAVED CORRECTLY -- REWIND MAY FAIL");
            
            scenario.savedLocCharSlots = this.currentScenario.savedLocCharSlots;
            
        }

        this.currentScenario = scenario;
            
        this.currentScenario.ScenarioPrep();
        
        
        
    }
    
    GetGameChar(name){
        
        for(const obj of this.gameHandler.database.data){
            
            if(obj.dataType == "char" && obj.name == name) return obj
        }
    }
    
    LoadAllGameChars(){
        
        for(const obj of this.gameHandler.database.data){
            
            if(obj.dataType != "char") continue
            
            this.gameCharInstances.push({...obj});
        }
        
        this.charHandler.AddGenericPropertiesToCharacters(this.gameCharInstances);
    }
}