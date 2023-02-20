//Variables globales
import {Game} from "./constants.js";

export default {

    //Acceso al canvas y context
    canvas: {},
    ctx: {},
    canvasHUD: {},
    ctxHUD: {},

    //Estado del juego. Inicializamos a INVALID
    gameState: Game.INVALID,

    //tIEMPO DE CICLO ANTERIOR (milliseconds)
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego rreal (seconds)
    deltaTime: 0,

    //Tiempo de ciclo objetivo (seconds, constante)
    frameTimeObj: 0,

    //Caja de texto para mostrar datos de depuración
    txtPruebas: {},

    //Datos de imagen (tileset)
    tileSets:[],

    //Variables para gestionar la carga de activos
    assetsToLoad: [],
    assetsLoaded: 0 ,

    //Array con datos de los sprites
    sprites: [],

    //Datos del nivel
    level: {},

    //Temporizador nivel
    levelTime: {},

    //temporizadoe vida
    lifeTime: {},

    //oBJETO QUE GUARDA EL ESTADO DE TECLA PULSADA
    action: {},

    //Life
    life: 0,

    //Score
    score: 0,

    highscore: 0,

    //FRUTAS
    frutas: 0,
    agua : 0,

    //Array particulas
    particles: [],

    //Array de highscores
    scores: [],

    letterHighscoreTime : {},

    //Camara
    highScoreCam: {},
    camera: {},
    cameraStop: 0,

    asciKey: 0,

    highscorename: "",

    //Sonidos
    sounds: [],

    //Current sound to play
    currentSound: -1,

    keyTimer: 0,
    keyTimerDeelay: 0,

    keyCode: 0,
    


    

};