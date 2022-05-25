export function GetStringOfCharsFromArray(array,alignment = "any",getPics=false){
        
        let $nameArr = [];
        
        if(array.length == 1){
            
            let $pushedString;
            
            const $thumbImg = document.createElement("img");
            $thumbImg.style.verticalAlign = "middle";
            //console.log(array);
            $thumbImg.src = array[0].image75;
            
            if(getPics == true){ 
                $pushedString = $thumbImg.outerHTML + " " + array[0].name;
            }
            else $pushedString = array[0].name;
            
            if(alignment == "any") return $pushedString;
            else if(array[0].alignment == alignment) return $pushedString;
        }
        
        for(const char of array){
            
            let $pushedString;
            
            const $thumbImg = document.createElement("img");
            $thumbImg.src = char.image75;
            
            //console.log($thumbImg);
            
            if(getPics == true) $pushedString = $thumbImg.outerHTML+ " " +char.name ;
            else $pushedString = char.name
            
            if(alignment == "any") $nameArr.push($pushedString) 
            else if(char.alignment == alignment) $nameArr.push($pushedString) 
            
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

export function ReplaceWordsBasedOnPluralSubjects(array,string){
    
    let $returnString = string;
    
    if($returnString.match(/\[\[(.*?)\]\]/) == null) return $returnString
    
    if(array.length < 1) console.warn("ReplaceWordsBasedOnPluralSubjects passed 0 length array!")
    
    let $modifiedGroup;
    
    let $matches;
    
    const $matchCount = $returnString.match(/\[\[(.*?)\]\]/g).length;
    
    console.log($returnString.match(/\[\[(.*?)\]\]/g));
    
    for(let i = 0; i < $matchCount; i ++){
        
         $modifiedGroup = $returnString.match(/\[\[(.*?)\]\]/)[1];
        
        if(array.length == 1) $modifiedGroup = $modifiedGroup.split("/")[0]
        else if(array.length > 1) $modifiedGroup = $modifiedGroup.split("/")[1]
    
        $returnString = $returnString.replace(/\[\[(.*?)\]\]/,$modifiedGroup);
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

export function GetCharsByAlignment(pool,alignment){
    
    let $returnArr = [];
    
    for(const char of pool){
        
        if(char.alignment == alignment) $returnArr.push(char)
    }
    
    return $returnArr
}

export function GetMean(arr){
    
    let mean = arr.reduce((acc, curr)=>{
	return acc + curr
}, 0) / arr.length;
    
    return mean
}

export function StandardDeviation(arr){
    
let mean = GetMean(arr);

arr = arr.map((el)=>{
	return (el - mean) ** 2
})

let total = arr.reduce((acc, curr)=> acc + curr, 0);

return Math.sqrt(total / arr.length)
}