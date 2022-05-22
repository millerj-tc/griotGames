class charSlot
{
    constructor(location,alignment="left"){
        
        this.location = location;
        this.alignment = alignment;
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
    
    AddCharSlot(alignment){
        
        const $slot = new charSlot(this,alignment)
        
        this.charSlots.push($slot);
        
        //let $currLength = this.charSlotRows;
        
        //this.charSlotRows.push({rowId:$currLength,image:imageSlotId, selector:selectSlotId});
    }
    
    GetCharsHere(name="any",alignment="any"){
        
        let $returnArr = [];
        
        for(const char of this.chars){
            
            if(name != "any" && char.name != name) continue
            if(alignment == "any" || char.alignment == alignment) $returnArr.push(char)
        }
        
        return $returnArr
    }
    
    AddChar(name,align){
        
        const $char = this.locationHandler.gameHandler.database.GetObjFromString(name);
        $char.alignment = align;
        $char.location = this;
        this.chars.push($char);
    }
}

export class locationHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        this.locations = [];
    }
    
    AddLocation(id,img,charSlots){
        
        const $loc = new location(this,id,img);
        this.locations.push($loc);
        
        for(let i = 0; i < charSlots; i++){
            
            $loc.
        }
        
        this.gameHandler.uiHandler.CreateLocationRow($loc,charSlots);
        
        return $loc
    }
    
    GetLocationById(id){
        
        for(const loc of this.locations){
            
            if(loc.id == id) return loc
        }
    }
}