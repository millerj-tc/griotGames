//infighting mechanics -- mult characters with high cume %ile in same area disagree with each other

// inlcude little call outs that give hints to stats

/* what different fx can comparing numbers have that are interesting?
 - knock people out of evaluations
 - flip evaluation
 - group by x, evaluate by y
 - winning one stage makes the other team have to take the harder road on the other
*/

import {magicData} from "./magicData.js";

export class scenarioEvaluator
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        
        this.valakut = {characters:[]};
        
        this.AssignCharWithAlignmentToLoc("Umezawa","left",this.valakut);
        this.AssignCharWithAlignmentToLoc("Thalia","left",this.valakut);
        this.AssignCharWithAlignmentToLoc("Chandra","left",this.valakut);
        this.AssignCharWithAlignmentToLoc("Squee","left",this.valakut);
        this.AssignCharWithAlignmentToLoc("Nicol Bolas","left",this.valakut);
        
        this.AssignCharWithAlignmentToLoc("Nissa","right",this.valakut);
        this.AssignCharWithAlignmentToLoc("Gideon","right",this.valakut);
        this.AssignCharWithAlignmentToLoc("Jace","right",this.valakut);
        this.AssignCharWithAlignmentToLoc("Mirri","right",this.valakut);
        this.AssignCharWithAlignmentToLoc("Chainer","right",this.valakut);
    }
    
    AssignCharWithAlignmentToLoc(char,align,loc){
        
        const $char = this.gameHandler.database.GetObjFromString(char);
        $char.alignment = align;
        loc.characters.push($char);
    }
    
    EvaluateBattleForValakut(){
        
        let $toughest = this.GetStringOfCharsFromArray(this.GetGreatestPerCardValue("toughness",this.valakut.characters));
        
        console.log($toughest + " has braved the fires of Valakut and gained invaluable information! Their teammates will have a great tactical advantage.")
        
    }
    
    GetCharsAtLoc(loc,alignment = "any"){
        
        let $returnArr = [];
        
        for(const char of loc.characters){
            
            if(alignment == "any") $returnArr.push(char);
            else if(char.alignment == alignment) $returnArr.push(char);
        }
        
        return $returnArr
    }
    
    GetStringOfCharsFromArray(array,alignment = "any"){
        
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
    
    GetPerCardValue(value,char){
        
        return char[value]/char.cards
    }
    
    GetGreatestPerCardValue(value,arrayOfChars){
        
        if(typeof value != "string") console.warn("scenarioEvaluator.GetGreatestPerCardValue(value) is not a string!!");
        
        let $highestValue = 0;
        
        let $returnedChars = [];
        
        for(const char of arrayOfChars){
            
            if(char[value]/char.cards > $highestValue){
                
                $returnedChars = [];
                
                $returnedChars.push(char);
            }
            if(char[value]/char.cards == $highestValue){
                
                $returnedChars.push(char);
            }
        }
        
        //console.log($returnedChars);
        
       return $returnedChars;
    }
}