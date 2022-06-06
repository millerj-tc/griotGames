export function RunTournament()
{
    const $entries = [
        
        {rosterName: "Joseph", winCount:0, scen0: {location: ["Cyclops", "Colossus", "Bishop"]}},
        
        {rosterName: "Henry", winCount:0, scen0: {location: ["Wolverine", "Colossus", "Bishop"]}},
        
        {rosterName: "Jamie", winCount:0, scen0: {location: ["Psylocke", "Colossus", "Bishop"]}},
        
        {rosterName: "Cole", winCount:0, scen0: {location: ["Wolverine", "Beast", "Bishop"]}},
        
    ]
    
    console.log("tournament begin");
    
    for(const entry of $entries){
        
        console.error("=== evaluating " + entry.rosterName);
        
        let $competitionArr = $entries.filter(e => e != entry);
        
        for(const opp of $competitionArr){
            
            console.warn("vs " + opp.rosterName);
                    
            for(const scenario of window.gameHandler.scenarioHandler.scenarios){

                _LoadTournamentChoices(scenario,entry,"left");

                _LoadTournamentChoices(scenario,opp,"right");
                
                scenario.scenarioHandler.GotoScenario(scenario);
                
                scenario.ScenarioRun(true);
                
                console.log("WINNERS FOR " + scenario.id + ": " + scenario.winningTeam);
                
                if(scenario.winningTeam == "left") entry.winCount++;
                
            }
        
        }
        
        console.warn(entry.rosterName + " won " + entry.winCount + "/" + $competitionArr.length + " matches. WR%=" + (entry.winCount/$competitionArr.length));
        
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