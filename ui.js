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
        
        //console.log(slot);
        //console.log(document.getElementById(slot.selectId));
        //console.log(document.getElementById(slot.selectId).value);
        
        const $selection = document.getElementById(slot.selectId).value;
        
        slot.character = this.gameHandler.database.GetObjFromString($selection);
        
        //console.log(slot.character);
        
        document.getElementById(slot.imageSpanId).innerHTML = `<img src="` + slot.character.image + `">`;
        
    }
    
    Test(){
        
        console.log("test");
    }
    
    CreateLocationRow(loc,charSlots){
        
        //const row = this.locationTable.insertRow(0);
        
        //row.style = "fill:#1c87c9;";
        
        let col0 = document.createElement("div");
        col0.style = "vertical-align:middle";
        let col1 = document.createElement("div");
        col1.style = "vertical-align:middle";
        let col2 = document.createElement("div");
        col2.style = "vertical-align:middle";
        
        this.locationTable.append(col0);
        this.locationTable.append(col1);
        this.locationTable.append(col2);
        
        for(let i = 0; i < charSlots; i++){
            
            let $leftSlotDiv = document.createElement("div");
            $leftSlotDiv.id = this.SetDivId("left",loc.id,i);
            $leftSlotDiv.style = "min-height:250px;grid-column-start:1;";
            col0.append($leftSlotDiv);
            
            let $rightSlotDiv = document.createElement("div");
            $rightSlotDiv.id = this.SetDivId("right",loc.id,i);
            $rightSlotDiv.style = "min-height:250px;grid-column-start:3";
            col2.append($rightSlotDiv);
            
            //console.log("ROW!!!");
            
            let $leftSelector = document.createElement("select");
            $leftSelector.style = "position:relative;top:" + $leftSlotDiv.clientHeight/2 + "px;";
            $leftSelector.id = this.SetSelectorId("left",loc.id,i);
            this.AddSelectorOptions($leftSelector);
            
            //console.log($leftSelector);
            
            const $leftImage = document.createElement("span");
            $leftImage.style = "float:right";
            $leftImage.id = `left`+ loc.id + `Char` + i + `Image`;
            $leftImage.width = 200;
            $leftImage.height = 200;
            
            let $leftSlot = loc.AddCharSlot("left",$leftSelector.id,$leftImage.id);
            
            $leftSlotDiv.append($leftSelector);
            $leftSlotDiv.append($leftImage);
            
            $leftSelector.addEventListener("change", function() {
                //console.log("left slot event");
                window.gameHandler.uiHandler.UpdateCharImage($leftSlot);
            });
            
            let $rightSelector = document.createElement("select");
            $rightSelector.style = "position:relative;top:" + $rightSlotDiv.clientHeight/2 + "px;";
            $rightSelector.id = this.SetSelectorId("right",loc.id,i);
            this.AddSelectorOptions($rightSelector);
            
            //console.log($leftSelector);
            
            const $rightImage = document.createElement("span");
            $rightImage.style = "float:left";
            $rightImage.id = `right`+ loc.id + `Char` + i + `Image`;
            $rightImage.width = 200;
            $rightImage.height = 200;
            
            let $rightSlot = loc.AddCharSlot("right",$rightSelector.id,$rightImage.id);
            
            $rightSlotDiv.append($rightImage);
            $rightSlotDiv.append($rightSelector);
            
            
            //col2.append($rightSlot);
            
            $rightSelector.addEventListener("change", function() {
                //console.log("right slot event");
                window.gameHandler.uiHandler.UpdateCharImage($rightSlot);
            });
            

        }
        
        let $locCount = this.gameHandler.locationHandler.locations.length;
        
        let $locImg = document.createElement("img");
        console.log($locImg);
        $locImg.src = loc.image;
        col1.append($locImg);
        col1.style = `justify-items: center;
            align-items: center;
            vertical-align:center;
            text-align:center;
            grid-column-start: 2;
            grid-row-start: ` + $locCount + `;
            grid-row-end:` + Number($locCount + charSlots - 1) + `;`
        
        //this.locationTable.append(row);
        
        //this.UpdateSelectorsAndCharImages();
        
        
    }
    
    SetDivId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `SlotDiv`
    }
    
    SetSelectorId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `Selector`
    }
        
    AddSelectorOptions(selector){ 
        
        for(const char of this.availableChars){
            
            let $option = document.createElement("option");
            
            $option.text = char.name;
            
            selector.add($option);
        }
        
        //$returnString += `</select>`;
        
        //return $returnString;
    }
}