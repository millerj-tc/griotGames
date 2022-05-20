import {scenarioEvaluator} from "./scenario0.js";
import {uiHandler} from "./ui.js";
import {database} from "./database.js";

export class gameHandler
{
    constructor(){
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioEvaluator = new scenarioEvaluator(this);
        
        this.database = new database(this);
    }
    
    Start(){
        
        this.uiHandler.CreateLocationTable();
        
        this.uiHandler.CreateLocationRow("valakut",2);
        
        this.uiHandler.UpdateSelectorsAndCharImages();
        
        this.scenarioEvaluator.GetGreatestPerCardValue("power",this.database.GetObjFromString("Ajani"),this.database.GetObjFromString("Chandra"));
    }
}