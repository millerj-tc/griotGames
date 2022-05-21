import {locationHandler} from "./location.js";
import {stageHandler} from "./stage.js";
import {charHandler} from "./character.js";

export class scenarioHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.LH = new locationHandler(this);
        this.SH = new stageHandler(this);
        this.CH = new charHandler(this);
        
        
    }
}