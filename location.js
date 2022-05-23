class charSlot
{
    constructor(location,alignment="left",selectId,imageSpanId){
        
        this.location = location;
        this.alignment = alignment;
        this.imageSpanId = imageSpanId;
        this.selectId = selectId;
        this.character;
    }
}

class location
{
    constructor(locationHandler,id,img)
    {
        this.id = id;
        this.image = img;
        this.locationHandler = locationHandler;
        
        this.charSlots = [];
        
        //this.chars = [];
    }
    
    AddCharSlot(alignment,selectId,imageSpanId){
        
        const $slot = new charSlot(this,alignment,selectId,imageSpanId)
        
        this.charSlots.push($slot);
        
        //let $currLength = this.charSlotRows;
        
        //this.charSlotRows.push({rowId:$currLength,image:imageSlotId, selector:selectSlotId});
        
        return $slot
    }
    
    GetCharsHere(name="any",alignment="any"){
        
        let $returnArr = [];
        
        for(const slot of this.charSlots){
            
            if(name != "any" && slot.character.name != name) continue
            if(alignment == "any" || slot.character.alignment == alignment) $returnArr.push(slot.character)
        }
        
        return $returnArr
    }
    
//    AddChar(name,align){
//        
//        const $char = this.locationHandler.gameHandler.database.GetObjFromString(name);
//        $char.alignment = align;
//        $char.location = this;
//        this.chars.push($char);
//    }
}

export class locationHandler
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
        this.locations = [];
    }
    
    AddLocation(id,img,charSlots){
        
        const $loc = new location(this,id,img);
        this.locations.push($loc);
        
        this.scenarioHandler.gameHandler.uiHandler.CreateLocationRow($loc,charSlots);
        
        return $loc
    }
    
    GetLocationById(id){
        
        console.log(this.locations);
        
        for(const loc of this.locations){
            
            if(loc.id == id) return loc
        }
    }
}