
import {potfcData} from "./Protectors of the Fey Circle/potfcData.js";
import {StandardDeviation,GetMean} from "./utils.js";


export class database
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.data = marvelData;
    }
    
    GetCharsMoreThanOneStdBelowMeanForValue(value,poolToReturn=this.data,poolToEvaluate=this.data){
        
        let $returnArr = [];
        
        let $valueArr = [];
        
        for(const obj of poolToEvaluate){
            
            if(obj.dataType == "char") $valueArr.push(obj[value]);
        }
        
        const $std = StandardDeviation($valueArr);
            
        const $mean = GetMean($valueArr);
        
        for(const obj of poolToReturn){
            
            if(obj.dataType == "char" && obj[value] < ($mean - $std)) $returnArr.push(obj)
        }
        
        return $returnArr
        
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
    
    AddRankedList(list,prop){
        
        for(let i = 0; i < list.length; i++){
            
            this.AddNewData(list[i],prop,list.length-i);
        }
    }
    
    ModData(){
        
        let $list = `Lizzeeta
Aqee
Vampiress Smim
Hukho
Sinch
Keh
Itaru
Elm
Lily
Izmaela
Viatrix
Leigh
Peneluz
Dayaqa
Brick
Gerard
Arelta`;
            
        $list = $list.split("\n");
            
        this.AddRankedList($list,"cume");
            
        
        
        this.OutputData();
    }
}

