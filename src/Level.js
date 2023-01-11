export class Level
{
    constructor(data, imageSet)
    {
        this.data = data;          //Array bidimensional de datos del mapa
        this.imageSet = imageSet;  //Datos de la imagenes del mapa
    }
}

//Datos del nivel 1
export const level1 = 
[
[5,5,5,5,6,5,5,5],
[5,6,2,2,1,2,6,5],
[5,1,2,7,7,2,1,5],
[5,1,2,7,7,2,1,5],
[5,6,2,1,2,2,6,5],
[5,5,5,6,5,5,5,5]
];