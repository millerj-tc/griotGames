export function initializeArtbreederScenario0()
{
    const GH = window.gameHandler;
    
    const $sanc0 = GH.scenarioHandler.stageHandler.AddStage("sanctuary0");
    
    $sanc0.evalValue = "charisma";
        
    $sanc0.winText = "[names] uses their connections to acquire a rare Temporal Medallion for the [alignment] team. They cast a spell of haste on their allies at the Spires of Light."
        
    $sanc0.location = GH.scenarioHandler.locationHandler.GetLocationById("sanctuary");
    
    const $spires0 = GH.scenarioHandler.stageHandler.AddStage("spires0");
    
    $spires0.evalValue = "spirit";
    
    $sanc0.nextStage = $spires0;

    $spires0.winText = "[names] reignites the Spires of Light, bringing hope to many. The world is awed by the [alignment] team!"
        
    $spires0.location = GH.scenarioHandler.locationHandler.GetLocationById("spires");
    
    //console.log($sanc0);
    
    //console.log($spires0);
}