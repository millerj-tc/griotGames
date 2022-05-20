//infighting mechanics -- mult characters with high cume %ile in same area disagree with each other

// inlcude little call outs that give hints to stats

import {magicData} from "./magicData.js";

export class scenarioEvaluator
{
    constructor(gameHandler){
        
        this.gameHandler = gameHandler;
        this.leftTeamChars = ["Umezawa","Thalia","Chandra","Squee","Nicol Bolas"];
        this.rightTeamChars = ["Nissa","Gideon","Jace","Mirri","Chainer"];
        
        this.charData = magicData;
    }
    
    EvaluateBattleForValakut(){
        
        $leftTeamValaPow = 0;
        $rightTeamValaPow = 0;
        
        for(let i = 0; i < 1; i++){
            
            $leftTeamValaPow += this.GetPerCardValue("power",this.gameHandler.database.GetObjFromString(this.leftTeamChars[i]));
            $rightTeamValaPow += this.GetPerCardValue("power",this.gameHandler.database.GetObjFromString(this.rightTeamChars[i]));
        }
        
        if($leftTeamValaPow > $rightTeamValaPow){
            
            
        }
    }
    
    GetStringOfCharsAtLoc(loc){
        
        let $nameArr = [];
        
        for(const char of loc.characters){
            
            $nameArr.push(char.name);
        }
        
        let $returnString = "";
        
        for(let i = 0; i < $nameArr.length; i++){
            
            if(i == $nameArr.length - 1){
                
                $returnString += " and " + $nameArr[i];
            }
            else $returnString += $nameArr[i] + ",";
        }
        
        return $returnString
    }
    
    GetPerCardValue(value,char){
        
        return char[value]/char.cards
    }
    
    GetGreatestPerCardValue(value){
        
        if(typeof value != "string") console.warn("scenarioEvaluator.GetGreatestPerCardValue(value) is not a string!!");
        
        let $highestValue = 0;
        
        let $returnedChars = [];
        
        for(const char of arguments){
            
            if(char == arguments[0]) continue
            
            if(char[value]/char.cards > $highestValue){
                
                $returnedChars = [];
                
                $returnedChars.push(char);
            }
            if(char[value]/char.cards == $highestValue){
                
                $returnedChars.push(char);
            }
        }
        
        console.log($returnedChars);
        
       return $returnedChars;
    }
}