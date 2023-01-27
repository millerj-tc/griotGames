import {uiHandler} from "./ui/ui.js";
import {RunTournament} from "./systemUtils/runTournament.js";
import {cardScenarioHandler} from "./cardScenarios/cardScenarioHandler.js";
import {gridDOMHandler} from "./ui/gridDOMHandler.js";
import {CreateElement} from "./ui/ui.js";


export class gameHandler
{
    constructor(){
        
        this.uiHandler = new uiHandler(this);

        this.cardScenarioHandler = new cardScenarioHandler(this);        
        
    }
    
    Start(){
        
        const t = CreateElement
        
        window.addEventListener("keydown", function(event) {

            if (event.code === "KeyT"){
                
                RunTournament();

            }
        });

    }
}