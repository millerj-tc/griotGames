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
