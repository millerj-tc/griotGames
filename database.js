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
    
    ModData(){
        
        for(const obj of this.data){
            
            obj.sumPower = obj.power;
            obj.power = obj.sumPower/obj.cards;
            obj.sumToughness = obj.toughness;
            obj.toughness = obj.sumToughness/obj.cards;
            obj.sumStrategy = obj.strategy;
            obj.strategy = obj.sumStrategy/obj.cards;
            obj.sumSpeed = obj.speed;
            obj.speed = obj.sumSpeed/obj.cards;
            obj.sumRenown = obj.renown;
            obj.renown = obj.sumRenown/obj.cards;
            obj.sumCunning = obj.cunning;
            obj.cunning = obj.sumCunning/obj.cards;
            
        }
        
        this.OutputData();
    }
}

