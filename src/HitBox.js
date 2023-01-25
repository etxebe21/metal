
//Clase que gestiona el HitBox de un sprite
export default class HitBox
{
    constructor (xSize, ySize, xOffset, yOffset)
    {   
        this.xSize           = xSize;           //Tamaño en pixeles del HitBox (X)
        this.ySize           = ySize;           //Tamaño en pixeles del HitBox (Y)
        this.xOffset         = xOffset;         // Offset en X de comienzo de dibujo del hitbox
        this.yOffset         = yOffset;         //Offset en Y de comienzo hitbox
    }
}