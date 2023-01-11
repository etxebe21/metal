//Clase que gestiona el tileSet de un sprite
export default class imageSet
{
    constructor (initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset)
    {
        this.initFil    = initFil;     //Fila de inico de nuestro ImageSet
        this.initCol    = initCol;     //Columna de inicio de nuestro ImageSet
        this.xSize      = xSize;       //Tamaño en píxeles de la imagen (X)
        this.ySize      = ySize;       //Tamaño n pixeles de la imagen (Y)
        this.xOffset    = xOffset;     //Offset en X de comienzo de dibujo ndel personaje respecto a la rjilla
        this.yOffset    = yOffset;    //Offset en Y de comienzo """"
        this.gridSize   = gridSize;    //Tamaño en píxeles de la rejilla contenedora de la imagen (X e Y)
    }
}