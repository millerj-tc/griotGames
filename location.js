import {ShuffleArray} from "./utils.js";

class charSlot
{
    constructor(location,alignment="left",selectId,imageSpanId){
        
        this.location = location;
        this.alignment = alignment;
        this.imageSpanId = imageSpanId;
        this.selectId = selectId;
        this.character;
    }
    
    UpdateChar(character){
        
        this.character = {...character};
        this.character.alignment = this.alignment;
        this.character.location = this.location;
        
        if(this.imageSpanId != undefined)                                                                                                                                              this.location.locationHandler.scenarioHandler.gameHandler.uiHandler.UpdateCharImage(this);
    }
}

class location
{
    constructor(locationHandler,id,img)
    {
        this.id = id;
        this.image = img;
        this.locationHandler = locationHandler;
        this.displayName = "";
        
        this.charSlots = [];
        
        this.unslottedChars = [];
        
        //this.chars = [];
    }
    
    AddCharSlot(alignment,selectId,imageSpanId){
        
        const $slot = new charSlot(this,alignment,selectId,imageSpanId);
        
        this.charSlots.push($slot);
        
        //let $currLength = this.charSlotRows;
        
        //this.charSlotRows.push({rowId:$currLength,image:imageSlotId, selector:selectSlotId});
        
        return $slot
    }
    
    GetCharsHere(name="any",alignment="any", getUnslotted = true){
        
        //console.log(this);
        
        let $returnArr = [];
        
        for(const slot of this.charSlots){
            
            if(slot.character.removedDuringRun) continue
            
            if(name != "any" && slot.character.name != name) continue
            if(alignment == "any" || slot.character.alignment == alignment) $returnArr.push(slot.character) 

        }
        
        if(getUnslotted){
        
            for(const char of this.unslottedChars){

                if((char.name == name || name == "any") &&
                    (char.alignment == alignment || alignment == "any")) $returnArr.push(char);
            }
        }
        
        return $returnArr
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
        
        this.unslottedChars.push({...char});
    }
}

export class locationHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
        this.locations = [];
    }
    
    AddLocation(id,img,charSlotsCount,bgColor){
        
        const $loc = new location(this,id,img);
        this.locations.push($loc);
        $loc.bgColor = bgColor;
        $loc.charSlotsCount = charSlotsCount;
        
        //this.scenarioHandler.gameHandler.uiHandler.CreateLocationRow($loc,charSlots,bgColor);
        
        return $loc
    }
    
    GetLocationById(id){
        
        //console.log(this.locations);
        
        for(const loc of this.locations){
            
            if(loc.id == id) return loc
        }
    }
    
    GetAllCharsAtLocations(team="any"){
        
        let $allChars = [];
        
        for(const loc of this.locations){
            
            for(const slot of loc.charSlots){
                
                if(slot.character.removedDuringRun) continue
                
                if(team == "any") $allChars.push(slot.character);
                else if (slot.character.alignment == team) $allChars.push(slot.character);
            }
        }
        
        return $allChars
    }
    
    RandomizeStartingTeams(){
        
        let $destructoArrLeft = ShuffleArray(this.scenarioHandler.GetAllChars(true));
        
        let $destructoArrRight = ShuffleArray(this.scenarioHandler.GetAllChars(true));
        
        
        for(const loc of this.locations){
            
            for(const slot of loc.charSlots){
                
                let $chosenChar;
                
                if(slot.alignment == "left") $chosenChar = $destructoArrLeft.shift();
                else $chosenChar = $destructoArrRight.shift();

                
                const $selectorDOM = document.getElementById(slot.selectId);
                
                this.scenarioHandler.gameHandler.uiHandler.SetSelectorToChar($selectorDOM,$chosenChar);
                
                slot.UpdateChar($chosenChar);
                
                
                //this.scenarioHandler.gameHandler.uiHandler.UpdateCharImage(slot);
            }
        }

    }
}