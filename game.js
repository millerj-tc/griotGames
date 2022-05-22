import {scenarioEvaluator} from "./scenario0.js";
import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenario.js";
import {locationHandler} from "./location.js";

export class gameHandler
{
    constructor(){
        
        this.database = new database(this);
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        this.locationHandler = new locationHandler(this);
        
        
    }
    
    Start(){
        
        this.scenarioHandler.CH.AddFunctionsToCharacters();
        
        const $vala = this.locationHandler.AddLocation("valakut","/images/valakut.png");
        
        $vala.AddChar("Umezawa","left");
        
        $vala.AddChar("Thalia","left");
        
        $vala.AddChar("Nissa","right");
        
        $vala.AddChar("Gideon","right");
            
        const $vala0 = this.scenarioHandler.SH.AddStage("valakut0");
        
        $vala0.winText = "[names] braves the fires of Valakut, gaining valuable intelligence."
        
        $vala0.location = this.locationHandler.GetLocationById("valakut");
        
        console.log($vala0.GetDisplayText($vala.chars,"power"));
    
    }
}