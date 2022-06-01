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
        $loc.displayName = "BATTLE";
        
        initializeCloneCrisisScenario();
        
        this.uiHandler.CreateEvalGoButton();
        
        this.uiHandler._CreateCollapseButton();
        
        this.scenarioHandler.charHandler.AddFunctionsToCharacters();
        
//        for(const char of this.scenarioHandler.GetAllChars()){
//            
//            intializeInterpersRelationships(char);
//        }
        
        this.scenarioHandler.locationHandler.RandomizeStartingTeams();
        
        //this.scenarioHandler.rightTeamHope = 1;
        
        
    
    }
}