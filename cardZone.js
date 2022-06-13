import {ShuffleArray} from "./utils.js";

class cardSlot
{
    constructor(cardZone,alignment="left",selectId,imageSpanId){
        
        this.cardZone = cardZone;
        this.alignment = alignment;
        this.imageSpanId = imageSpanId;
        this.selectId = selectId;
        this.subSlots = [];
        this.card;
    }
    
    UpdateCard(card){
        
        this.card = card;
        
        this.card.data = card.data;
        
        this.card.alignment = this.alignment;
        this.card.cardZone = this.cardZone;
        
        if(!this._ValidateCharUnlockedForTeam(this.card,this.card.alignment)) console.error(this.card.name + " is not unlocked for " + this.card.alignment + "!!!");
        
        if(this.imageSpanId != undefined)                                                                                                                                              this.cardZone.cardZoneHandler.scenario.scenarioHandler.gameHandler.uiHandler.UpdateCharImage(this);
    }
    
    _ValidateCardUnlockedForTeam(char,team){
        
        if(card.unlocked.includes(team)) return true
        else return false
    }
}

class cardZone
{
    constructor(cardZoneHandler,id,img)
    {
        this.id = id;
        this.image = img;
        this.cardZoneHandler = cardZoneHandler;
        this.displayName = "";
        
        this.charSlots = [];
        
        this.unslottedChars = [];
        
        //this.chars = [];
    }
    
    AddCharSlot(alignment,selectId,imageSpanId){
        
        const $slot = new charSlot(this,alignment,selectId,imageSpanId);
        

        
        this.charSlots.push($slot);        
        
        return $slot
    }
    
    GetCharsHere(name="any",alignment="any", getUnslotted = true){
        
        let $returnArr = [];
        
        for(const slot of this.charSlots){
            
            if(slot.card.removedDuringRun) {continue}
            
            if(name != "any" && slot.card.name != name) continue
            if(alignment == "any" || slot.card.alignment == alignment) $returnArr.push(slot.card)
            


        }
        
        if(getUnslotted){
        
            for(const char of this.unslottedChars){

                if((char.name == name || name == "any") &&
                    (char.alignment == alignment || alignment == "any")) $returnArr.push(char);
            }
        }
        
        return $returnArr
    }
    
    CharHasAllyNamed(charName,allyName){
        
        for(const char of this.GetCharsHere(charName,"any",true)){
            
            if(this.GetCharsHere(allyName,char.alignment,true).length > 0) return true
        }
        
        return false
    }
    
    
    
    RemoveCharDuringRun(char){
        
        for(const slot of this.charSlots){
            
            if(slot.character == char){
                

                
                slot.character.removedDuringRun = true;
            }
        }
        
        for(const unslottedChar of this.unslottedChars){
            
            if(char == unslottedChar) this.unslottedChars = this.unslottedChars.filter(c => c != char);
        }
    }
    
    AddUnslottedChar(char){
        
        const $char = new character(this.cardZoneHandler.scenario.scenarioHandler);
        
        $char.data = char.data;
        
        this.unslottedChars.push($char);
    }
}

export class cardZoneHandler
{
    constructor(scenario){
        
        this.scenario = scenario;
        this.cardZones = [];
    }
    
    AddCardZone(id,img,charSlotsCount,bgColor){
        
        const $czone = new cardZone(this,id,img);
        this.cardZones.push($czone);
        $czone.bgColor = bgColor;
        $czone.charSlotsCount = charSlotsCount;
        
        //this.scenario.scenarioHandler.gameHandler.uiHandler.CreateczoneationRow($czone,charSlots,bgColor);
        
        return $czone
    }
    
    GetCardZoneById(id){
        
        //console.log(this.locations);
        
        for(const czone of this.cardZones){
            
            if(czone.id == id) return czone
        }
    }
    
    GetAllCharsAtCardZones(team="any"){
        
        let $allChars = [];
        
        for(const czone of this.cardZones){
            
            for(const slot of czone.charSlots){
                
                if(slot.character.removedDuringRun) continue
                
                if(team == "any") $allChars.push(slot.character);
                else if (slot.character.data.alignment == team) $allChars.push(slot.character);
            }
        }
        
        return $allChars
    }
    
    _GetUnlockedCharsNotAssignedToASlot(alignment = "any",unlockedFor = "both"){
        
        let $returnArr = this.scenario.GetAllChars(unlockedFor);
        
        for(const czone of this.cardZones){
            
            for(const slot of czone.charSlots){
                
                if(slot.alignment != alignment && alignment != "any") continue
                
                if(slot.character == undefined) continue
                
                $returnArr = $returnArr.filter(c => slot.character.data.name != c.data.name)
            }
        }
        

        
        return $returnArr
    }
    
    RandomizeSlotsWithNoSaveData(){
        

        
        let $destructoArrLeft = ShuffleArray(this._GetUnlockedCharsNotAssignedToASlot("left","left"));
        
        let $destructoArrRight = ShuffleArray(this._GetUnlockedCharsNotAssignedToASlot("right","right"));
        
        for(const czone of this.cardZones){
            
            for(const slot of czone.charSlots){
                
                if(slot.character != null) continue
                
                let $chosenChar;
                
                if(slot.alignment == "left") {
                    
                    $chosenChar = $destructoArrLeft.shift();
                    
                }
                else {
                    
                    $chosenChar = $destructoArrRight.shift();
                }
                
                

                
                const $selectorDOM = document.getElementById(slot.selectId);
                
                this.scenario.scenarioHandler.gameHandler.uiHandler.SetSelectorToChar($selectorDOM,$chosenChar);
                
                slot.UpdateChar($chosenChar);
                

                
            }
        }

    }
}