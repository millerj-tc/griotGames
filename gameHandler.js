import {uiHandler} from "./ui/ui.js";
import {RunTournament} from "./systemUtils/runTournament.js";
import {cardScenarioHandler} from "./cardScenarios/cardScenarioHandler.js"


export class gameHandler
{
    constructor(){
        
        this.uiHandler = new uiHandler(this);

        this.cardScenarioHandler = new cardScenarioHandler(this);        
        
    }
    
    Start(){
        
        window.addEventListener("keydown", function(event) {

            if (event.code === "KeyT"){
                
                RunTournament();

            }
        });

    }
}