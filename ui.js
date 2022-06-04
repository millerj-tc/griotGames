export class uiHandler
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        //this.availableChars = this.gameHandler.database.data;
        
        this.locationTable;
        
        this.rosterViewLocked = false;
        
    }
    
    ResizeOnResize(){
        
        //document.getElementById("content").style.top = "-750px";
        
        if(window.innerWidth < 1150){
    
            document.getElementById("output").style.position = "static";
            document.getElementById("output").style.maxHeight = "";
            document.getElementById("output").style.overflowY = "";
            
            document.getElementById("output").style.fontSize = "calc(12px + 1.5vw)"
            
        }
        else{
            
            document.getElementById("output").style.maxHeight = "90vh"
            document.getElementById("output").style.fontSize = "1.4vw"
            document.getElementById("output").style.position = "fixed"
            document.getElementById("output").style.left = "785px"
            document.getElementById("output").style.textAlign = "left"
            document.getElementById("output").style.padding = "20px"
            document.getElementById("content").style.maxWidth = "75vw";
            document.getElementById("output").style.overflowY = "auto";
        }
    }
    
    _CreateCollapseButton(){
        
        const $collapseButton = document.createElement("button");
        $collapseButton.id = "rosterCollapseButton";
        $collapseButton.style.fontSize = "32pt";
        $collapseButton.style.float = "right";
        $collapseButton.setAttribute("data-collapsed","true");
        
        $collapseButton.onclick = function(){
       
            if($collapseButton.getAttribute("data-collapsed") == "true"){
            
                window.gameHandler.uiHandler.ExpandRosterDisplay();    

            }
            else{
                
                window.gameHandler.uiHandler.CollapseRosterDisplay();
            }

        };
        
        $collapseButton.innerHTML = ">";
        
        document.getElementById("content").append($collapseButton);
    }
    
    CreateLockButton(){
        
        const $lockButton = document.createElement("button");
        $lockButton.id = "rosterLockButton";
        $lockButton.style.fontSize = "15pt";
        $lockButton.style.marginTop = "15px";
        $lockButton.style.float = "right";
        $lockButton.setAttribute("data-locked","false");
        
        $lockButton.onclick = function(){
       
            if(window.gameHandler.uiHandler.rosterViewLocked){
            
                window.gameHandler.uiHandler.rosterViewLocked = false;
                $lockButton.innerHTML = "🔓";    

            }
            else{
                
                window.gameHandler.uiHandler.rosterViewLocked = true;
                $lockButton.innerHTML = "🔒"
            }

        };
        
        $lockButton.innerHTML = "🔓";
        
        document.getElementById("content").append($lockButton);
    }
    
    CollapseRosterDisplay(){
        
        const $collapseButton = document.getElementById("rosterCollapseButton");
        
        $collapseButton.setAttribute("data-collapsed","true");
        document.getElementById("content").style.transform = "translateX(0px)";
        document.getElementById("output").style.transform = "translateX(0px)";
        document.getElementById("output").style.marginRight = "150px";
        $collapseButton.innerHTML = ">";
    }
    
    ExpandRosterDisplay(){
        
        const $collapseButton = document.getElementById("rosterCollapseButton");
        
        const $rosterWidth = document.getElementById("content").clientWidth;
        
        document.getElementById("content").style.transform = "translateX(" + ($rosterWidth - 25) + "px)";
        document.getElementById("output").style.transform = "translateX(" + ($rosterWidth - 25) + "px)";
        document.getElementById("output").style.marginRight = "500px";
        $collapseButton.setAttribute("data-collapsed","false");
        $collapseButton.innerHTML = "<";
    }
    
    CreateEvalGoButton(){
        
        const $evalButton = document.createElement("button");
        $evalButton.style = "font-size:32pt"
        $evalButton.onclick = function(){
            
            window.gameHandler.uiHandler.ClearOutput();
            
            setTimeout(function(){
                
                const $collapseButton = document.getElementById("rosterCollapseButton");
                                
                if($collapseButton.getAttribute("data-collapsed") == "false" && !window.gameHandler.uiHandler.rosterViewLocked){
            
                    window.gameHandler.uiHandler.CollapseRosterDisplay();
                }
                        
                window.gameHandler.ResetGameOnSimulationRun();
                
                window.gameHandler.scenarioHandler.currentScenario.ScenarioRun();
                
                window.gameHandler.scenarioHandler.currentScenario.ScenarioPrep();
            },350);
            
        };
        $evalButton.innerHTML = "See results!";
        
        document.getElementById("content").append($evalButton);
    }
    
    CreateLocationTable(){
        
        const $SH = this.gameHandler.scenarioHandler.currentScenario;
        
        document.getElementById("content").innerHTML = "";
        
        //        if(this.locationTable != null){
//        
//            for(const div of this.locationTable.querySelectorAll("div")){
//
//                div.remove();
//            }
//        }
        
        this.locationTable = document.createElement("div");
        this.locationTable.style = `display: grid;
            justify-items: center;
            align-items: center;
            gap: 5px;
            padding: 5px;`;
        
        let $gridTemplateColumns = "auto";
        
        if($SH.usesLocationAssignment) $gridTemplateColumns += " auto";
        if(!$SH.playingNoninteractiveStages) $gridTemplateColumns += " auto";
        
           
        this.locationTable.style.gridTemplateColumns = $gridTemplateColumns
        
        document.getElementById("content").append(this.locationTable);
        
        const $col0Head = document.createElement("div");
        let $span = document.createElement("span");
        $span.style.color = "blue";
        $span.style.fontWeight = "bold";
        $span.style.fontSize = "24pt";
        $span.innerHTML = "Left Team";
        $col0Head.append($span);
        this.locationTable.append($col0Head);
        
        
        if(this.gameHandler.scenarioHandler.currentScenario.usesLocationAssignment){
            const $col1Head = document.createElement("div");
            let $mspan = document.createElement("span");
            $mspan.style.fontWeight = "bold";
            $mspan.style.fontSize = "24pt";
            $mspan.innerHTML = "Locations";
            $col1Head.append($mspan);
            this.locationTable.append($col1Head);
        }
        
        if(!$SH.playingNoninteractiveStages){
            const $col2Head = document.createElement("div");
            let $rspan = document.createElement("span");
            $rspan.style.color = "red";
            $rspan.style.fontWeight = "bold";
            $rspan.style.fontSize = "24pt";
            $rspan.innerHTML = "Right Team";
            $col2Head.append($rspan);
            this.locationTable.append($col2Head);
            
        }
    }
    
    UpdateCharImage(slot){
        
        
        const $character = this.gameHandler.database.GetObjFromString(document.getElementById(slot.selectId).value);
        
        //slot.UpdateChar($character);
        
        document.getElementById(slot.imageSpanId).innerHTML = `<img src="` + slot.character.imageM + `">`;
        
    }
    
    ClearOutput(){
        
        document.getElementById("output").innerHTML = "";
    }
    
    UpdateOutput(string){
        
        document.getElementById("output").innerHTML += string;
        
        // [[[smim/keh,itaru]]] Keh and Itaru don't trust Smim. <-- indicate groupings of images with /. Create some code to handle 1-4 images per group (nice little grid, etc.)
    }
    
    NewStageOutputDiv(string){
        
        const $div = document.createElement("div");
        
        $div.classList.add("outputDiv");
        
        $div.style.marginBottom = "20px";
        
        $div.innerHTML = string;
        
        document.getElementById("output").append($div);
        
        //console.log($div.querySelector("img"));
        
        if($div.querySelector("img") != undefined) {
            
            console.warn($div.querySelector("img"));
            
            $div.style.minHeight = $div.querySelector("img").naturalHeight;
        }
        
        return $div
    }
    
    CreateLocationRows(){
        
        //this.scenario.scenarioHandler.gameHandler.uiHandler.CreateLocationRow($loc,charSlots,bgColor);
        
        for(const loc of this.gameHandler.scenarioHandler.currentScenario.locationHandler.locations){
            
            loc.charSlots = [];
        
            let col0 = document.createElement("div");
            col0.style.display = "flex";
            col0.style.alignItems = "center";
            col0.style.backgroundColor = loc.bgColor;

            let col1 = document.createElement("div");
            col1.style.backgroundColor = loc.bgColor;

            let col2 = document.createElement("div");
            col2.style.display = "flex";
            col2.style.alignItems = "center";
            col2.style.backgroundColor = loc.bgColor;


            this.locationTable.append(col0);
            if(this.gameHandler.scenarioHandler.currentScenario.usesLocationAssignment) this.locationTable.append(col1);
            if(!this.gameHandler.scenarioHandler.currentScenario.playingNoninteractiveStages) this.locationTable.append(col2);

            const col0Content = document.createElement("div");
            const col1Content = document.createElement("div");
            const col2Content = document.createElement("div");

            col0.append(col0Content);
            if(this.gameHandler.scenarioHandler.currentScenario.usesLocationAssignment) col1.append(col1Content);
            if(!this.gameHandler.scenarioHandler.currentScenario.playingNoninteractiveStages) col2.append(col2Content);
            

            for(let i = 0; i < loc.charSlotsCount; i++){

                let $leftSlotDiv = document.createElement("div");
                $leftSlotDiv.id = this.SetDivId("left",loc.id,i);
                $leftSlotDiv.style = "min-height:125px;grid-column-start:1";

                col0Content.append($leftSlotDiv);

                let $rightSlotDiv = document.createElement("div");
                $rightSlotDiv.id = this.SetDivId("right",loc.id,i);
                $rightSlotDiv.style = "min-height:125px;grid-column-start:3;vertical-align:middle";
                col2Content.append($rightSlotDiv);

                let $leftSelector = document.createElement("select");
                $leftSelector.style = "position:relative;top:" + $leftSlotDiv.clientHeight/2 + "px;";
                $leftSelector.id = this.SetSelectorId("left",loc.id,i);

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

                    const $charObj = window.gameHandler.scenarioHandler.currentScenario.GetScenarioChar($leftSelector.value);
                    $leftSlot.UpdateChar($charObj);
                });

                let $rightSelector = document.createElement("select");
                $rightSelector.style = "position:relative;top:" + $rightSlotDiv.clientHeight/2 + "px;";
                $rightSelector.id = this.SetSelectorId("right",loc.id,i);

                const $rightImage = document.createElement("span");
                $rightImage.style = "float:left";
                $rightImage.id = `right`+ loc.id + `Char` + i + `Image`;
                $rightImage.width = 200;
                $rightImage.height = 200;

                let $rightSlot;

                if(!this.gameHandler.scenarioHandler.currentScenario.playingNoninteractiveStages) $rightSlot = loc.AddCharSlot("right",$rightSelector.id,$rightImage.id);

                $rightSlotDiv.append($rightImage);
                $rightSlotDiv.append($rightSelector);

                this.AddSelectorOptions($rightSelector,$rightSlot);


                //col2.append($rightSlot);

                $rightSelector.addEventListener("change", function() {

                    const $charObj = window.gameHandler.scenarioHandler.currentScenario.GetScenarioChar($rightSelector.value);
                    $rightSlot.UpdateChar($charObj);
                });


            }

            if(this.gameHandler.scenarioHandler.currentScenario.usesLocationAssignment){

                let $locCount = this.gameHandler.scenarioHandler.currentScenario.locationHandler.locations.length;

                let $locImg = document.createElement("img");

                $locImg.src = loc.image;

                col1Content.append($locImg);
                col1Content.style = `justify-items: center;
                    align-items: center;
                    vertical-align:center;
                    text-align:center;
                    grid-column-start: 2;
                    grid-row-start: ` + Number(1 + $locCount) + `;
                    grid-row-end:` + Number($locCount + loc.charSlots) + `;`

            }
            
        }
        
    }
    
    SetRosterCollapsibleCoords(){
        
        const $collapsible = document.getElementById("content");
        
        const $collapsibleLeft = ((-1 * $collapsible.clientWidth) + 50);
        

        
        $collapsible.style.left = $collapsibleLeft + "px";
        
        const $output = document.getElementById("output");
        
        $output.style.left = $collapsibleLeft + $collapsible.clientWidth + 50 + "px";
    }
    
    SetDivId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `SlotDiv`
    }
    
    SetSelectorId(alignment,locId,slotNum){
        
        return alignment + locId + slotNum + `Selector`
    }
    
    SetSelectorToChar(selector,char){
        
        
        if(selector == null) return
        
        if(char == null) return
        
        for(let i=0; i < selector.length; i++){
            
            
            if(selector.options[i].text == char.name){ 

                selector.selectedIndex = i;
            }
        }
    }
        
    AddSelectorOptions(selector,slot){
        
        const $availableChars = this.gameHandler.scenarioHandler.currentScenario.GetAllChars(slot.alignment);
        
        const $alphaSortedChars = $availableChars.sort(function(a, b) {
            let textA = a.name.toUpperCase();
            let textB = b.name  .toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        
        for(const char of $alphaSortedChars){
            
            let $option = document.createElement("option");
            
            $option.text = char.name;
            
            selector.add($option);
        }
    }
}