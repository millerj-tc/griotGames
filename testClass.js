export class parentClass{
    
    constructor(){
        
        
    }
    
    Test(){
        
        console.log("test");
    }
}

export class childClass extends parentClass{
    
    constructor(){
        
        super();
    }
    
    Test(){
        
        super.Test();
        
        console.log("_2");
    }
}