export function initializeCloneCrisisScenario()
{
    const GH = window.gameHandler;
    
    const $loc0 = GH.scenarioHandler.stageHandler.AddStage("loc0");
        
    $loc0.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc0.NPC = GH.database.GetObjFromString("Jessica Jones");
    
    const $loc1 = GH.scenarioHandler.stageHandler.AddStage("loc1");
        
    $loc1.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc1.NPC = GH.database.GetObjFromString("Black Panther");
    
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