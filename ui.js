export class uiHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.availableChars = this.gameHandler.database.data;
        
        this.locationTable;
        
    }
    
    CreateEvalGoButton(){
        
        const $evalButton = document.createElement("button");
        $evalButton.style = "font-size:32pt"
        $evalButton.onclick = function(){
            
            window.gameHandler.scenarioHandler.gameOver = false;
            
            const $scenarioFXHandler = window.gameHandler.scenarioHandler;
            
            for(const scenfx of $scenarioFXHandler.fxs){
                
                scenfx.currentLeftIncrements = 0;
                scenfx.currentRightIncrements = 0;
            }
            
            window.gameHandler.uiHandler.ClearOutput();
            
            setTimeout(function(){
                window.gameHandler.scenarioHandler.stageHandler.stages[0].Eval()
            },350);
            
        };
        $evalButton.innerHTML = "GO!";
        
        document.getElementById("content").append($evalButton);
    }
    
    CreateLocationTable(){
        
        document.getElementById("content").innerHTML = "";
        
        this.locationTable = document.createElement("div");
        this.locationTable.style = `display: grid;
            justify-items: center;
            align-items: center;
            grid-template-columns: auto auto auto;
            gap: 10px;
            padding: 10px;`;
        
        document.getElementById("content").append(this.locationTable);
        
        const $col0Head = document.createElement("div");
        let $span = document.createElement("span");
        $span.style.color = "blue";
        $span.style.fontWeight = "bold";
        $span.style.fontSize = "24pt";
        $span.innerHTML = "Left Team";
        $col0Head.append($span);
        this.locationTable.append($col0Head);
        
        const $col1Head = document.createElement("div");
        let $mspan = document.createElement("span");
        $mspan.style.fontWeight = "bold";
        $mspan.style.fontSize = "24pt";
        $mspan.innerHTML = "Locations";
        $col1Head.append($mspan);
        this.locationTable.append($col1Head);
        
        const $col2Head = document.createElement("div");
        let $rspan = document.createElement("span");
        $rspan.style.color = "red";
        $rspan.style.fontWeight = "bold";
        $rspan.style.fontSize = "24pt";
        $rspan.innerHTML = "Right Team";
        $col2Head.append($rspan);
        this.locationTable.append($col2Head);
    }
    
    UpdateCharImage(slot){
        
        //console.log(slot);
        //console.log(document.getElementById(slot.selectId));
        //console.log(document.getElementById(slot.selectId).value);
        
        const $character = this.gameHandler.database.GetObjFromString(document.getElementById(slot.selectId).value);
        
        //slot.UpdateChar($character);
        
        document.getElementById(slot.imageSpanId).innerHTML = `<img src="` + slot.character.image125 + `">`;
        
    }
    
    ClearOutput(){
        
        document.getElementById("output").innerHTML = "";
    }
    
    UpdateOutput(string){
        
        document.getElementById("output").innerHTML += string;
    }
    
    CreateLocationRow(loc,charSlots){
        
        //const row = this.locationTable.insertRow(0);
        
        //row.style = "fill:#1c87c9;";
        
        let col0 = document.createElement("div");

        let col1 = document.createElement("div");

        let col2 = document.createElement("div");

        
        this.locationTable.append(col0);
        this.locationTable.append(col1);
        this.locationTable.append(col2);
        
        for(let i = 0; i < charSlots; i++){
            
            let $leftSlotDiv = document.createElement("div");
            $leftSlotDiv.id = this.SetDivId("left",loc.id,i);
            $leftSlotDiv.style = "min-height:125px;grid-column-start:1;";
            col0.append($leftSlotDiv);
            
            let $rightSlotDiv = document.createElement("div");
            $rightSlotDiv.id = this.SetDivId("right",loc.id,i);
            $rightSlotDiv.style = "min-height:125px;grid-column-start:3";
            col2.append($rightSlotDiv);
            
            //console.log("ROW!!!");
            
            let $leftSelector = document.createElement("select");
            $leftSelector.style = "position:relative;top:" + $leftSlotDiv.clientHeight/2 + "px;";
            $leftSelector.id = this.SetSelectorId("left",loc.id,i);
            
            //console.log($leftSelector);
            
            const $leftImage = document.createElement("span");
            $leftImage.style = "float:right";
            $leftImage.id = `left`+ loc.id + `Char` + i + `Image`;
            $leftImage.width = 200;
            $leftImage.height = 200;
            
            let $leftSlot = loc.AddCharSlot("left",$leftSelector.id,$leftImage.id);
            
            
            $leftSlotDiv.append($leftSelector);
            $leftSlotDiv.append($leftImage);
            
            this.AddSelectorOptions($leftSelector,$leftSlot);
            
            $leftSelector.addEventListener("change", function() {
                //console.log("left slot event");
                //window.gameHandler.uiHandler.UpdateCharImage($leftSlot);
                //console.log(window.gameHandler.database.GetObjFromString($leftSelector.value));
                const $charObj = window.gameHandler.database.GetObjFromString($leftSelector.value);
                $leftSlot.UpdateChar($charObj);
            });
            
            let $rightSelector = document.createElement("select");
            $rightSelector.style = "position:relative;top:" + $rightSlotDiv.clientHeight/2 + "px;";
            $rightSelector.id = this.SetSelectorId("right",loc.id,i);
            
            
            //console.log($leftSelector);
            
            const $rightImage = document.createElement("span");
            $rightImage.style = "float:left";
            $rightImage.id = `right`+ loc.id + `Char` + i + `Image`;
            $rightImage.width = 200;
            $rightImage.height = 200;
            
            let $rightSlot = loc.AddCharSlot("right",$rightSelector.id,$rightImage.id);
            
            $rightSlotDiv.append($rightImage);
            $rightSlotDiv.append($rightSelector);
            
            this.AddSelectorOptions($rightSelector,$rightSlot);
            
            
            //col2.append($rightSlot);
            
            $rightSelector.addEventListener("change", function() {
                //console.log("right slot event");
                const $charObj = window.gameHandler.database.GetObjFromString($rightSelector.value);
                $rightSlot.UpdateChar($charObj);
            });
            

        }
        
        let $locCount = this.gameHandler.scenarioHandler.locationHandler.locations.length;
        
        let $locImg = document.createElement("img");
        //console.log($locImg);
        $locImg.src = loc.image;
        col1.append($locImg);
        col1.style = `justify-items: center;
            align-items: center;
            vertical-align:center;
            text-align:center;
            grid-column-start: 2;
            grid-row-start: ` + Number(1 + $locCount) + `;
            grid-row-end:` + Number($locCount + charSlots) + `;`
        
        //this.locationTable.append(row);
        
        //this.UpdateSelectorsAndCharImages();
        
        
    }
    
    SetDivId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `SlotDiv`
    }
    
    SetSelectorId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `Selector`
    }
    
    SetSelectorToChar(selector,char){
        
        //console.log(selector.length);
        
        for(let i=0; i < selector.length; i++){
            
            //console.log(selector.options[i]);
            
            if(selector.options[i].text == char.name){ 
                //console.log("setting " + selector + " to " + char.name);
                selector.selectedIndex = i;
            }
        }
    }
        
    AddSelectorOptions(selector,slot){ 
        
        for(const char of this.availableChars){
            
            let $option = document.createElement("option");
            
            $option.text = char.name;
            
            selector.add($option);
        }
        
        //selector.selectedIndex = Math.floor(Math.random()*selector.length);
        
       // this.UpdateCharImage(slot);
        
        //$returnString += `</select>`;
        
        //return $returnString;
    }
}