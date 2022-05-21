// when someone is debuffed, add a line about why they are not there that gives clue to how they were debuffed

// eval steps: evaluate hope, evaluate debuffs, evaluate

// make a "side switch"/betrayal call out between stages as well as a chars "refuse to participate" message

// make victory message display after all others

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