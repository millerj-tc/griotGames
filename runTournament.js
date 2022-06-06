export function RunTournament()
{
    const $entries = [
        
        {rosterName: "Joseph", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Colossus"]}},
        
        {rosterName: "Henry", winCount:0, scen0: {location: ["Psylocke", "Colossus", "Beast"]}},
        
        {rosterName: "Jamie", winCount:0, scen0: {location: ["Psylocke", "Beast", "Cyclops"]}},
        
        {rosterName: "Cole", winCount:0, scen0: {location: ["Wolverine", "Beast", "Bishop"]}},
        
        {rosterName: "Jenny", winCount:0, scen0: {location: ["Beast", "Cyclops", "Bishop"]}},
        
        {rosterName: "Rhys", winCount:0, scen0: {location: ["Bishop", "Wolverine", "Beast"]}},
        
        {rosterName: "Erik", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Beast"]}},
        
        {rosterName: "Brett", winCount:0, scen0: {location: ["Cyclops", "Colossus", "Beast"]}},
        
    ]
    
    console.log("tournament begin");
    
    for(const entry of $entries){
        
        console.log("=== evaluating " + entry.rosterName);
        
        let $competitionArr = $entries.filter(e => e != entry);
        
        for(const opp of $competitionArr){
            
            console.log("vs " + opp.rosterName);
                    
            for(const scenario of window.gameHandler.scenarioHandler.scenarios){

                _LoadTournamentChoices(scenario,entry,"left");

                _LoadTournamentChoices(scenario,opp,"right");
                
                scenario.scenarioHandler.GotoScenario(scenario);
                
                scenario.ScenarioRun(true);
                
                console.log("WINNERS FOR " + scenario.id + ": " + scenario.winningTeam);
                
                if(scenario.winningTeam == "left") entry.winCount++;
                
            }
        
        }
        
        console.log(entry.rosterName + " won " + entry.winCount + "/" + $competitionArr.length + " matches. WR%=" + (entry.winCount/$competitionArr.length));
        
    }
}
    
 function _LoadTournamentChoices(scenario,entry,alignment){
     

            
    for(const loc of scenario.locationHandler.locations){

        let $charsAssignedToLocation = [...entry[scenario.id][loc.id]];

        for(const charSlot of loc.charSlots){
            


            for(const char of entry[scenario.id][loc.id]){

                if(alignment == charSlot.alignment) {
                    

                    let $charInst = scenario.GetScenarioChar($charsAssignedToLocation.shift());
                
                    scenario.savedLocCharSlots.push({characterName: $charInst.name,alignment: alignment, locationId: loc.id, selectId: charSlot.selectId});
                    

                    
                    break

                }
            }
        }
    }
}