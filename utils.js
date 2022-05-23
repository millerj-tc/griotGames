export function GetStringOfCharsFromArray(array,alignment = "any"){
        
        let $nameArr = [];
        
        if(array.length == 1){
            
            if(alignment == "any") return array[0].name;
            else if(array[0].alignment == alignment) return array.name;
        }
        
        for(const char of array){
            
            if(alignment == "any") $nameArr.push(char.name) 
            else if(char.alignment == alignment) $nameArr.push(char.name) 
            
        }
        
        //console.log($nameArr);
        
        let $returnString = "";
        
        for(let i = 0; i < $nameArr.length; i++){
            
            if(i == $nameArr.length - 1){
                
                $returnString += " and " + $nameArr[i];
            }
            else if($nameArr.length == 2) $returnString += $nameArr[i]
            else $returnString += $nameArr[i] + ",";
        }
        
        return $returnString
    }

export function ShuffleArray(array) {
    
    
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return [...array]
}