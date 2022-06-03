export function initializeCloneCrisisScenarioPlus()
{
    const GH = window.gameHandler;
    
    const $loc0 = GH.scenarioHandler.stageHandler.AddStage("loc0");
        
    $loc0.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc0.stageHeader = "NEW YORK";
    
    $loc0.NPC = GH.database.GetObjFromString("Jessica Jones");
    
    $loc0.NPC.openingLine = `"Wow you all are really having at it, huh? One of these teams is the clones and one is... not? Did either of you bring any whiskey, by chance?"`;
    
    $loc0.winText = "[specialOutputGroup0 names] [[flees/flee]] to Wakanda, with [winners names] in hot pursuit!";
    
    $loc0.stalemateText = "A stalemate! The battle continues in Wakanda!";
    
    const $loc01 = GH.scenarioHandler.stageHandler.AddStage("loc01");
        
    $loc01.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc01.stageHeader = "On the way to Wakanda...";
    
    $loc01.NPC = GH.database.GetObjFromString("Punisher");
    
    $loc01.NPC.openingLine = `"Jones called me. Told me something strange was happening. What the hell is wrong with you all?"`;
    
    $loc01.winText = "[specialOutputGroup0 names] [[flees/flee]] continue on to Wakanda, with [winners names] in hot pursuit!";
    
    $loc01.stalemateText = "A stalemate! The battle continues in Wakanda!";
    
    const $loc1 = GH.scenarioHandler.stageHandler.AddStage("loc1");
}