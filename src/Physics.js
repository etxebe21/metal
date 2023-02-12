export default class Physics
{
    constructor(vLimit, aLimit = 0, friction = 1, jumpForce = 0)
    {
        this.vx        = 0;               //velocidad actual en el eje X
        this.vy        = 0;               //velocidad actual en eje Y (pixels/seconds)
        this.vLimit    = vLimit;          //vELOCIDAD maxima a la que puede ir sprite//
        this.ax        = 0;               // Aceleracion en eje X
        this.ay        = 0;                // Aceleracion en eje X
        // this.aLimit    = aLimit;           // Aceleracion limite
        // this.friction  = friction;        //Fuerza de friccion
        // this.jumpForce = jumpForce;  //Fuerza de salto (debe ser negativa por defecto)
        // this.isOnGround= false;           //Variable que se pone a true si estamos en e suelo
    }
}