export function initializeCloneCrisisScenarioPlus()
{
    const GH = window.gameHandler;
    
    const $loc0 = GH.scenarioHandler.stageHandler.AddStage("loc0");
        
    $loc0.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc0.stageHeader = "NEW YORK";
    
    $loc0.NPC = GH.database.GetObjFromString("Daredevil");
    
    $loc0.NPC.openingLine = `"I'm DAREDEVIL!"`;
    
    $loc0.winText = "[winners names] recruit Daredevil!";
    
    ///
    
    const $moveToInteractive = GH.scenarioHandler.AddScenarioFx(1,"moveToInteractivePhase");
    
    const $loc0StageFx0 = $loc0.stageFxHandler.AddFx($moveToInteractive,"complete");
}