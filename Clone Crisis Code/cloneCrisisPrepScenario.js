import {cloneCrisisPrepStage} from "./cloneCrisisPrepStage.js";

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
    
    $daredevilObj.openingLine = `"I'm DAREDEVIL!"`;
    
    const $jessicaJObj = GH.database.GetObjFromString("Jessica Jones");
    
    $jessicaJObj.openingLine = "Don't mind my friend, he's a bit stupid. What's going on?";
    
    $loc0.npcs = [$daredevilObj,$jessicaJObj];
    
    $loc0.winText = "[winners names] recruit Daredevil!";
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
    
    $loc0.stageHeader = "NEW YORK";
    
    const $grObj = GH.database.GetObjFromString("Ghostrider");
    
    $loc0.npcs = [$grObj];
    
    $grObj.openingLine = "I'M GHOSTRIDER";
    
    //$loc0.winText = "[winners names] recruit Daredevil!";
}

function GetScenarioStage1(stageHandler,id){
     
    return new cloneCrisisPrepStage(stageHandler,id);
}
    
export function initializeCloneCrisisPlus1ScenarioFx(scenario){
    
    
}
