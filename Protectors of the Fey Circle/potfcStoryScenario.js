import {stage} from "./../stage.js";

export function initPOTFCCardZones(scenario)
{
    scenario.usesCardZoneAssignment = false;
    
    const $cz = scenario.cardZoneHandler.AddCardZone("cardZone","",1,"#1363DF");
    $cz.displayName = "";
}

export function initPOTFCStages(scenario)
{
    const GH = window.gameHandler;
    
    scenario.GetScenarioStage = GetScenarioStage;
    
    const $story0 = scenario.stageHandler.AddStage("story0");
    
    $story0.cardZone = scenario.cardZoneHandler.GetCardZoneById("cardZone");
}

function GetScenarioStage(stageHandler,id)
{
    const $stage = new stage(stageHandler,id);
    
    const $sfw = $stage.stageFlowHandler;
    
    $sfw.AddPhase($stage._SetEvalPool);
    
    const $resultPhase = $sfw.AddPhase($stage._ResultDisplayText);
    
    $resultPhase.SetToWaitForContinueButtonPress();
    
    $sfw.AddPhase($stage._TriggerStageFx);

    $sfw.AddPhase($stage._IncreaseXpForAllParticipatingChars);
    
    return $stage
}

export function initPOTFCScenarioFX()
{
    
}