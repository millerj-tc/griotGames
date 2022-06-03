import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenarioHandler.js";
import {initializeCloneCrisisScenario} from "./Clone Crisis Code/cloneCrisisScenario.js";
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
        
        const $scen0 = this.scenarioHandler.AddScenario("scen0");
        
        this.scenarioHandler.usesLocationAssignment = false;
            
        this.uiHandler.CreateLocationTable();
        
        let $loc;

        if(this.newGamePlus){ 
                //console.log("NEW GAME PLUS");
            
            $loc = this.scenarioHandler.currentScenario.locationHandler.AddLocation("location","",5,"C8E3D4");
            $loc.displayName = "";
            initializeCloneCrisisScenarioPlus();
        }
        else{
            //console.log("nope");
            
            $loc = this.scenarioHandler.currentScenario.locationHandler.AddLocation("location","",3,"C8E3D4");
            $loc.displayName = "";
           initializeCloneCrisisScenario();
        } 
        
        this.uiHandler.CreateLocationRows();
        
        this.uiHandler.CreateEvalGoButton();
        
        this.uiHandler._CreateCollapseButton();
        
        this.uiHandler.CreateLockButton();
        
        this.uiHandler.SetRosterCollapsibleCoords();
        
        this.scenarioHandler.currentScenario.charHandler.AddFunctionsToCharacters();
        
//        for(const char of this.scenarioHandler.GetAllChars()){
//            
//            intializeInterpersRelationships(char);
//        }
        
        this.scenarioHandler.currentScenario.locationHandler.RandomizeStartingTeams();
        
        this.uiHandler.ClearOutput();
        
        this.uiHandler.ExpandRosterDisplay();
        
        //this.scenarioHandler.rightTeamHope = 1;
        
        
    
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
        
        this._RemoveUnslottedCharacters();
        
        this._RestoreRemovedChars();
        
        this.scenarioHandler.currentScenario.scenarioOver = false;
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