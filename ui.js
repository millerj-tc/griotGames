// random assign button to begin experiments

export class uiHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.availableChars = this.gameHandler.database.data;
        
        this.locationTable;
        
    }
    
    CreateLocationTable(){
        
        this.locationTable = document.createElement("div");
        this.locationTable.style = `display: grid;
            justify-items: center;
            align-items: center;
            grid-template-columns: auto auto auto;
            gap: 10px;
            padding: 10px;`;
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
        
        //const row = this.locationTable.insertRow(0);
        
        //row.style = "fill:#1c87c9;";
        
        let col1 = document.createElement("div");
        this.locationTable.append(col1);
        
        for(let i = 0; i < charSlots; i++){
            
            let col0 = document.createElement("div");
            col0.style = "vertical-align:middle;grid-column-start:1";
            this.locationTable.append(col0);
            
            let col2 = document.createElement("div");
            col2.style = "vertical-align:center;grid-column-start:3";
            this.locationTable.append(col2);
            
            col0.style="vertical-align:middle;";
            
            //console.log("ROW!!!");
            
            let $leftSelector = {}; //= document.createElement("span");
            $leftSelector.id = this.SetSelectorId("left",loc.id,i);
            $leftSelector.innerHTML = this.GetSelectorHTML($leftSelector.id);
            
            //console.log($leftSelector);
            
            const $leftImage = document.createElement("span");
            $leftImage.style = "float:right";
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
            $rightImage.style = "float:left";
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
        col1.style = `justify-items: center;
            align-items: center;
            vertical-align:center;
            text-align:center;
            grid-column-start: 2;
            grid-row-start: 1;
            grid-row-end:` + charSlots + `;`
        
        //this.locationTable.append(row);
        
        //this.UpdateSelectorsAndCharImages();
        
        
    }
    
    SetSelectorId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `Selector`
    }
        
    GetSelectorHTML(id){
        
        //console.log(id);
        
        let $returnString = `<select name="Character" style="margin-top:25%" id="` + id + `">`;
        
        for(const char of this.availableChars){
            
            $returnString += `<option value="` + char.name + `">` + char.name + `</option>`;
        }
        
        $returnString += `</select>`;
        
        return $returnString;
    }
}