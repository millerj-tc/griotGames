export function initializeCloneCrisisScenario()
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
    
    
    // -- Must explicitly set here so that $loc01 is not set to nextStage for $loc0
    $loc0.nextStage = $loc1;
        
    $loc1.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc1.stageHeader = "WAKANDA";
    
    $loc1.NPC = GH.database.GetObjFromString("Black Panther");
    
    $loc1.NPC.openingLine = `"So you have brought another one of your messes to my country's doorstep X-Men? I shall sort this out quickly for you. The allies of Wakanda are allies of mine."`;
    
    $loc1.winText = "[specialOutputGroup0 names] flee! [winners names] give chase!";
    
    const $loc2 = GH.scenarioHandler.stageHandler.AddStage("loc2");
        
    $loc2.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc2.winText = "[specialOutputGroup0 names] flee! [winners names] give chase!";
    
    const $loc3 = GH.scenarioHandler.stageHandler.AddStage("loc3");
        
    $loc3.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc3.winText = "[specialOutputGroup0 names] flee! [winners names] give chase!";
    
    const $loc4 = GH.scenarioHandler.stageHandler.AddStage("loc4");
        
    $loc4.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc4.winText = "[specialOutputGroup0 names] flee! [winners names] give chase!";
    
    const $loc5 = GH.scenarioHandler.stageHandler.AddStage("loc5");
        
    $loc5.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc5.winText = "[specialOutputGroup0 names] flee! [winners names] give chase!";
    
    const $loc6 = GH.scenarioHandler.stageHandler.AddStage("loc6");
        
    $loc6.location = GH.scenarioHandler.locationHandler.GetLocationById("location");
    
    $loc6.winText = "[specialOutputGroup0 names] flee! [winners names] give chase!";
    
    ///
    
    const $punisherAltStageFx = GH.scenarioHandler.AddScenarioFx(1,"stageSelect");
    
    const $loc0StageFx0 = $loc0.stageFxHandler.AddFx($punisherAltStageFx,"complete");
    
    $loc0StageFx0.AddRequiredCond(UndecidedNPCCond);
    
    $punisherAltStageFx.targetStage = $loc0;
    
    $punisherAltStageFx.newNextStage = $loc01;
    
}

function UndecidedNPCCond(evalObj){
    
    if(evalObj.hasOwnProperty("npc") && evalObj.npc.alignment == null) return true
}