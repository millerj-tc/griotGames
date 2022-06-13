import {uiHandler} from "./ui.js";
import {database} from "./database.js";
import {scenarioHandler} from "./scenarioHandler.js";
import {initializeCloneCrisisEasyStages,initializeCloneCrisisEasyCardZones,initializeCloneCrisisEasyScenarioFx} from "./Clone Crisis Code/cloneCrisisScenario.js";
import {initializeCloneCrisisPlusCardZones, initializeCloneCrisisPlusStages,initializeCloneCrisisPlusScenarioFx,initializeCloneCrisisPlus1CardZones, initializeCloneCrisisPlus1Stages,initializeCloneCrisisPlus1ScenarioFx,initializeCloneCrisisPlus2CardZones, initializeCloneCrisisPlus2Stages,initializeCloneCrisisPlus2ScenarioFx,initializeCloneCrisisPlus3CardZones, initializeCloneCrisisPlus3Stages,initializeCloneCrisisPlus3ScenarioFx} from "./Clone Crisis Code/cloneCrisisPrepScenario.js";
import {RunTournament} from "./runTournament.js";
import {AddCloneCrisisSpecificCharProps} from "./Clone Crisis Code/cloneCrisisCharProps.js";

export class gameHandler
{
    constructor(){
        
        this.database = new database(this);
        
        this.uiHandler = new uiHandler(this);
        
        this.scenarioHandler = new scenarioHandler(this);
        
        this.simulationCount = 0;
        this.choiceCount = 0;
        this.choiceCountUntilOfferSubmissionLink = 8;
        
        this.newGamePlus = false;
        
        //this.cardZoneHandler = new cardZoneHandler(this);
        
        
    }
    
    Start(){
        
        this.scenarioHandler.LoadAllGameChars();
        
        AddCloneCrisisSpecificCharProps(this.scenarioHandler.gameCharInstances);
        
        if(this.newGamePlus){
            
            const $scen0 = this.scenarioHandler.AddScenario("scen0");
            
            $scen0.initCardZones = initializeCloneCrisisPlusCardZones;
        
            $scen0.initStages = initializeCloneCrisisPlusStages;
        
            $scen0.initScenarioFx = initializeCloneCrisisPlusScenarioFx;
            
            const $scen1 = this.scenarioHandler.AddScenario("scen1");
            
            $scen1.initCardZones = initializeCloneCrisisPlus1CardZones;
        
            $scen1.initStages = initializeCloneCrisisPlus1Stages;
        
            $scen1.initScenarioFx = initializeCloneCrisisPlus1ScenarioFx;
            
            const $scen2 = this.scenarioHandler.AddScenario("scen2");
            
            $scen2.initCardZones = initializeCloneCrisisPlus2CardZones;
        
            $scen2.initStages = initializeCloneCrisisPlus2Stages;
        
            $scen2.initScenarioFx = initializeCloneCrisisPlus2ScenarioFx;
            
            this.scenarioHandler.GotoScenario($scen0);
            
            const $scen3 = this.scenarioHandler.AddScenario("scen3");
            
            $scen3.initCardZones = initializeCloneCrisisPlus3CardZones;
        
            $scen3.initStages = initializeCloneCrisisPlus3Stages;
        
            $scen3.initScenarioFx = initializeCloneCrisisPlus3ScenarioFx;
            
            this.scenarioHandler.GotoScenario($scen0);
        }
        
        else{
            
            const $scen0 = this.scenarioHandler.AddScenario("scen0");
            
            $scen0.initCardZones = initializeCloneCrisisEasyCardZones;
        
            $scen0.initStages = initializeCloneCrisisEasyStages;
        
            $scen0.initScenarioFx = initializeCloneCrisisEasyScenarioFx;
            
            this.scenarioHandler.GotoScenario($scen0);
        }
        
        
        document.getElementById("output").innerHTML = "";
        
        window.addEventListener("keydown", function(event) {

            if (event.code === "KeyT"){
                
                RunTournament();

            }
        });

    }
    
    ResetGameOnSimulationRun(){
        
        this.simulationCount++;
    }
    
    _RestoreRemovedChars(){
        
        for(const loc of this.scenarioHandler.currentScenario.cardZoneHandler.cardZones){
            
            for(const slot of loc.charSlots){
                
                if(slot.character != null) slot.character.removedDuringRun = false;
            }
        }
    }
    
    _RemoveUnslottedCharacters(){
        
        for(const loc of this.scenarioHandler.currentScenario.cardZoneHandler.cardZones){
            
            loc.unslottedChars = [];
        }
    }
    
    EndGame(){
        
        this._OfferSubmissionLinkAfterXRuns();
    }
    
    _OfferSubmissionLinkAfterXRuns(){
        
        if(this.choiceCount >= this.choiceCountUntilOfferSubmissionLink){
            
            if(!this.newGamePlus){
                    
                this.uiHandler.NewStageOutputDiv("You may submit a roster to <a href='https://forms.gle/tHWHMmcnowk43fxS6' target='_blank' rel='noopener noreferrer'>this link</a> to have your solution compete with other participants. <br><br>After you submit, there may be an additional difficulty level of the simulation you can try to solve. However, you can only submit your roster for this difficulty level once.");
            }
            
            else{
                
                this.uiHandler.NewStageOutputDiv("You may submit a roster to <a href='https://forms.gle/fCJL7KMQxiYrALp46' target='_blank' rel='noopener noreferrer'>this link</a> to have your solution compete with other participants.");
            }
                
            
        }
    }
}