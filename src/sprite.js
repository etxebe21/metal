
//Clase gestora de los sprites
export default class Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames)
    {
        this.id                =id;           //Tipo de sprite
        this.state             =state;        //Estado de animación sprite
        this.xPos              =xPos;         //Posicion en X en Canvas
        this.yPos              =yPos;         //Posición en Y en Canvas
        this.imageSet          =imageSet;     //Datos de las imágenes del sprite
        this.frames            =frames;       //Datos de los frames de animación                  

    }

}