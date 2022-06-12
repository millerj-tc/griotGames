export class character
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
    }
    
    AddGenericProperties(){

            this.data.xp = {left:0,right:0};
            this.data.removedDuringRun = false;
            this.data.skipPhases = [];
    }
    
    GetName() return this.data.name
    
    GetImage(size = "S"){
        
        if(size == "S") return this.data.imageS
        else if(size == "M") return this.data.imageM
        else if(size == "L") return this.data.imageL
        else console.warn("GetImage has failed for " + this.data.name);   
    }
    
    
    
    GetEnemyAlignment(){
        
        if(this.alignment == "left") return "right";
        else if(this.alignment == "right") return "left";
        else {
            console.warn(".GetEnemyAlignment() is malfunctioning, my name is " + this.name + " and my alignment is " + this.alignment);
        }
    }
}