export function initializeArtbreederScenario0()
{
    const GH = window.gameHandler;
    
    const $sanc0 = GH.scenarioHandler.stageHandler.AddStage("sanctuary0");
    
    $sanc0.evalValue = "charisma";
        
    $sanc0.winText = "[names] uses their connections to acquire a rare Temporal Medallion for the [alignment] team. They cast a spell of haste on their allies at the Spires of Light."
        
    $sanc0.location = GH.scenarioHandler.locationHandler.GetLocationById("sanctuary");
    
    const $spires0 = GH.scenarioHandler.stageHandler.AddStage("spires0");
    
    $spires0.evalValue = "spirit";
    
    //$sanc0.nextStage = $spires0;

    $spires0.winText = "[names] reignites the Spires of Light, bringing hope to many. The world is awed by the [alignment] team!"
        
    $spires0.location = GH.scenarioHandler.locationHandler.GetLocationById("spires");
    
    const $sanc1 = GH.scenarioHandler.stageHandler.AddStage("sanctuary1");
    
    $sanc1.evalValue = "power";
    
    $sanc1.winText = "[names] rescues the last remaining family of Time Koalas from a nefarious demon. The [alignment] team celebrates their cuddly new friends!";
    
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
}