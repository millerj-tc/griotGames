class scenarioFx
{
    constructor(scenario,reqdInc,type="wincon"){
        
        this.scenario = scenario;
        this.requiredIncrements = reqdInc;
        this.currentLeftIncrements = 0;
        this.currentRightIncrements = 0;
        this.completeEffectOutputText = "";
        this.targetStageOutputText = "";
        this.targetStage;
        this.newNextStage;
        this.targetChars;
        this.incrementingStage;
        this.winCardZone;
        this.winningChar;
        this.winTeam;
        this.fxType = type;
        
        if(type == "wincon") this.CompleteEffect = this.WinCon;
        if(type == "stageSelect") this.CompleteEffect = this.StageSelect;
        if(type == "debuff") this.CompleteEffect = this.StageDebuff;
        if(type == "teamHopeBuff") this.CompleteEffect = this.TeamHopeBuff;
        if(type == "finalWincon") this.CompleteEffect = this.WinCon;
        if(type == "moveToInteractivePhase") this.CompleteEffect = this.MoveToInteractivePhase;
        
    }
    
    SetWinCardZone(cardZone){
        
        this.winCardZone = cardZone;
    }
    
    SetIncrementingStage(stage){
        
        this.incrementingStage = stage;
    }
    
    Increment(team){
        
        if(team == "left") this.currentLeftIncrements++
        if(team == "right") this.currentRightIncrements++
        
        this._ProceedToCompleteEffect();
    }
    
    _ProceedToCompleteEffect(){
        
        
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements) this.CompleteEffect()
        
        if(this.requiredIncrements == "relative" && this.incrementingStage == this.targetStage){ 
            //console.log(this);
            this.CompleteEffect();
        }
    }
    
    StageSelect(){
        

        
        if(this.targetStage == "undefined") console.error("Essential properties for scenarioFx have not been set!");
        
        this.targetStage.nextStage = this.newNextStage;
    }
    
    StageDebuff(){
        
        if(this.targetStage == "undefined") console.error("Essential properties for scenarioFx have not been set!");
        
        let $text = this.completeEffectOutputText;
        
        let $winningCharString
        
        if(this.currentLeftIncrements == this.requiredIncrements){
            $winningCharString = GetStringOfCharsFromArray(this.winCardZone.GetCharsHere(),"left",true);
            this.targetStage.rightDebuffCount++
        }
        if(this.currentRightIncrements == this.requiredIncrements){
            $winningCharString = GetStringOfCharsFromArray(this.winCardZone.GetCharsHere(),"right",true);
            this.targetStage.leftDebuffCount++
        }
        
        $winningCharString = 
        
        $text = this.completeEffectOutputText.replace("[names]",$winningCharString);
        
        this.PrintCompleteEffectOutput($text);
    }
    
    TeamHopeBuff(){
        
        let $text = this.completeEffectOutputText;
        
        if(this.currentLeftIncrements == this.requiredIncrements) this.targetChars = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("left");
        
        if(this.currentRightIncrements == this.requiredIncrements) this.targetChars = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("right");
        
        for(const char of this.targetChars){
            
            char.hope++
            //console.trace();
        }
        
        //console.log("HOPE TEXT " + this.winCardZone.id);
        
        this.PrintCompleteEffectOutput($text);
    }
    
    PrintCompleteEffectOutput(text,wincon=false){
        
        if((this.completeEffectOutputText != "")){

            
            if(wincon == true || !this.scenario.gameOver){
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput("<br><br>");
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
            } 
            //else if(wincon == true)this.scenario.scenarioHandler.gameHandler.uiHandler.UpdateOutput(text);
        }
    }
    
    WinCon(){
        
        if(this.scenario.gameOver) return
        
        let $text;
        
        this.scenario.gameOver = true;
        
        let $winningCharString
            
        if(this.currentLeftIncrements == this.requiredIncrements || this.currentRightIncrements == this.requiredIncrements){
            
            if(this.currentLeftIncrements == this.requiredIncrements) $winningCharString = this._TeamWins("left");
            if(this.currentRightIncrements == this.requiredIncrements) $winningCharString = this._TeamWins("right");
            
            this._PrepOutputText($winningCharString);
            
        }
        else if(this.requiredIncrements == "relative"){
            
            if(this.currentLeftIncrements > this.currentRightIncrements){
                $winningCharString = this._TeamWins("left");
                this._PrepOutputText($winningCharString);
            }
            else if(this.currentRightIncrements > this.currentLeftIncrements){
                $winningCharString = this._TeamWins("right");
                this._PrepOutputText($winningCharString);
            }
            else if(this.fxType == "finalWincon") this._LowestCumeTiebreaker();
        }
    }
    
    _PrepOutputText(winningCharString){
        
            let $text = this.completeEffectOutputText.replace("[names]",winningCharString);
            
            let $teamColor;
        
            if(this.winTeam == "left") $teamColor = "blue";
            if(this.winTeam == "right") $teamColor = "red";
        
            $text = `<b><span style="color:` + $teamColor + `">` + $text + "</span></b>";

            this.PrintCompleteEffectOutput($text,true);
    }
    
    _TeamWins(team){
        
        let $winningChars = this.scenario.cardZoneHandler.GetAllCharsAtCardZones();
            
            let $winningCharString;
        
            $winningCharString = GetStringOfCharsFromArray($winningChars,team,true);
        
            this.winTeam = team;
        
            return $winningCharString
    }
    
    _LowestCumeTiebreaker(){
        
        let $leftTeamCume = 0;
        
        let $rightTeamCume = 0 ;
        
        const $leftTeam = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("left");
        
        for(const char of $leftTeam){
            
            $leftTeamCume += char.cume;
        }
        
        const $rightTeam = this.scenario.cardZoneHandler.GetAllCharsAtCardZones("right");
        
        for(const char of $rightTeam){
            
            $rightTeamCume += char.cume;
        }
        
        console.log($leftTeamCume);
        console.log($rightTeamCume);
        
        let $winningCharString
        
        if($leftTeamCume < $rightTeamCume) $winningCharString = this._TeamWins("left");
        else if($leftTeamCume > $rightTeamCume) $winningCharString = this._TeamWins("right");
        else this._TeamWins("error");
        
        this.completeEffectOutputText = "The world loves an underdog story! [names] have impressed the world with their chutzpah and are declared the winners of the Games!";
        
        this._PrepOutputText($winningCharString);
        
    }
}