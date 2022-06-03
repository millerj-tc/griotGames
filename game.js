import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenarioHandler.js";
import {initializeCloneCrisisScenarioPlus} from "./Clone Crisis Code/cloneCrisisScenarioPlus.js";

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
        
        const $scen0 = this.scenarioHandler.AddScenario("scen0");
        this.scenarioHandler.GotoNextScenario($scen0);
        

        if(this.newGamePlus){
            
            $loc = this.scenarioHandler.currentScenario.locationHandler.AddLocation("location","",5,"C8E3D4");
            $loc.displayName = "";
            initializeCloneCrisisScenarioPlus();
        }

    
    }
    
    OfferSubmissionLinkAfterXRuns(){
        
        //console.log(this.simulationCount);
        
        if(this.simulationCount >= this.submissionRunsUntilOfferLink){
            
            if(this.scenarioHandler.currentScenario.scenarioOver){
            
                this.uiHandler.NewStageOutputDiv("You may submit a roster to this link to have your solution compete with other participants " + this.submissionLink + "<br><br>After you submit, there may be an additional level of the simulation you can try to solve. However, you can only submit your roster for this level once.");
                
            }
        }
    }
    
    ResetGameOnSimulationRun(){
        
        this.simulationCount++;
        
        //this._RemoveUnslottedCharacters();
        
        //this._RestoreRemovedChars();
        
        //this.scenarioHandler.currentScenario.scenarioOver = false;
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