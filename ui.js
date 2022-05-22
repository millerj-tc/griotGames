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
        
        this.availableChars = ["Ajani","Anafenza","Chainer","Chandra","Garruk","Gerrard","Gideon","Jace","Karn","Kaya","Liliana","Mirri","Nicol Bolas","Nissa","Olivia Voldaren","Oona","Sorin Markov","Squee","Teferi","Tezzeret","Thalia","Umezawa","Urza"];
        
        this.locationTable;
        
    }
    
    CreateLocationTable(){
        
        this.locationTable = document.createElement("table");
        document.getElementById("content").innerHTML = "";
        document.getElementById("content").prepend(this.locationTable);
    }
    
    UpdateCharImage(span){
        
        span
        
    }
    
    CreateLocationRow(loc,charSlots){
        
        const row = this.locationTable.insertRow(0);
        const col0 = row.insertCell(0);
        const col1 = row.insertCell(1);
        const col2 = row.insertCell(2);
        
        for(let i = 0; i < charSlots; i++){
            
            const $leftSelector = document.createElement("span");
            $leftSelector.id = `left`+ loc.id + `Char` + i + `Select`;
            $leftSelector.innerHTML = this.SetSelectorToAvailableChars(loc.id);
            
            const $leftImage = document.createElement("span");
            $leftImage.id = `left`+ loc.id + `Char` + i + `Image`;
            $leftImage.width = 200;
            $leftImage.height = 200;
            
            $leftSelector.addEventListener("change", function() {
                this.UpdateCharImage($leftImage);
            });
            
            col0.append($leftSelector);
            col0.append($leftImage);
            
            const $rightSelector = document.createElement("span");
            $rightSelector.id = `right`+ loc.id + `Char` + i + `Select`;
            $rightSelector.innerHTML = this.SetSelectorToAvailableChars(loc.id);
            
            $rightSelector.addEventListener("change", function() {
                this.UpdateSelectorsAndCharImages();
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
        
    SetSelectorToAvailableChars(id){
        
        //console.log(id);
        
        let $returnString = `<select name="Character" id="` + id + `">`;
        
        for(const char of this.availableChars){
            
            $returnString += `<option value="` + char.toLowerCase() + `">` + char + `</option>`;
        }
        
        $returnString += `</select>`;
        
        return $returnString
    }
}