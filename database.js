class database
{
    constructor(){
        
        this.data = [{name:"Elixir",Heals:10,Omega:4},{name:"Panacea",Heals:9},{name:"Silver Surfer",Heals:8},{name:"Angel",Heals:7},{name:"Iron Fist",Heals:6},{name:"Black Tarantula",Heals:5},{name:"Scarlet Witch",Heals:4},{name:"Mister Negative",Heals:3},{name:"Healer",Heals:2},{name:"Exodus",Heals:1,Omega:10},{name:"Beast",Wits:10,Charm:8},{name:"Prodigy",Wits:9},{name:"Charles Xavier",Wits:8,Charm:6},{name:"Dr. Moira MacTaggert",Wits:7},{name:"Mister Sinister",Wits:6},{name:"M",Wits:5},{name:"Kitty Pryde",Wits:4,Charm:10},{name:"Dr. Nemesis",Wits:3},{name:"Forge",Wits:2},{name:"Sage",Wits:1},{name:"Colossus",Charm:9},{name:"Storm",Charm:7,Bravery:9,Omega:9},{name:"Nightcrawler",Charm:5},{name:"Jean Grey",Charm:4,Bravery:6,Omega:8},{name:"Rogue",Charm:3},{name:"Wolverine",Charm:2,Bravery:10},{name:"Cyclops",Charm:1,Bravery:7},{name:"Magneto",Bravery:8,Omega:11},{name:"Mystique",Bravery:5},{name:"Sabretooth",Bravery:4},{name:"X23",Bravery:3},{name:"Rachel Summers",Bravery:2},{name:"Bishop",Bravery:1},{name:"Jamie Braddock",Omega:15},{name:"Mister M",Omega:14},{name:"Vulcan",Omega:13},{name:"Legion",Omega:12},{name:"Iceman",Omega:7},{name:"Proteus",Omega:6},{name:"Quentin Quire",Omega:5},{name:"Hope Summers",Omega:3},{name:"Nate Grey",Omega:2},{name:"Franklin Richards",Omega:1}];
    }
    
    OutputData(){
        
        let $outputString = "";
        
        for(let i = 0; i < this.data.length; i++){
            
            let obj = this.data[i];
//            
//            $outputString += JSON.stringify(obj);
//            
            $outputString += "<br><br>{";
            
            console.log(obj);
            
            for(const key in obj){
                
                $outputString += "<br>"
                
                $outputString += key + ":";
                
                console.log($outputString);
                
                if(typeof obj[key] == "string"){
                    
                    $outputString += `"` + obj[key] + `"`;
                }
                else $outputString += obj[key];
                
                $outputString += ",";
            }
            
            $outputString = $outputString.slice(0, -1);
            
            $outputString += "<br>";
                
            $outputString += "}";
                
            if(i != this.data.length -1) $outputString += ",";
        }
        
        
        console.table(this.data);
        
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

for(let i = 0; i < $splitStr.length; i++){
    
    let $char = $splitStr[i];
    
    db.AddNewData($char,"Leadership",$splitStr.length-i);
}


function run(){
    console.log("test");
    db.OutputData();
}