import {cloneCrisisPrepStage} from "./cloneCrisisPrepStage.js";
import {cloneCrisisNewGamePlusStage} from "./cloneCrisisNewGamePlusStage.js";

export function initializeCloneCrisisPlusLocations(scenario){
    
    scenario.usesLocationAssignment = false;
    
    const $loc = scenario.locationHandler.AddLocation("location","",3,"C8E3D4");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlusStages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage0;
    
    const $loc0 = scenario.stageHandler.AddStage("loc0");
        
    $loc0.location = scenario.locationHandler.GetLocationById("location");
    
    $loc0.stageHeader = "NEW YORK";
    
    const $daredevilObj = GH.database.GetObjFromString("Daredevil");
    
    $daredevilObj.openingLine = `"Well this is an interesting problem indeed, isn't it Jessica?"`;
    
    const $jessicaJObj = GH.database.GetObjFromString("Jessica Jones");
    
    $jessicaJObj.openingLine = `"I'm not nearly drunk enough for this Red. Someone explain in ten words or less or I start punching."`;
    
    $loc0.npcs = [$daredevilObj,$jessicaJObj];
    
    $loc0.stalemateText = "The story continues in New York...";
    
}

function GetScenarioStage0(stageHandler,id){
     
    return new cloneCrisisPrepStage(stageHandler,id);
}
    
export function initializeCloneCrisisPlusScenarioFx(scenario){
    
    
}

export function initializeCloneCrisisPlus1Locations(scenario){
    
    scenario.usesLocationAssignment = false;
    
    const $loc = scenario.locationHandler.AddLocation("location","",3,"C8E3D4");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlus1Stages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage1;
    
    const $loc0 = scenario.stageHandler.AddStage("loc0");
        
    $loc0.location = scenario.locationHandler.GetLocationById("location");
    
    $loc0.stageHeader = "NEW YORK Part 2";
    
    const $grObj = GH.database.GetObjFromString("Ghostrider");
    
    $grObj.openingLine = `"I'm GHOSTRIDER!"`;
    
    const $punisherObj = GH.database.GetObjFromString("Punisher");
    
    $punisherObj.openingLine = `"This weird thing will not leave me the FUCK alone and I can't seem to kill it. What's going on now?"`;
    
    $loc0.npcs = [$grObj,$punisherObj];
    
    $loc0.stalemateText = "The story continues in Wakanda...";

}

function GetScenarioStage1(stageHandler,id){
     
    return new cloneCrisisPrepStage(stageHandler,id);
}
    
export function initializeCloneCrisisPlus1ScenarioFx(scenario){
    
    
}

export function initializeCloneCrisisPlus2Locations(scenario){
    
    scenario.usesLocationAssignment = false;
    
    const $loc = scenario.locationHandler.AddLocation("location","",3,"C8E3D4");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlus2Stages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage1;
    
    const $loc0 = scenario.stageHandler.AddStage("loc0");
        
    $loc0.location = scenario.locationHandler.GetLocationById("location");
    
    $loc0.stageHeader = "Wakanda";
    
    const $bpObj = GH.database.GetObjFromString("Black Panther");
    
    $bpObj.openingLine = `"We have no place in Wakanda for nefarious clones. Explain yourselves!"`;
    
    const $okoyeObj = GH.database.GetObjFromString("Okoye");
    
    $okoyeObj.openingLine = `"My King, I am very skeptical about this conflict..."`;
    
    $loc0.npcs = [$bpObj,$okoyeObj];

}

function GetScenarioStage2(stageHandler,id){
     
    return new cloneCrisisPrepStage(stageHandler,id);
}
    
export function initializeCloneCrisisPlus2ScenarioFx(scenario){
    
    
}

export function initializeCloneCrisisPlus3Locations(scenario){
    
    scenario.usesLocationAssignment = false;
    
    const $loc = scenario.locationHandler.AddLocation("location","",5,"C8E3D4");
    $loc.displayName = "";
}

export function initializeCloneCrisisPlus3Stages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage3;
    
    const $loc2 = scenario.stageHandler.AddStage("loc2");

    $loc2.location = scenario.locationHandler.GetLocationById("location");

    $loc2.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc3 = scenario.stageHandler.AddStage("loc3");

    $loc3.location = scenario.locationHandler.GetLocationById("location");

    $loc3.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc4 = scenario.stageHandler.AddStage("loc4");

    $loc4.location = scenario.locationHandler.GetLocationById("location");

    $loc4.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc5 = scenario.stageHandler.AddStage("loc5");

    $loc5.location = scenario.locationHandler.GetLocationById("location");

    $loc5.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc6 = scenario.stageHandler.AddStage("loc6");

    $loc6.location = scenario.locationHandler.GetLocationById("location");

    $loc6.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc7 = scenario.stageHandler.AddStage("loc7");

    $loc7.location = scenario.locationHandler.GetLocationById("location");

    $loc7.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

    const $loc8 = scenario.stageHandler.AddStage("loc8");

    $loc8.location = scenario.locationHandler.GetLocationById("location");

    $loc8.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";
    
    const $loc9 = scenario.stageHandler.AddStage("loc8");

    $loc9.location = scenario.locationHandler.GetLocationById("location");

    $loc9.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";
    
    const $loc10 = scenario.stageHandler.AddStage("loc8");

    $loc10.location = scenario.locationHandler.GetLocationById("location");

    $loc10.winText = "[winners names] [[pursues/pursue]] the fleeing [specialOutputGroup0 names]!";

}

function GetScenarioStage3(stageHandler,id){
     
    return new cloneCrisisNewGamePlusStage(stageHandler,id);
}
    
export function initializeCloneCrisisPlus3ScenarioFx(scenario){
    
    
}

