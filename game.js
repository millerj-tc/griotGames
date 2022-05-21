import {scenarioEvaluator} from "./scenario0.js";
import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenario.js";

export class gameHandler
{
    constructor(){
        
        this.database = new database(this);
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        this.scenarioEvaluator = new scenarioEvaluator(this);
        
        
    }
    
    Start(){
        
        this.uiHandler.CreateLocationTable();
        
        this.uiHandler.CreateLocationRow("valakut",2);
        
        this.uiHandler.UpdateSelectorsAndCharImages();
        
        //this.scenarioEvaluator.GetGreatestPerCardValue("power",this.database.GetObjFromString("Ajani"),this.database.GetObjFromString("Chandra"));
        
        this.scenarioEvaluator.EvaluateBattleForValakut();
    }
}