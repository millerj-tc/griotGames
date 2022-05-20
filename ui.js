export class cropper
{
    constructor(){}
    
    CropImg(){
        const canvas = document.getElementById('loc0lImg');

        const ctx = canvas.getContext('2d');

        var image = new Image();
        image.src = "./images/valakut.jpg";
        
        const $sourceX = image.width * 0.1;
        const $sourceY = image.height * 0.06;
        const $sourceWidth = image.width * 0.8;
        const $sourceHeight = image.height * 0.6;
        const $destWidth = canvas.width;
        const $destHeight = canvas.height;
        
  
        image.onload = function(){
            ctx.drawImage(image, $sourceX, $sourceY, $sourceWidth, $sourceHeight, 0, 0, $destWidth, $destHeight);
        }
    }
}