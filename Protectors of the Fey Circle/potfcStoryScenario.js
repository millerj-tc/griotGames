import {stage} from "./../stage.js";

export function initPOTFCCardZones(scenario)
{
    scenario.usesCardZoneAssignment = false;
    
    const $cz = scenario.cardZoneHandler.AddCardZone("cardZone","images/potfc/solet-100.jpg",1,"#1363DF");
    $cz.displayName = "";
}

export function initPOTFCCardZoneMenu(scenario)
{
    const $cardZoneMenu = this.uiHandler.AddGrid();
        
    const $testDiv0 = document.createElement("div");
    $testDiv0.innerHTML = "0";

    const $testDiv1 = document.createElement("div");
    $testDiv1.innerHTML = "1";

    const $testDiv2 = document.createElement("div");
    $testDiv2.innerHTML = "2";

    $testGrid.PrepGridElement($testDiv0,"zero");
    $testGrid.PrepGridElement($testDiv1,"one");
    $testGrid.PrepGridElement($testDiv2,"two")
        .AddCustomClasses(["fullRow"]);

    const $gridDOM = $testGrid.BuildGrid();
    $gridDOM.classList.add("testGrid");

    document.getElementById("output").append($gridDOM);
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