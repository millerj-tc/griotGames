class location
{
    constructor(locationHandler,id,img)
    {
        this.id = id;
        this.image = img;
        this.locationHandler = locationHandler
        
        this.chars = [];
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
    
    AddLocation(id,img){
        
        const $loc = new location(this,id,img);
        this.locations.push($loc);
        
        return $loc
    }
    
    GetLocationById(id){
        
        for(const loc of this.locations){
            
            if(loc.id == id) return loc
        }
    }
}