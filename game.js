import {uiHandler} from "./ui.js";
import {RunTournament} from "./runTournament.js";


export class gameHandler
{
    constructor(){
        
        this.uiHandler = new uiHandler(this);

        this.scenarioHandler = new scenarioHandler(this);

        this.choiceCount = 0;
        
        
    }
    
    Start(){

        
        window.addEventListener("keydown", function(event) {

            if (event.code === "KeyT"){
                
                RunTournament();

            }
        });

    }
}