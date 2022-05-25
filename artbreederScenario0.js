export function initializeArtbreederScenario0()
{
    const GH = window.gameHandler;
    
    const $sanc0 = GH.scenarioHandler.stageHandler.AddStage("sanctuary0");
    
    $sanc0.evalValue = "charisma";
        
    $sanc0.winText = "[names] uses their connections to acquire a rare Temporal Medallion for the [alignment] team. They cast an entanglement spell to entrap the other team at the Spires of Light."
        
    $sanc0.location = GH.scenarioHandler.locationHandler.GetLocationById("sanctuary");
    
    const $spires0 = GH.scenarioHandler.stageHandler.AddStage("spires0");
    
    $spires0.evalValue = "spirit";
    
    //$sanc0.nextStage = $spires0;

    $spires0.winText = "[names] reignites the Spires of Light, bringing hope to many. The world is awed by the [alignment] team!"
        
    $spires0.location = GH.scenarioHandler.locationHandler.GetLocationById("spires");
    
    const $sanc1 = GH.scenarioHandler.stageHandler.AddStage("sanctuary1");
    
    $sanc1.evalValue = "power";
    
    $sanc1.winText = "[names] rescues the last remaining family of Time Koalas from a nefarious demon. The [alignment] team learns the secrets of the Sanctuary of Time from their cuddly new friends!";
    
    $sanc1.location = GH.scenarioHandler.locationHandler.GetLocationById("sanctuary");
    
    const $xora0 = GH.scenarioHandler.stageHandler.AddStage("xora0");
    
    $xora0.evalValue = "toughness";
        
    $xora0.winText = "[names] manages to cross the Field of Blades to release Xora's trapped star for the [alignment] team, restoring it to the night sky."
        
    $xora0.location = GH.scenarioHandler.locationHandler.GetLocationById("xora");
    
    const $sanc2 = GH.scenarioHandler.stageHandler.AddStage("sanc2");
    
    $sanc2.evalValue = "cunning";
        
    $sanc2.winText = "[names] gains access to the Sanctuary of Time, learning ancient rituals for the [alignment] team."
        
    $sanc2.location = GH.scenarioHandler.locationHandler.GetLocationById("sanctuary");
    
    const $spires1 = GH.scenarioHandler.stageHandler.AddStage("spires1");
    
    $spires1.evalValue = "speed";
        
    $spires1.winText = "[names] discovers a rare and forgotten medicinal herb deep within the dungeons of the Spires of Light. They also find a scroll of strengthening which they cast on their [alignment] team allies at Xora."
        
    $spires1.location = GH.scenarioHandler.locationHandler.GetLocationById("spires");
    
    const $xora1 = GH.scenarioHandler.stageHandler.AddStage("xora1");
    
    $xora1.evalValue = "spirit";
        
    $xora1.winText = "[names], of the [alignment] team, performs a ritual to remove the catacylsmic curse from Xora, restoring it as inhabitable land."
        
    $xora1.location = GH.scenarioHandler.locationHandler.GetLocationById("xora");
    
    ///
    
    const $sancWinCon = GH.scenarioHandler.AddScenarioFx(3);
    
    $sancWinCon.completeEffectOutputText = "[names] uncover the inner sanctum of the Sanctuary of Time. They acquire the Chronos Flute and win the Games!";
    
    $sanc0.stageFxHandler.AddFx($sancWinCon);
    
    $sanc1.stageFxHandler.AddFx($sancWinCon);
    
    $sanc2.stageFxHandler.AddFx($sancWinCon);
    
    ///
    
    const $xmapWinCon = GH.scenarioHandler.AddScenarioFx(4);
    
    $xmapWinCon.completeEffectOutputText = "[names] have restored many lost wonders of nature and are declared winners of the Games!";
    
    $spires0.stageFxHandler.AddFx($xmapWinCon);
    
    $sanc1.stageFxHandler.AddFx($xmapWinCon);
    
    $xora0.stageFxHandler.AddFx($xmapWinCon);
    
    $spires1.stageFxHandler.AddFx($xmapWinCon);
    
    $xora1.stageFxHandler.AddFx($xmapWinCon,2);
    
    ///
    
    const $spires0Debuff = GH.scenarioHandler.AddScenarioFx(1,"debuff");
    
    $sanc0.stageFxHandler.AddFx($spires0Debuff);
    
    $spires0Debuff.targetStage = $spires0;
    
    $spires0Debuff.targetStageOutputText ="[names] is caught in the engtanglement trap!"
    
    ///
    
    const $spires1Debuff = GH.scenarioHandler.AddScenarioFx(2,"debuff");
    
    $spires1Debuff.completeEffectOutputText = "[names] perform a time ritual on Xora's star, creating a temporal rift around the other team at the Spires of Light.";
    
    $xora0.stageFxHandler.AddFx($spires1Debuff)
    
    $sanc2.stageFxHandler.AddFx($spires1Debuff);
    
    $spires1Debuff.targetStage = $spires1;
    
    $spires1Debuff.targetStageOutputText ="[names] stumbles into the temporal rift and has their consciousness temporarily swapped with their infant self. They plop down for a quick nap and cannot be reasoned with.";
    
    ///
    
    const $hopeBuff = GH.scenarioHandler.AddScenarioFx(1,"teamHopeBuff");
    
    $spires0.stageFxHandler.AddFx($hopeBuff);
    
}