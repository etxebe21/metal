

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
    ZEZEN: 1,
    TORO:  2,
    ZEZEN2: 3,
    FRUTA: 4,
    AGUA:  5,
    ATTACK: 6
}

//Identificador de estado de sprite ( dirección)
export const State = {
    //Estados player
    UP:         3,
    LEFT:       1,
    DOWN:       0,
    RIGHT:      2,
    STILL_UP:   7,
    STILL_LEFT: 5,
    STILL_DOWN: 4,
    STILL_RIGHT:6,
    ATTACK: 7,

    //Estados ZEZEN Y TORO
    LEFT_2:     0,
    RIGHT_2:    1,
    UP_2:       2,
    DOWN_2:     3,
    //Estado FRUTA AGUA HACHA
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

//Keyboard key codes
export const Key = {
    UP:       38,
    DOWN:     40,
    RIGHT:    39,
    LEFT:     37,
    JUMP:     32,
    ATTACK:   65
}

//Aceleración
export const GRAVITY = 80;

