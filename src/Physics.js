export default class Physics
{
    constructor(vLimit, aLimit = 0, friction = 1)
    {
        this.vx      = 0;       //velocidad actual en el eje X
        this.vy      = 0;       //velocidad actual en eje Y (pixels/seconds)
        this.vLimit  = vLimit;  //vELOCIDAD maxima a la que puede ir sprite
    }
}