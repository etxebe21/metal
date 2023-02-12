import { Collision } from "./constants.js";
//Clase gestora de los sprites
export default class Sprite
{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox )
    {
        this.id                               =id;           //Tipo de sprite
        this.state                            =state;        //Estado de animación sprite
        this.xPos                             =xPos;         //Posicion en X en Canvas
        this.yPos                             =yPos;         //Posición en Y en Canvas
        this.imageSet                         =imageSet;     //Datos de las imágenes del sprite
        this.frames                           =frames;       //Datos de los frames de animación                  
        this.physics                          =physics;      //Datos de las físicas
        this.hitBox                           =hitBox;       //Datos hitbox
        this.isCollidingWithPlayer            = false;   //Variable que indica si ha habido colision con player
        this.isCollidingWithObstacleOnTheTop  = false;   //Indica si ha habido colision con n obstaculo hacia arriba 
        this.isCollidingWithObstacleOnTheLeft = false;    //Indica si ha habido colision con n obstaculo hacia izuiqerda
        this.isCollidingWithObstacleOnTheBottom = false;  //Indica si ha habido colision con n obstaculo hacia abajo 
        this.isCollidingWithObstacleOnTheRight  = false;  //Indica si ha habido colision con n obstaculo hacia derecha
        this.isCollision = false;
  
    }
}

// //cLASE Enemy
// export class Enemy extends Sprite
// {
//     constructor (id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection, hitBox)
//     {
//         //Llamamos al constructor de la clase Sprite
//         super (id, state, xPos, yPos, imageSet, frames, physics, hitBox);

//         this.directionChangeCounter      = 0;                 //Contador para cambio direccion(seconds)
//         this.maxTimeToChangeDirection    = maxTimeToChangeDirection; //Maximo tiempo para cambio de direccion(seconds)
//     }
// }

export class Disparo extends Sprite
{
constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
    //Llamamos al constructor de la clase Sprite
    super (id, state, xPos, yPos, imageSet, frames, physics, hitBox);

    this.isCollidingWithDisparo = false;
    }
}

export class Puntos extends Sprite
{
constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox)
    {
    //Llamamos al constructor de la clase Sprite
    super (id, state, xPos, yPos, imageSet, frames, physics, hitBox);
    }
}

export class Bruja extends Sprite
{
    constructor (id, state, xPos, yPos, imageSet, frames, physics, hitbox)
    {
        //Llamamos al construcor de la clase Sprite
        super(id, state, xPos, yPos, imageSet, frames, physics, hitbox);

        this.collisionBorder    = Collision.NO_COLLISION;   //Empezamos no colisiion
    }
}