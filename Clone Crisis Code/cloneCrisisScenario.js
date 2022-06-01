export function initializeCloneCrisisScenario()
{
    const GH = window.gameHandler;
    
    GH.scenarioHandler.usesLocationAssignment = false;
    
    const $loc0 = GH.scenarioHandler.stageHandler.AddStage("loc0");
        
    $loc0.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc0.stageHeader = "NEW YORK";
    
    $loc0.NPC = GH.database.GetObjFromString("Jessica Jones");
    
    $loc0.NPC.openingLine = `"Wow you all are really having at it, huh? One of these teams is the clones and one is... not? Did either of you bring any whiskey, by chance?"`;
    
    const $loc1 = GH.scenarioHandler.stageHandler.AddStage("loc1");
        
    $loc1.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc1.stageHeader = "WAKANDA";
    
    $loc1.NPC = GH.database.GetObjFromString("Black Panther");
    
    $loc1.NPC.openingLine = `"So you have brought another one of your messes to my country's doorstep X-Men? I shall sort this out quickly for you. The allies of Wakanda are allies of mine."`;
    
    const $loc2 = GH.scenarioHandler.stageHandler.AddStage("loc2");
        
    $loc2.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    const $loc3 = GH.scenarioHandler.stageHandler.AddStage("loc2");
        
    $loc3.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    const $loc4 = GH.scenarioHandler.stageHandler.AddStage("loc2");
        
    $loc4.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    const $loc5 = GH.scenarioHandler.stageHandler.AddStage("loc2");
        
    $loc5.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    const $loc6 = GH.scenarioHandler.stageHandler.AddStage("loc2");
        
    $loc6.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
}