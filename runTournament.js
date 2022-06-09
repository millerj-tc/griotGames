import {statsTracker} from "./charStatTracking.js";

export function RunTournament()
{
    const $entries = [
        
//        {rosterName: "Joseph", winCount:0, scen0: {location: ["Bishop", "Cyclops", "Psylocke"]}},
//        
//        
//        {rosterName: "Sora", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]}},
//        
//        {rosterName: "Jenny", winCount:0, scen0: {location: ["Beast", "Cyclops", "Bishop"]}},
//        
//        {rosterName: "Rhys", winCount:0, scen0: {location: ["Bishop", "Wolverine", "Beast"]}},
//        
//        {rosterName: "Erik", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Beast"]}},
//        
//        {rosterName: "Brett", winCount:0, scen0: {location: ["Cyclops", "Colossus", "Beast"]}},
//        
//        {rosterName: "Henry", winCount:0, scen0: {location: ["Psylocke", "Colossus", "Beast"]}},
//        
//        {rosterName: "Jamie", winCount:0, scen0: {location: ["Psylocke", "Beast", "Cyclops"]}},
//        
//        {rosterName: "Tyler", winCount:0, scen0: {location: ["Psylocke", "Colossus", "Cyclops"]}},
//        
//        {rosterName: "Cole", winCount:0, scen0: {location: ["Wolverine", "Beast", "Psylocke"]}},
//        
//        {rosterName: "Cloud", winCount:0, scen0: {location: ["Wolverine", "Colossus", "Psylocke"]}},
//        
//        {rosterName: "Squall", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Psylocke"]}},
//        
//        {rosterName: "Lightning", winCount:0, scen0: {location: ["Wolverine", "Bishop", "Psylocke"]}},
//        
//        {rosterName: "Yuna", winCount:0, scen0: {location: ["Beast", "Bishop", "Psylocke"]}},
//        
//        {rosterName: "Tidus", winCount:0, scen0: {location: ["Wolverine", "Bishop", "Psylocke"]}},
        
        {rosterName: "Joseph", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Bishop", "Colossus", "Cyclops","Okoye","Wolverine"]}},
        
        {rosterName: "Henry", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Cyclops", "Daredevil", "Ghostrider", "Okoye", "Wolverine"]}},
        
        {rosterName: "Jamie", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Colossus", "Cyclops", "Ghostrider", "Okoye", "Wolverine"]}},
        
        {rosterName: "Jenny", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Colossus", "Daredevil", "Ghostrider", "Okoye", "Psylocke"]}},
        
        {rosterName: "Dean", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Daredevil", "Ghostrider", "Punisher", "Wolverine"]}},
        
        {rosterName: "Vlad", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Bishop", "Cyclops", "Daredevil", "Psylocke"]}},
        
        {rosterName: "Saucy", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Black Panther", "Jessica Jones", "Punisher", "Wolverine"]}},
        
        {rosterName: "Tempo", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Bishop", "Black Panther", "Daredevil", "Psylocke", "Punisher"]}},
        
        {rosterName: "Flex", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Black Panther", "Colossus", "Psylocke", "Wolverine"]}},
        
        {rosterName: "Smarties", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Bishop", "Daredevil", "Jessica Jones", "Psylocke"]}},
        
        {rosterName: "Swing", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Bishop", "Cyclops", "Psylocke", "Wolverine"]}},
        
        {rosterName: "Apple", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Ghostrider", "Jessica Jones", "Daredevil", "Punisher", "Colossus"]}},
        
    ]
    
    const $statsTracker = new statsTracker();
    
    console.log("tournament begin");
    
    for(const entry of $entries){
        
        console.log("===== evaluating " + entry.rosterName.toUpperCase() + " =====");
        
        let $competitionArr = $entries.filter(e => e != entry);
        
        for(const opp of $competitionArr){
            
            console.log("vs " + opp.rosterName);
                    
            for(const scenario of window.gameHandler.scenarioHandler.scenarios){

                let $leftTeam = _LoadTournamentChoices(scenario,entry,"left");

                let $rightTeam = _LoadTournamentChoices(scenario,opp,"right");
                
                scenario.scenarioHandler.GotoScenario(scenario);
                
                scenario.ScenarioRun(true); //-- set to TRUE for tournament output during matches
                
                console.log("WINNERS FOR " + scenario.id + ": " + scenario.winningTeam);
                
                if(scenario.winningTeam == "left"){
                    
                    for(const char of scenario.savedLocCharSlots) $statsTracker.ReportMatchForChar(char,scenario)
                    
                    entry.winCount++;
                }
                
            }
        
        }
        
        console.log(entry.rosterName + " won " + entry.winCount + "/" + $competitionArr.length + " matches. WR%=" + (entry.winCount/$competitionArr.length));
        
    }
    
    $statsTracker.DisplayWinRatesByChar();
    //$statsTracker.DisplayAverageXpByChar();
    $statsTracker.DisplayWinRateForCharWithAllies("Wolverine", ["Bishop"]);
    $statsTracker.DisplayWinRateForCharWithAllies("Wolverine", ["Cyclops"]);
    $statsTracker.DisplayWinRateForCharWithAllies("Cyclops", ["Psylocke"]);
    $statsTracker.DisplayWinRateForCharWithAllies("Wolverine", ["Wolverine"]);
}
    
 function _LoadTournamentChoices(scenario,entry,alignment){
     
     let $returnTeam = [];
                
    for(const loc of scenario.locationHandler.locations){

        let $charsAssignedToLocation = [...entry[scenario.id][loc.id]];

        for(const charSlot of loc.charSlots){
            


            for(const char of entry[scenario.id][loc.id]){

                if(alignment == charSlot.alignment) {
                    

                    let $charInst = scenario.GetScenarioChar($charsAssignedToLocation.shift());
                
                    scenario.savedLocCharSlots.push({characterName: $charInst.name,alignment: alignment, locationId: loc.id, selectId: charSlot.selectId});
                    
                    $returnTeam.push({name:$charInst.name,wins:0});

                    break

                }
            }
        }
    }
     
     return $returnTeam
}