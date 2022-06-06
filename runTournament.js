export function RunTournament()
{
    const $entries = [
        
        {rosterName: "Henry", scen0: {location: ["Cyclops", "Colossus", "Bishop"]}},
        
        {rosterName: "Henry", scen0: {location: ["Wolverine", "Colossus", "Bishop"]}},
        
        {rosterName: "Jamie", scenarios: [["Wolverine", "Colossus", "Beast"]]},
        
        {rosterName: "Cole", scenarios: [["Bishop", "Colossus", "Beast"]]}
        
    ]
    
    console.log("tournament begin");
    
    console.error("just use scenario object reference to get ids of scen, location and use those to lookup in entry with entry[scenId][locationId]");
    
    for(const entry of $entries){
        
        let $competitionArr = $entries.filter(e => e != entry);
        
        for(const opp of $competitionArr){
            
            let $scenCount = 0;
            
            for(const scenario of window.gameHandler.scenarioHandler.scenarios){
            
                let $currentScenPicks = entry.scenarios[$scenCount];

                let $currentScenObj = window.gameHandler.scenarioHandler.scenarios[$scenCount];

                _LoadTournamentChoices($currentScenObj,entry,"left");

                _LoadTournamentChoices($currentScenObj,opp,"right");

                $scenCount++;
                
            }
        
        }
        
    }
}
    
 function _LoadTournamentChoices(scenario,entry,alignment){
     
        let $locCount = 0;
            
        for(const loc of scenario.locationHandler.locations){
            
            for(const charSlot of loc.charSlots){
                
                console.log(entry.scenarios[$locCount]);                
                let $charsAssignedToLocation = entry.scenarios[$locCount];

                for(const char of entry.scenarios.locations[$locCount]){
                    
                    if(alignment == charSlot.alignment) {
                        
                        let $charInst = scenario.GetScenarioChar($charsAssignedToLocation.shift());

                        charSlot.UpdateChar($charInst);

                        document.getElementById(charSlot.selectId).value = $charInst.name;
                        
                    }
                }
            }
            
            $locCount++;
        }
    }