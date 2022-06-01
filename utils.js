export function GetStringOfCharsFromArray(array,alignment = "any",getPics=""){
        
        let $passedArray = array;
    
        let $nameArr = [];
    
        let $debug = false;
    
        if($passedArray.hasOwnProperty("dataType") && $passedArray.dataType == "char") $passedArray = [$passedArray];
    
        //if($passedArray.length > 1) $debug = true;
    
        if($debug) console.log($passedArray);
        
        for(const char of $passedArray){
            
            let $pushedString;
            
            const $thumbImg = document.createElement("img");
            $thumbImg.src = char["image" + getPics];
            
            let $leftBar = document.createElement("img");
            if(char.alignment == "left") $leftBar.src = "images/leftBar" + getPics + ".png";
            else $leftBar = document.createElement("span");
            
            let $rightBar = document.createElement("img");
            if(char.alignment == "right") $rightBar.src = "images/rightBar" + getPics + ".png";
            else $rightBar = document.createElement("span");
            
            //
            
            if(getPics != "") $pushedString = $leftBar.outerHTML + $thumbImg.outerHTML + $rightBar.outerHTML + " " + char.name ;
            else $pushedString = char.name
            
            if(alignment == "any") $nameArr.push($pushedString) 
            else if(char.alignment == alignment) $nameArr.push($pushedString) 
            
        }
        
        if($debug) console.warn($nameArr);
        
        let $returnString = "";
        
        for(let i = 0; i < $nameArr.length; i++){
            
            if($nameArr.length == 1) return $nameArr[0];
            else if(i == $nameArr.length - 1){
                
                $returnString += " and " + $nameArr[i];
            }
            else if($nameArr.length == 2) $returnString += $nameArr[i]
            else $returnString += $nameArr[i] + ",";
        }
    
        //console.log($returnString)
        
        return $returnString
    }

export function ReplacePronouns(char,string){
    
    let $returnString = string;
    
    $returnString = $returnString.replaceAll("[they]",char.pronouns.they);
    
    $returnString = $returnString.replaceAll("[them]",char.pronouns.them);
    
    $returnString = $returnString.replaceAll("[their]",char.pronouns.their);
    
    $returnString = $returnString.replaceAll("[theirs]",char.pronouns.theirs);
    
    $returnString = $returnString.replaceAll("[themself]",char.pronouns.themself);
    
    $returnString = $returnString.replaceAll("[are]","is");
    
    return $returnString
}

export function ReplaceWordsBasedOnPluralSubjects(array,string){
    
    let $returnString = string;
    
    if($returnString.match(/\[\[(.*?)\]\]/) == null) return $returnString
    
    if(array.length < 1) console.warn("ReplaceWordsBasedOnPluralSubjects passed 0 length array!")
    
    let $modifiedGroup;
    
    let $matches;
    
    const $matchCount = $returnString.match(/\[\[(.*?)\]\]/g).length;
    
    //console.log($returnString.match(/\[\[(.*?)\]\]/g));
    
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