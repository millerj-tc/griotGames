class gridElement
{
    constructor(DOM,startX,startY,endX = startX, endY = startY){
        
        this.DOM = DOM;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.customClasses = [];
    }
    
    AddCustomClasses(classes){ //arr
        
        for(const cls of classes){
            
            this.customClasses.push(cls);
        }
    }
    
    ClearCustomClasses(){
        
        this.customClasses = [];
    }
}

export class gridDOMHandler
{
    constructor(uiHandler){
        
        this.DOM;
        this.uiHandler = uiHandler;
        this.gridElements = [];
    }
    
    PrepGridElement(DOM,startX,startY,endX = startX, endY = startY){
        
        const $ge = new gridElement(DOM,startX,startY,endX,endY);
        
        this.gridElements.push($ge);
    
        return $ge
    }
    
    _InsertGridElement(ge){
        
        this.DOM.append(ge.DOM);
        
        ge.DOM.style.gridColumnStart = ge.startX;
        ge.DOM.style.gridColumnEnd = ge.endX;
        ge.DOM.style.gridRowStart = ge.startY;
        ge.DOM.style.gridRowEnd = ge.endY;
    }
    
    _SetGridWidth(){
        
        const xs = this.gridElements.map(object => {
            return object.endX;
        });

        const maxX = Math.max(...xs);
        
        let $gridTemplateColumns = "auto";
        
        for(let i = 1; i < maxX; i++){
            
            $gridTemplateColumns += " auto";
        }
        
        this.DOM.style.gridTemplateColumns = $gridTemplateColumns;
        
    }
    
    BuildGrid(customClasses){ //arr
        
        this.DOM = document.createElement("div");
        this.DOM.style.display = "grid";
        
        for(const cls of customClasses){
            
            this.DOM.classList.add(cls);
        }
        
        this._SetGridWidth();
        
        return this.DOM
    }
}