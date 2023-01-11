//Constants

//Estados del juego
export const Game = {
    INVALID:     1,
    LOADING:     0,
    PLAYING:     1,
    OVER:        2
};

//Velocidad del juego
export const FPS = 30;

//Identificador de tipo de sprite 
export const SpriteID = {
    PLAYER: 0,
    PIRATE: 1,
    JOKER:  2,
    KNIGHT: 3
}

//Identificador de estado de sprite ( dirección)
export const State = {
    //Estados player
    UP:         0,
    LEFT:       1,
    DOWN:       2,
    RIGHT:      3,

    //Estados PIRATE
    LEFT_2:     0,
    RIGHT_2:    1,

    //Estado joker y knight
    STILL:      0
}

//Diferentes tileSet
export const Tile = {
    SIZE_64: 0,    //sPRITES 64 X 64
    SIZE_32: 1     //tILES DE MAPA 32 X 32
}

//Id de bloque del mapa
export const Block = {
    EMPTY:      0,
    VINES:      1,
    BROWN_1:    2,
    BROWN_2:    3,
    DARK_1:     4,
    GRAY:       5,
    CRYSTAL_1:  6,
    CRYSTAL_2:  7
}