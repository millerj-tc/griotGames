class gridElement
{
    constructor(DOM,gridAreaId){
        
        this.DOM = DOM;
        this.DOM.style.gridArea = gridAreaId;
        this.customClasses = [];
    }
    
    AddCustomClasses(classes =[]){ //arr
        
        for(const cls of classes){
            
            this.DOM.classList.add(cls);
        }
    }
}

export class gridDOMHandler
{
    constructor(uiHandler){
        
        this.DOM;
        this.uiHandler = uiHandler;
        this.gridElements = [];
    }
    
    PrepGridElement(DOM,gridAreaId){
        
        const $ge = new gridElement(DOM,gridAreaId);
        
        this.gridElements.push($ge);
    
        return $ge
    }
    
    _AppendGridElement(ge){
        
        this.DOM.append(ge.DOM);
    }
    
    ApplyClassesToAllGridElements(customClasses){ //arr
        
        for(const ge of this.gridElements){
            
            for(const cls of customClasses){
                
                ge.DOM.classList.add(cls);
            }
        }
    }
    
    BuildGrid(customClasses =[]){ //arr
        
        this.DOM = document.createElement("div");
        this.DOM.style.display = "grid";
        
        for(const cls of customClasses){
            
            this.DOM.classList.add(cls);
        }
                
        for(const ge of this.gridElements){
            
            this._AppendGridElement(ge);
        }
        
        return this.DOM
    }
}