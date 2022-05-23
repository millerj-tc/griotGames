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
        
        //this.locationHandler = new locationHandler(this);
        
        
    }
    
    Start(){
        
        this.scenarioHandler.charHandler.AddFunctionsToCharacters();
        
        this.uiHandler.CreateLocationTable();
        
        const $vala = this.scenarioHandler.locationHandler.AddLocation("valakut","/images/valakut.png",2);
        
        const $urbo = this.scenarioHandler.locationHandler.AddLocation("urborg","/images/urborg.png",2);
        
        const $vesu = this.scenarioHandler.locationHandler.AddLocation("vesuva","/images/vesuva.png",1);
        
        //this.uiHandler.CreateLocationRow($vala.id,$vala.image,2);
        
//        $vala.AddChar("Umezawa","left");
//        
//        $vala.AddChar("Thalia","left");
//        
//        $vala.AddChar("Nissa","right");
//        
//        $vala.AddChar("Gideon","right");
            
        const $vala0 = this.scenarioHandler.stageHandler.AddStage("valakut0");
        
        $vala0.winText = "[names] braves the fires of Valakut, gaining valuable intelligence."
        
        $vala0.location = $vala;
        
        //console.log($vala0.GetDisplayText($vala.chars,"power"));
    
    }
}