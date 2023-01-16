
//Clase gestora de los sprites
export default class Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics)
    {
        this.id                =id;           //Tipo de sprite
        this.state             =state;        //Estado de animación sprite
        this.xPos              =xPos;         //Posicion en X en Canvas
        this.yPos              =yPos;         //Posición en Y en Canvas
        this.imageSet          =imageSet;     //Datos de las imágenes del sprite
        this.frames            =frames;       //Datos de los frames de animación                  
        this.physics           =physics; //Datos de las físicas
    }
}

//cLASE PIRATE
export class Pirate extends Sprite
{
    constructor (id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection)
    {
        //Llamamos al constructor de la clase Sprite
        super (id, state, xPos, yPos, imageSet, frames, physics);

        this.directionChangeCounter      = 0;                 //Contador para cambio direccion(seconds)
        this.maxTimeToChangeDirection    = maxTimeToChangeDirection; //Maximo tiempo para cambio de direccion(seconds)
    }
}