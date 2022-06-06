import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenarioHandler.js";
import {initializeCloneCrisisEasyStages,initializeCloneCrisisEasyLocations,initializeCloneCrisisEasyScenarioFx} from "./Clone Crisis Code/cloneCrisisScenario.js";
import {initializeCloneCrisisPlusLocations, initializeCloneCrisisPlusStages,initializeCloneCrisisPlusScenarioFx,initializeCloneCrisisPlus1Locations, initializeCloneCrisisPlus1Stages,initializeCloneCrisisPlus1ScenarioFx} from "./Clone Crisis Code/cloneCrisisPrepScenario.js";
import {RunTournament} from "./runTournament.js";

export class gameHandler
{
    constructor(){
        
        this.database = new database(this);
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        this.simulationCount = 0;
        this.submissionRunsUntilOfferLink = 5;
        this.submissionLink;
        
        this.newGamePlus = false;
        
        //this.locationHandler = new locationHandler(this);
        
        
    }
    
    Start(){
        
        this.scenarioHandler.LoadAllGameChars();
        
        
        if(this.newGamePlus){
            
            const $scen0 = this.scenarioHandler.AddScenario("scen0");
            
            $scen0.initLocations = initializeCloneCrisisPlusLocations;
        
            $scen0.initStages = initializeCloneCrisisPlusStages;
        
            $scen0.initScenarioFx = initializeCloneCrisisPlusScenarioFx;
            
            const $scen1 = this.scenarioHandler.AddScenario("scen1");
            
            $scen1.initLocations = initializeCloneCrisisPlus1Locations;
        
            $scen1.initStages = initializeCloneCrisisPlus1Stages;
        
            $scen1.initScenarioFx = initializeCloneCrisisPlus1ScenarioFx;
            
            this.scenarioHandler.GotoScenario($scen0);
        }
        
        else{
            
            const $scen0 = this.scenarioHandler.AddScenario("scen0");
            
            $scen0.initLocations = initializeCloneCrisisEasyLocations;
        
            $scen0.initStages = initializeCloneCrisisEasyStages;
        
            $scen0.initScenarioFx = initializeCloneCrisisEasyScenarioFx;
            
            this.scenarioHandler.GotoScenario($scen0);
        }
        
        
        document.getElementById("output").innerHTML = "";
        
        window.addEventListener("keydown", function(event) {

            if (event.code === "KeyT"){
                
                RunTournament();

            }
        });
    }
    
    OfferSubmissionLinkAfterXRuns(){
        
        if(this.simulationCount >= this.submissionRunsUntilOfferLink){
            
            console.log(this.scenarioHandler.currentScenario);
            
            if(this.scenarioHandler.currentScenario.scenarioOver){
                
                this.uiHandler.NewStageOutputDiv("You may submit a roster to this link to have your solution compete with other participants " + this.submissionLink + "<br><br>After you submit, there may be an additional difficulty level of the simulation you can try to solve. However, you can only submit your roster for this difficulty level once.");
                
            }
        }
    }
    
    ResetGameOnSimulationRun(){
        
        this.simulationCount++;
    }
    
    _RestoreRemovedChars(){
        
        for(const loc of this.scenarioHandler.currentScenario.locationHandler.locations){
            
            for(const slot of loc.charSlots){
                
                if(slot.character != null) slot.character.removedDuringRun = false;
            }
        }
    }
    
    _RemoveUnslottedCharacters(){
        
        for(const loc of this.scenarioHandler.currentScenario.locationHandler.locations){
            
            loc.unslottedChars = [];
        }
    }
}