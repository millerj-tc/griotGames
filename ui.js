import {rosterLocScreen} from "./uiStrings.js";

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




export class uiHandler
{
    constructor(){
        
        this.availableChars = ["Ajani","Anafenza","Chainer","Chandra","Garruk","Gerrard","Gideon","Jace","Karn","Kaya","Liliana","Mirri","Nicol Bolas","Nissa","Olivia Voldaren","Oona","Sorin Markov","Squee","Teferi","Tezzeret","Thalia","Umezawa","Urza"];
        
        this.locationTable;
        
    }
    
    Start(){
        
        document.getElementById("content").innerHTML = rosterLocScreen;
        
        this.CreateLocationTable();
        
        this.CreateLocationRow("valakut");
        
        //document.getElementById("loc0lChar0Sel").innerHTML = this.SetSelectorToAvailableChars("loc0lChar0Sel");
    }
    
    CreateLocationTable(){
        
        this.locationTable = document.createElement("table");
        document.getElementById("content").append(this.locationTable);
    }
    
    CreateLocationRow(img,charSlots){
        
        const row = document.createElement("tr");
        const col0 = document.createElement("td");
        row.append(col0);
        const col1 = document.createElement("td");
        row.append(col1);
        const col2 = document.createElement("td");
        row.append(col2);
        
        $leftSideCharSelectorHTML = "";
        $rightSideCharSelectorHTML = "";
        
        for(let i = 0; i < charSlots; i++){
            
            $leftSideCharSelectorHTML += `<span id="left`+ img + `Char` + i + `Select"></span><canvas id="left`+ img + `Char` + i + `Image" width="200px" height="200px"></canvas><br>`;
            $rightSideCharSelectorHTML += `<span id="right`+ img + `Char` + i + `Select"></span><canvas id="right`+ img + `Char` + i + `Image" width="200px" height="200px"></canvas><br>`;
        }
        
        col0.innerHTML = $leftSideCharSelectorHTML;
        col1.innerHTML = `<img src="/images/` + img + `.png">`;
        col2.innerHTML = $rightSideCharSelectorHTML;
        
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