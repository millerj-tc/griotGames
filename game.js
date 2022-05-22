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
            
        const $vala = this.scenarioHandler.SH.AddStage("valakut0");
        
        console.log()
        
        $vala._HighestValueWin(this.scenarioEvaluator.valakut.characters,"power");
    }
}