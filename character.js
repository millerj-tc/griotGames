export class character
{
    constructor(scenarioHandler){
        
        this.scenarioHandler = scenarioHandler;
    }
    
    AddGenericProperties(){

            this.data.xp = {left:0,right:0};
            this.data.alignment;
            this.data.removedDuringRun = false;
            this.data.skipPhases = [];
            this.data.immuneSys = []; //immuneSys is going to be the holder for received statusFX
    }
    
    GetName() {return this.data.name}
    
    GetImage(size = "S"){
        
        if(size == "S") return this.data.imageS
        else if(size == "M") return this.data.imageM
        else if(size == "L") return this.data.imageL
        else console.warn("GetImage has failed for " + this.data.name);   
    }
    
    GetPronouns() {return this.data.pronouns}
    
    GetAlignment() {return this.alignment}
    
    GetEnemyAlignment(){
        
        if(this.data.alignment == "left") return "right";
        else if(this.data.alignment == "right") return "left";
        else {
            console.warn(".GetEnemyAlignment() is malfunctioning, my name is " + this.name + " and my alignment is " + this.data.alignment);
        }
    }
}