import {scenarioEvaluator} from "./scenario0.js";
import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenario.js";
import {initializeMagicScenario0} from "./magicScenario0.js";

export class gameHandler
{
    constructor(){
        
        this.database = new database(this);
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        //this.locationHandler = new locationHandler(this);
        
        
    }
    
    Start(){
        
        this.database.ModData();
        
//        console.table(this.database.data);
//        
//        this.uiHandler.CreateLocationTable();
//        
//        const $vala = this.scenarioHandler.locationHandler.AddLocation("valakut","/images/valakut.png",2);
//        
//        const $urbo = this.scenarioHandler.locationHandler.AddLocation("urborg","/images/urborg.png",2);
//        
//        const $vesu = this.scenarioHandler.locationHandler.AddLocation("vesuva","/images/vesuva.png",1);
//        
//        initializeMagicScenario0();
//        
//        this.uiHandler.CreateEvalGoButton();
//        
//        this.scenarioHandler.charHandler.AddFunctionsToCharacters();
        
        
        
        
        
        
    
    }
}