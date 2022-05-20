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
    constructor(){
        
        this.availableChars = ["Ajani","Anafenza","Chainer","Chandra","Garruk","Gerrard","Gideon","Jace","Karn","Kaya","Liliana","Mirri","Nicol Bolas","Nissa","Olivia Voldaren","Oona","Sorin Markov","Squee","Teferi","Tezzeret","Thalia","Umezawa","Urza"];
        
        this.locationTable;
        
    }
    
    CreateLocationTable(){
        
        this.locationTable = document.createElement("table");
        document.getElementById("content").innerHTML = "";
        document.getElementById("content").prepend(this.locationTable);
    }
    
    UpdateSelectorsAndCharImages(){
        
        const table = this.locationTable;  
        
        for(const row of table.rows) {
            
            for(const cell of row.cells){
                
                //console.log(cell);
            }
        }
        
    }
    
    CreateLocationRow(img,charSlots){
        
        const row = this.locationTable.insertRow(0);
        const col0 = row.insertCell(0);
        const col1 = row.insertCell(1);
        const col2 = row.insertCell(2);
        
        for(let i = 0; i < charSlots; i++){
            
            const $leftSelector = document.createElement("span");
            $leftSelector.id = `left`+ img + `Char` + i + `Select`;
            
            $leftSelector.addEventListener("change", function() {
                this.UpdateSelectorsAndCharImages();
            });
            
            const $leftImage = document.createElement("canvas");
            $leftImage.id = `left`+ img + `Char` + i + `Image`;
            $leftImage.width = 200;
            $leftImage.height = 200;
            
            col0.append($leftSelector);
            col0.append($leftImage);
            
            const $rightSelector = document.createElement("span");
            $rightSelector.id = `right`+ img + `Char` + i + `Select`;
            
            $rightSelector.addEventListener("change", function() {
                this.UpdateSelectorsAndCharImages();
            });
            
            const $rightImage = document.createElement("canvas");
            $rightImage.id = `right`+ img + `Char` + i + `Image`;
            $rightImage.width = 200;
            $rightImage.height = 200;
            
            col2.append($rightSelector);
            col2.append($rightImage);
        }
        
        this.locationTable.append(row);
        
        
    }
        
    SetSelectorToAvailableChars(id){
        
        let $returnString = `<select name="Character" id="` + id + `">`;
        
        for(const char of this.availableChars){
            
            $returnString += `<option value="` + char.toLowerCase() + `">` + char + `</option>`;
        }
        
        $returnString += `</select>`;
        
        return $returnString
    }
}