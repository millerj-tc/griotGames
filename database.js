import {xMenData} from "./xmenData.js";
import {magicData} from "./magicData.js";
import {GetCardsFromScryfall} from "./magicDataBuilder.js";

export class database
{
    constructor(){
        
        this.data = magicData;
    }

    DisplayTable(){
        
        console.table(this.data);
    }
    
    GetObjFromString(string){
        
        for(const obj of this.data){
            
            if(obj.name == string) return obj
        }
    }
    
    OutputData(minProps = 0){
        
        console.log(this.data);
        
        let $outputString = "";
        
        for(let i = 0; i < this.data.length; i++){
            
            let obj = this.data[i];
//            
//            $outputString += JSON.stringify(obj);
            
            let $keyString = "";
//            
            $keyString += "<br><br>{";
            
            //console.log(obj);
            
            let $keyCount = 0;
            
            for(const key in obj){
                
                $keyCount++;
                
                $keyString += "<br>"
                
                $keyString += key + ":";
                
                //console.log($outputString);
                
                if(typeof obj[key] == "string"){
                    
                    $keyString += `"` + obj[key] + `"`;
                }
                else $keyString += obj[key];
                
                $keyString += ",";
            }
            
            if($keyCount >= minProps) $outputString += $keyString;
            else continue
            
            $outputString = $outputString.slice(0, -1);
            
            $outputString += "<br>";
                
            $outputString += "}";
                
            if(i != this.data.length -1) $outputString += ",";
        }
        
        
        //console.table(this.data);
        
        document.body.innerHTML = $outputString;
    }
    
    AddNewData(name,prop,value){
        
        let $modObj = "undefined";
        
        for(const obj of this.data){
            
            if(obj.name == name) $modObj = obj;
        }
        
        if($modObj == "undefined"){
            
            $modObj = {name:name};
            
            this.data.push($modObj);
        }
        
        $modObj[prop] = value;
    }
}

const db = new database()

const $str = `Charles Xavier
Storm
Cyclops
Wolverine
Jean Grey
Kitty Pryde
Magneto
Cable
Havok
Emma Frost`;

const $splitStr = $str.split(/\r?\n/);

//for(let i = 0; i < $splitStr.length; i++){
//    
//    let $char = $splitStr[i];
//    
//    db.AddNewData($char,"Leadership",$splitStr.length-i);
//}