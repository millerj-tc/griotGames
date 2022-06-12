import {statsTracker} from "./charStatTracking.js";

// ["Beast", "Colossus", "Psylocke"] won 12/15 matches. WR%=0.8

// ["Beast","Bishop", "Wolverine"] won 11/15 matches. WR%=0.7333333333333333

// ["Cyclops", "Psylocke", "Wolverine"] won 10/15 matches. WR%=0.6666666666666666
// ["Beast", "Psylocke", "Wolverine"] won 10/15 matches. WR%=0.6666666666666666
// Jamie won 10/15 matches. WR%=0.6666666666666666

// Erik won 9/15 matches. WR%=0.6
// Tyler won 9/15 matches. WR%=0.6

//Red XIII won 8/15 matches. WR%=0.5333333333333333
// Cloud won 8/15 matches. WR%=0.5333333333333333
// Brett won 8/15 matches. WR%=0.5333333333333333

// Yuna won 7/15 matches. WR%=0.4666666666666667
// Lightning won 5/15 matches. WR%=0.3333333333333333
// Tidus won 5/15 matches. WR%=0.3333333333333333

//Joseph won 4/15 matches. WR%=0.26666666666666666
// Jenny won 3/15 matches. WR%=0.2
// Sora won 2/15 matches. WR%=0.13333333333333333

// two nimble dodges NEW GAME +

// GhostFlex won 15/15 matches. WR%=1
// Flex won 14/15 matches. WR%=0.9333333333333333
// Saucy won 13/15 matches. WR%=0.8666666666666667
// Charm School won 11/15 matches. WR%=0.7333333333333333
// Swing won 9/15 matches. WR%=0.6
// Jamie won 7/15 matches. WR%=0.4666666666666667
// Jenny won 7/15 matches. WR%=0.4666666666666667
// Dean won 7/15 matches. WR%=0.4666666666666667
// Henry won 6/15 matches. WR%=0.4
// Tempo won 6/15 matches. WR%=0.4
// Smarties won 5/15 matches. WR%=0.3333333333333333
// Joseph won 5/15 matches. WR%=0.3333333333333333
// Apple won 4/15 matches. WR%=0.26666666666666666
// Vlad won 4/15 matches. WR%=0.26666666666666666
// ZTeam won 1/15 matches. WR%=0.06666666666666667
// New Powers won 1/15 matches. WR%=0.06666666666666667


export function RunTournament()
{
    const $entries = [
        
        //  {rosterName:"	Joseph's Joseph's Dunces	", winCount:0,scen0:{location:[		'Beast',	'Cyclops',	'Psylocke'	]}},
    {rosterName:"	Ananda Guneratne	", winCount:0,scen0:{location:[		'Cyclops',	'Psylocke',	'Wolverine'	]}},
    {rosterName:"	Jamie's ICP (Insane Clone Posse)	", winCount:0,scen0:{location:[		'Beast',	'Psylocke',	'Wolverine'	]}},
    {rosterName:"	Cole's Cole	", winCount:0,scen0:{location:[		'Beast',	'Bishop',	'Wolverine'	]}},
    {rosterName:"	Rhys's Yes Team	", winCount:0,scen0:{location:[		'Beast',	'Bishop',	'Wolverine'	]}},
    {rosterName:"	David Havetwobergs's Goggled Geese Who Giggle and Gaggle.	", winCount:0,scen0:{location:[		'Beast',	'Bishop',	'Wolverine'	]}},
        
    {rosterName:"	Ananda Guneratne	", winCount:0,scen0:{location:[		'Cyclops',	'Psylocke',	'Wolverine'	]}, scen1: {location:[	'Cyclops',	'Psylocke',	'Wolverine'	]}, scen2: {location:[	'Cyclops',	'Psylocke',	'Wolverine'	]}, scen3: {location:[	'Beast',	'Daredevil',	'Jessica Jones',	'Ghostrider'	'Okoye',	]}},
    {rosterName:"	Abram's Thebigboys	", winCount:0,scen0:{location:[		'Beast',	'Bishop',	'Wolverine'	]}, scen1: {location:[	'Beast',	'Bishop',	'Wolverine'	]}, scen2: {location:[	'Beast',	'Bishop',	'Wolverine'	]}, scen3: {location:[	'Beast',	'Bishop',	'Cyclops',	'Wolverine'	'Ghostrider',	]}},
    {rosterName:"	Jamie's Inane Clone Posse 2: Electric Boogaloo	", winCount:0,scen0:{location:[		'Beast',	'Cyclops',	'Wolverine'	]}, scen1: {location:[	'Beast',	'Cyclops',	'Wolverine'	]}, scen2: {location:[	'Beast',	'Cyclops',	'Wolverine'	]}, scen3: {location:[	'Beast',	'Bishop',	'Psylocke',	'Ghostrider'	'Black Panther',	]}},

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
//        {rosterName: "Mind and Muscle", winCount:0, scen0: {location: ["Psylocke", "Colossus", "Beast"]}},
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
        
//        {rosterName: "Red XIII", winCount:0, scen0: {location: ["Colossus", "Bishop", "Psylocke"]}},
        
        
//        {rosterName: "Joseph", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Bishop", "Colossus", "Cyclops","Okoye","Wolverine"]}},
//        
//        {rosterName: "Henry", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Cyclops", "Daredevil", "Ghostrider", "Okoye", "Wolverine"]}},
//        
//        {rosterName: "Jamie", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Colossus", "Cyclops", "Ghostrider", "Okoye", "Wolverine"]}},
//        
//        {rosterName: "Jenny", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Colossus", "Daredevil", "Ghostrider", "Okoye", "Psylocke"]}},
//        
//        {rosterName: "Dean", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Daredevil", "Ghostrider", "Punisher", "Wolverine"]}},
//        
//        {rosterName: "Vlad", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Bishop", "Cyclops", "Daredevil", "Psylocke"]}},
//        
//        {rosterName: "Saucy", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Black Panther", "Jessica Jones", "Punisher", "Wolverine"]}},
//        
//        {rosterName: "Tempo", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Bishop", "Black Panther", "Daredevil", "Psylocke", "Punisher"]}},
//        
//        {rosterName: "Flex", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Black Panther", "Colossus", "Psylocke", "Wolverine"]}},
//        
//        {rosterName: "Smarties", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Bishop", "Daredevil", "Jessica Jones", "Psylocke"]}},
//        
//        {rosterName: "Swing", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Ghostrider", "Bishop", "Cyclops", "Psylocke", "Wolverine"]}},
//        
//        {rosterName: "Apple", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Ghostrider", "Jessica Jones", "Daredevil", "Punisher", "Colossus"]}},
//        
//        {rosterName: "ZTeam", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Jessica Jones", "Okoye", "Psylocke", "Punisher", "Wolverine"]}},
//        
//        {rosterName: "Charm School", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Black Panther", "Cyclops", "Daredevil", "Colossus", "Beast"]}},
//        
//        {rosterName: "New Powers", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Ghostrider", "Bishop", "Cyclops", "Daredevil", "Punisher"]}},
//        
//        {rosterName: "GhostFlex", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Black Panther", "Colossus", "Ghostrider", "Wolverine"]}},
//        
//        {rosterName: "GhostdareFlex", winCount:0, scen0: {location: ["Wolverine", "Cyclops", "Bishop"]},scen1: {location: ["Wolverine", "Cyclops", "Bishop"]},scen2: {location: ["Wolverine", "Cyclops", "Bishop"]},scen3: {location: ["Beast", "Black Panther", "Colossus", "Ghostrider", "Daredevil"]}},
//        
//        {rosterName:"Ananda Guneratne", winCount:0,scen0:{location:[		'Cyclops',	'Psylocke',	'Wolverine'	]}, scen1: {location:[	'Cyclops',	'Psylocke',	'Wolverine'	]}, scen2: {location:[	'Cyclops',	'Psylocke',	'Wolverine'	]}, scen3: {location:[	'Beast',	'Daredevil',	'Jessica Jones',	'Ghostrider',	'Okoye'	]}},
        
        
        
    ]
    
    const $statsTracker = new statsTracker();
    
    console.log("tournament begin");
    
    for(const entry of $entries){
        
        console.log("=============== evaluating " + entry.rosterName.toUpperCase() + " ===============");
        
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