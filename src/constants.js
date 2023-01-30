

//Estados del juego
export const Game = {
    INVALID:     -1,
    LOADING:     0,
    PLAYING:     1,
    OVER:        2,
    HOME:           3,
    HIGH_SCORES: 4,
    HISTORY:     5,
    GAME_OVER:   6,
    EXIT:        7

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
    BULLET: 6,
    BRUJA:  7
    
}

//Identificador de estado de sprite ( dirección)
export const State = {
    //Estados player
    STATE_OFF:   -1,
    DOWN:       0,
    LEFT:       1,
    RIGHT:      2,
    UP:         3,
    STILL_UP:   7,
    STILL_LEFT: 5,
    STILL_DOWN: 4,
    STILL_RIGHT:6,

    //Estados disparo
    ATTACK: 8,
  

    //Estados ZEZEN Y TORO
    LEFT_2:     0,
    RIGHT_2:    1,
    UP_2:       2,
    DOWN_2:     3,
    //Estado FRUTA AGUA HACHA
    STILL:      0

    //Estados 
}

//Diferentes tileSet
export const Tile = {
    SIZE_64: 0,    //sPRITES 64 X 64
    SIZE_32: 1     //tILES DE MAPA 32 X 32
}

//Id de bloque del mapa
export const Block = {
    EMPTY:      0,     
    BROWN_1:    1,
    BROWN_2:    2,
    CESPED_1:   3,
    CESPED_2:   4,
    PIEDRA_1:   5,
    PIEDRA_2:   6,
    CRYSTAL_1:  7,
    CRYSTAL_2:  8,
    ROCA_1:     9,
    ROCA_2:     10
}

//Keyboard key codes
export const Key = {
    UP:       38,
    DOWN:     40,
    RIGHT:    39,
    LEFT:     37,
    JUMP:     32,
    ATTACK:   65,
    ONE:       49,
    TWO:       50,
    THREE:     51
}

//Aceleración
export const GRAVITY = 80;

export const Collision = {

    NO_COLLISION:  -1,
    BORDER_UP:     0,
    BORDER_DOWN:   1,
    BORDER_LEFT:   2,
    BORDER_RIGHT:  3
}

