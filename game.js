import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenario.js";
import {initializeCloneCrisisScenario} from "./Clone Crisis Code/cloneCrisisScenario.js";

export class gameHandler
{
    constructor(){
        
        this.database = new database(this);
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        //this.locationHandler = new locationHandler(this);
        
        
    }
    
    Start(){
        
        // DEPRECATING RESIZE CODE FOR NOW
        
        //window.addEventListener("resize", this.uiHandler.ResizeOnResize);
        
        //this.uiHandler.ResizeOnResize();
        
        
            
        this.uiHandler.CreateLocationTable();
        
        const $loc = this.scenarioHandler.locationHandler.AddLocation("location","",3,"C8E3D4");
        $loc.displayName = "";
        
        initializeCloneCrisisScenario();
        
        this.uiHandler.CreateEvalGoButton();
        
        this.uiHandler._CreateCollapseButton();
        
        this.scenarioHandler.charHandler.AddFunctionsToCharacters();
        
//        for(const char of this.scenarioHandler.GetAllChars()){
//            
//            intializeInterpersRelationships(char);
//        }
        
        this.scenarioHandler.locationHandler.RandomizeStartingTeams();
        
        this.uiHandler.ClearOutput();
        
        this.uiHandler.ExpandRosterDisplay();
        
        //this.scenarioHandler.rightTeamHope = 1;
        
        
    
    }
    
    ResetGameOnSimulationRun(){
        
        this._RemoveUnslottedCharacters();
        
        this._RestoreRemovedChars();
        
        this.scenarioHandler.gameOver = false;
    }
    
    _RestoreRemovedChars(){
        
        for(const loc of this.scenarioHandler.locationHandler.locations){
            
            for(const slot of loc.charSlots){
                
                if(slot.character != null) slot.character.removedDuringRun = false;
            }
        }
    }
    
    _RemoveUnslottedCharacters(){
        
        for(const loc of this.scenarioHandler.locationHandler.locations){
            
            loc.unslottedChars = [];
        }
    }
}