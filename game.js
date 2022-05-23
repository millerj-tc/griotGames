import {scenarioEvaluator} from "./scenario0.js";
import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenario.js";
import {initializeArtbreederScenario0} from "./artbreederScenario0.js";

export class gameHandler
{
    constructor(){
        
        this.database = new database(this);
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        //this.locationHandler = new locationHandler(this);
        
        
    }
    
    Start(){
        
        //this.database.ModData();
            
        this.uiHandler.CreateLocationTable();
        
        const $sanc = this.scenarioHandler.locationHandler.AddLocation("sanctuary","/images/artbreeder/sanctuary-250.png",2);
        $sanc.displayName = "Sanctuary of Time";
        
        const $spires = this.scenarioHandler.locationHandler.AddLocation("spires","/images/artbreeder/spires-250.png",2);
        $spires.displayName = "The Spires of Light";
        
        const $xora = this.scenarioHandler.locationHandler.AddLocation("xora","/images/artbreeder/xora-250.png",1);
        $xora.displayName = "Xora, the Cataclysmed Kingdom";
        
        initializeArtbreederScenario0();
        
        this.uiHandler.CreateEvalGoButton();
        
        this.scenarioHandler.charHandler.AddFunctionsToCharacters();
        
        this.scenarioHandler.locationHandler.RandomizeStartingTeams();
        
        this.scenarioHandler.rightTeamHope = 1;
        
        
    
    }
}