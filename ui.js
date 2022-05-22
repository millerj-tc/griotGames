//export class cropper
//{
//    constructor(){}
//    
//    CropImg(){
//        const canvas = document.getElementById('loc0lImg');
//
//        const ctx = canvas.getContext('2d');
//
//        var image = new Image();
//        image.src = "./images/valakut.jpg";
//        
//        const $sourceX = image.width * 0.1;
//        const $sourceY = image.height * 0.06;
//        const $sourceWidth = image.width * 0.8;
//        const $sourceHeight = image.height * 0.6;
//        const $destWidth = canvas.width;
//        const $destHeight = canvas.height;
//        
//  
//        image.onload = function(){
//            ctx.drawImage(image, $sourceX, $sourceY, $sourceWidth, $sourceHeight, 0, 0, $destWidth, $destHeight);
//        }
//    }
//}


// random assign button to begin experiments

export class uiHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.availableChars = this.gameHandler.database.data;
        
        this.locationTable;
        
    }
    
    CreateLocationTable(){
        
        this.locationTable = document.createElement("table");
        document.getElementById("content").innerHTML = "";
        document.getElementById("content").prepend(this.locationTable);
    }
    
    UpdateCharImage(slot){
        
        console.log(slot);
        console.log(document.getElementById(slot.selectId));
        console.log(document.getElementById(slot.selectId).value);
        
        const $selection = document.getElementById(slot.selectId).value;
        
        slot.character = this.gameHandler.database.GetObjFromString($selection);
        
        console.log(slot.character);
        
        document.getElementById(slot.imageSpanId).innerHTML = `<img src="` + slot.character.image + `">`;
        
    }
    
    Test(){
        
        console.log("test");
    }
    
    CreateLocationRow(loc,charSlots){
        
        const row = this.locationTable.insertRow(0);
        const col0 = row.insertCell(0);
        const col1 = row.insertCell(1);
        const col2 = row.insertCell(2);
        
        row.style = "fill:#1c87c9;";
        col0.style="vertical-align:middle;";
        
        for(let i = 0; i < charSlots; i++){
            
            let $leftSelector = {}; //= document.createElement("span");
            $leftSelector.id = this.SetSelectorId("left",loc.id,i);
            $leftSelector.innerHTML = this.GetSelectorHTML($leftSelector.id);
            
            //console.log($leftSelector);
            
            const $leftImage = document.createElement("span");
            $leftImage.id = `left`+ loc.id + `Char` + i + `Image`;
            $leftImage.width = 200;
            $leftImage.height = 200;
            
            let $leftSlot = loc.AddCharSlot("left",$leftSelector.id,$leftImage.id);
            
            col0.innerHTML = ($leftSelector.innerHTML);
            col0.append($leftImage);
            
            document.getElementById($leftSelector.id).addEventListener("change", function() {
                console.log("left slot event");
                window.gameHandler.uiHandler.UpdateCharImage($leftSlot);
            });
            
            let $rightSelector = {}; //= document.createElement("span");
            $rightSelector.id = this.SetSelectorId("right",loc.id,i);
            $rightSelector.innerHTML = this.GetSelectorHTML($rightSelector.id);
            
            //console.log($leftSelector);
            
            const $rightImage = document.createElement("span");
            $rightImage.id = `right`+ loc.id + `Char` + i + `Image`;
            $rightImage.width = 200;
            $rightImage.height = 200;
            
            let $rightSlot = loc.AddCharSlot("right",$rightSelector.id,$rightImage.id);
            
            col2.innerHTML = ($rightSelector.innerHTML);
            col2.prepend($rightImage);
            
            document.getElementById($rightSelector.id).addEventListener("change", function() {
                console.log("right slot event");
                window.gameHandler.uiHandler.UpdateCharImage($rightSlot);
            });
            

        }
        
        const $locImg = document.createElement("img");
        $locImg.src = loc.image;
        col1.append($locImg);
        
        this.locationTable.append(row);
        
        //this.UpdateSelectorsAndCharImages();
        
        
    }
    
    SetSelectorId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `Selector`
    }
        
    GetSelectorHTML(id){
        
        //console.log(id);
        
        let $returnString = `<select name="Character" style="margin-top:50%" id="` + id + `">`;
        
        for(const char of this.availableChars){
            
            $returnString += `<option value="` + char.name + `">` + char.name + `</option>`;
        }
        
        $returnString += `</select>`;
        
        return $returnString;
    }
}