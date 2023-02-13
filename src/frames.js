export default class Frames
{
    constructor (framesPerState, speed )
    {
        this.framesPerState = framesPerState;    //Número de frames por estado de animación
        this.frameCounter   = 0;                 //Contador de frames
        this.speed          = speed;            //Velocidad de cambio de frame (minimo:1 . a mayor número, mas lento)
        this.frameChangeCounter = 0;           //Contador de velocidad de cambio frame
    }
}