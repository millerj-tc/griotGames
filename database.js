class database
{
    constructor(){
        
        this.data = [{name:"Joseph",birthday:"1989-06-24"},{name:"Adele",birthday:"1995-08-28"}];
    }
    
    OutputData(){
        
        let $outputString = "";
        
        for(let i = 0; i < this.data.length; i++){
            
            let obj = this.data[i];
            
            $outputString += JSON.stringify(obj);
            
            if(i != this.data.length -1) $outputString += ",";
        }
        
        console.log($outputString);
    }
    
    AddNewData(name,prop,value){
        
        let $modObj = "undefined";
        
        for(const obj of this.data){
            
            if(obj.name == name) $modObj = obj;
        }
        
        if($modObj == "undefined"){
            
            let $tempObj = {name:"blank"};
            
            //$modObj = this.data.push($tempObj);
            console.log($modObj);
            $modObj.name = name;
        }
        
        $modObj.prop = prop;
        $modObj.value = value;
    }
}

const db = new database()

const $str = `Elixir
Panacea
Silver Surfer
Angel
Iron Fist
Black Tarantula
Scarlet Witch
Mister Negative
Healer
Exodus`;

const $splitStr = $str.split(/\r?\n/);

for(let i = 0; i < $splitStr.length; i++){
    
    let $char = $splitStr[i];
    
    db.AddNewData($char,"Healing Power",10-i);
}


window.onload = db.OutputData();