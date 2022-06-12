import {ShuffleArray} from "./utils.js";

class charSlot
{
    constructor(location,alignment="left",selectId,imageSpanId){
        
        this.location = location;
        this.alignment = alignment;
        this.imageSpanId = imageSpanId;
        this.selectId = selectId;
        this.charData;
    }
    
    UpdateChar(charData){
        
        this.charData = {...charData};
        this.charData.alignment = this.alignment;
        this.charData.location = this.location;
        
        if(!this._ValidateCharUnlockedForTeam(this.charData,this.charData.alignment)) console.error(this.charData.name + " is not unlocked for " + this.charData.alignment + "!!!");
        
        if(this.imageSpanId != undefined)                                                                                                                                              this.location.locationHandler.scenario.scenarioHandler.gameHandler.uiHandler.UpdateCharImage(this);
    }
    
    _ValidateCharUnlockedForTeam(charData,team){
        
        if(charData.unlocked.includes(team)) return true
        else return false
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
        
        return $slot
    }
    
    GetCharsHere(name="any",alignment="any", getUnslotted = true){
        
        let $returnArr = [];
        
        for(const slot of this.charSlots){
            
            if(slot.charData.removedDuringRun) {continue}
            
            if(name != "any" && slot.charData.name != name) continue
            if(alignment == "any" || slot.charData.alignment == alignment) $returnArr.push(slot.charData)
            


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
            
            if(slot.charData == char){
                

                
                slot.charData.removedDuringRun = true;
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
    constructor(scenario){
        
        this.scenario = scenario;
        this.locations = [];
    }
    
    AddLocation(id,img,charSlotsCount,bgColor){
        
        const $loc = new location(this,id,img);
        this.locations.push($loc);
        $loc.bgColor = bgColor;
        $loc.charSlotsCount = charSlotsCount;
        
        //this.scenario.scenarioHandler.gameHandler.uiHandler.CreateLocationRow($loc,charSlots,bgColor);
        
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
                
                if(slot.charData.removedDuringRun) continue
                
                if(team == "any") $allChars.push(slot.charData);
                else if (slot.charData.alignment == team) $allChars.push(slot.charData);
            }
        }
        
        return $allChars
    }
    
    _GetUnlockedCharsNotAssignedToASlot(alignment = "any",unlockedFor = "both"){
        
        let $returnArr = this.scenario.GetAllChars(unlockedFor);
        
        for(const loc of this.locations){
            
            for(const slot of loc.charSlots){
                
                if(slot.alignment != alignment && alignment != "any") continue
                
                if(slot.charData == undefined) continue
                
                $returnArr = $returnArr.filter(c => slot.charData.name != c.name)
            }
        }
        

        
        return $returnArr
    }
    
    RandomizeSlotsWithNoSaveData(){
        

        
        let $destructoArrLeft = ShuffleArray(this._GetUnlockedCharsNotAssignedToASlot("left","left"));
        
        let $destructoArrRight = ShuffleArray(this._GetUnlockedCharsNotAssignedToASlot("right","right"));
        
        for(const loc of this.locations){
            
            for(const slot of loc.charSlots){
                
                if(slot.charData != null) continue
                
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