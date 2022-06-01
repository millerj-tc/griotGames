export function initializeCloneCrisisScenario()
{
    const GH = window.gameHandler;
    
    const $loc0 = GH.scenarioHandler.stageHandler.AddStage("loc0");
        
    $loc0.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc0.NPC = GH.database.GetObjFromString("Daredevil");
    
}