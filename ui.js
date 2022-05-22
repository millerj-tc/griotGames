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
        
        console.log(document.getElementById(slot.selectId));
        console.log(document.getElementById(slot.selectId).value);
        
        slot.character
        
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
        
        for(let i = 0; i < charSlots; i++){
            
            let $leftSelector = {}; //= document.createElement("span");
            $leftSelector.id = this.SetSelectorId(loc.id,i);
            $leftSelector.innerHTML = this.GetSelectorHTML($leftSelector.id);
            
            console.log($leftSelector);
            
            const $leftImage = document.createElement("span");
            $leftImage.id = `left`+ loc.id + `Char` + i + `Image`;
            $leftImage.width = 200;
            $leftImage.height = 200;
            
            let $leftSlot = loc.AddCharSlot("left",$leftSelector.id,$leftImage.id)
            
            document.getElementById($leftSelector.id).addEventListener("change", function() {
                window.gameHandler.uiHandler.UpdateCharImage($leftSlot);
            });
            
            col0.append($leftSelector);
            col0.append($leftImage);
            
            const $rightSelector = document.createElement("span");
            $rightSelector.id = `right`+ loc.id + `Char` + i + `Select`;
            $rightSelector.innerHTML = this.SetSelectorToAvailableChars(loc.id);
            
            $rightSelector.addEventListener("change", function() {
                
                //console.log("inline test");
                window.gameHandler.uiHandler.UpdateCharImage();
            });
            
            const $rightImage = document.createElement("canvas");
            $rightImage.id = `right`+ loc.id + `Char` + i + `Image`;
            $rightImage.width = 200;
            $rightImage.height = 200;
            
            col2.append($rightSelector);
            col2.append($rightImage);
        }
        
        const $locImg = document.createElement("img");
        $locImg.src = loc.image;
        col1.append($locImg);
        
        this.locationTable.append(row);
        
        //this.UpdateSelectorsAndCharImages();
        
        
    }
    
    SetSelectorId(locId,slotNum){
        
        return locId + slotNum + `Selector`
    }
        
    GetSelectorHTML(id){
        
        //console.log(id);
        
        let $returnString = `<select name="Character" id="` + id + `">`;
        
        for(const char of this.availableChars){
            
            $returnString += `<option value="` + char.name.toLowerCase() + `">` + char.name + `</option>`;
        }
        
        $returnString += `</select>`;
        
        return $returnString;
    }
}