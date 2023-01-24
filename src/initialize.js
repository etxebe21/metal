import globals from "./globals.js";
import {Game, SpriteID, State, FPS} from "./constants.js";
import Sprite from "./sprite.js";
import ImageSet from "./imageSet.js";
import Frames from "./frames.js";
import {Level, level1} from "./Level.js";
import Timer from "./Timers.js";
import Physics from "./Physics.js";
import { keydownHandler, keyupHandler } from "./events.js";
import { Pirate } from "./sprite.js";
//Función que inicializa los elementos  HTML
function initHTMLelements()
{
    //Canvas, context screen
    globals.canvas = document.getElementById('gameScreen');
    globals.ctx = globals.canvas.getContext('2d');
    //Canvas, context HUD
    globals.canvasHUD = document.getElementById('gameHUD');
    globals.ctxHUD = globals.canvasHUD.getContext('2d');

    //Eliminación del Anti-Aliasing
    globals.ctx.imageSmoothingEnabled = false;

    //Caja de textto paa pruebas
    globals.txtPruebas = document.getElementById('txtPruebas');
}

//Funcion que inicializa las variables del juego
function initVars()
{
    //Inicializamos las variables de gestión de tiempo
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS; //Frame time in seconds

    //Iniciar el estado juego
    globals.gameState = Game.PLAYING;

    //Inicializamos los estados de las acciones
    globals.action = {
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
        attack: false,
        jump: false

    
    }
}

//Carga de activos: TILEMAPS, IMAGES, SOUNDS
function loadAssets()
{
    let tileSet;

    //Load the spritesheet image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheet (1).png"; //Ruta relativa HTML
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load de bricks image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/mapa.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
}


//Funcion nque se llama cada vez que se carga un activo
function loadHandler()
{
    globals.assetsLoaded++;

    //Una vez se han cargado todos los activos pasamos
    if(globals.assetsLoaded === globals.assetsToLoad.length)
    {
        //Remove the load event listener
        for(let i = 0; i < globals.tileSets.length; ++i)
        {
        globals.tileSets[i].removeEventListener("load" , loadHandler, false);
        }
        console.log("Assets finished loading");

        //Start the game
        globals.gameState = Game.PLAYING;
    }
}

function initSprites()
{
    initPlayer();
    initZezen();
    initToro();
    initFruta();
    initAgua();  
}

function initPlayer()
{
    //Creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 45, 56, 65, 26, 17);

    //Creamos los datos de la animación. 8 frmaes / state
    const frames = new Frames(8, 5);

    //Creamos nuestro objeto physics con vLimit = 40 pixels/seconds, aLimit= 40 y friction = 0,98
    const physics = new Physics(40);

    //Creamos nuestr sprite
    const player = new Sprite(SpriteID.PLAYER, State.STILL_RIGHT, 30, 40, imageSet, frames,physics);

    //Añadimos el player al array de sprites
    globals.sprites.push(player);
}

function initZezen()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(8, 0, 36, 55, 64, 30, 28);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 10);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    const initTimeToChangeDirection = Math.floor(Math.random() * 3) + 1;

    //Creamos nuestro sprite
    const pirate = new Pirate(SpriteID.ZEZEN, State.RIGHT_2, 90, 125, imageSet, frames, physics, initTimeToChangeDirection);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(pirate);
}

function initToro()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(10, 0, 40, 55, 65, 20, 25);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 10);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    const initTimeToChangeDirection = Math.floor(Math.random() * 6) + 1;

    //Creamos nuestro sprite
    const pirate = new Pirate(SpriteID.TORO, State.LEFT_2, 50, 3, imageSet, frames, physics, initTimeToChangeDirection);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(pirate);
}


function initFruta()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(14, 0, 36, 40, 65, 29, 25);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro sprite
    const pirate = new Pirate(SpriteID.FRUTA, State.STILL, 22, 80, imageSet, frames, physics);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(pirate);
}

function initAgua()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(16, 0, 33, 50, 63, 28, 19);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 5);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro sprite
    const pirate = new Pirate(SpriteID.AGUA, State.STILL, 170, 35, imageSet, frames, physics);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(pirate);
}

function initDisparos(sprite)
{
    switch(sprite.state)
    {
    case State.RIGHT || State.STILL_RIGHT:
        sprite.vx = +20;
        break;
    
    case State.LEFT || State.STILL_LEFT:
        sprite.vx = -20;
        break;
    
    case State.UP || State.STILL_UP:
        sprite.vy = +20;
        sprite.physics.vy = sprite.physics.vLimit;
        sprite.physics.vx = 0;
        break;
    
    case State.DOWN || State.STILL_DOWN:
        sprite.vy = +20;
        break;

    default:
        console.error("error: state invalid");
    }

    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(15, 0, 50, 50, 65, 20, 7);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 5);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro sprite
    const player = new Sprite(SpriteID.ATTACK, State.STILL, sprite.xPos, sprite.yPos, imageSet, frames, physics);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(player);
}

function initLevel()
{
    //Creamos las propiedades de las imagemnes del mapa; initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 0, 0);

    //Creamos y guardamos nuestro livel
    globals.level = new Level(level1, imageSet);
}

function initTimers()
{
    //Creamos timer de valor 200, con cambios cada 0,5 segundos
    globals.levelTime = new Timer(0, 1);
}

function initEvents()
{
    //Add the keyboard event listeners
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
}

//Exportar funciones
export{
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel,
    initTimers,
    initEvents,
    initDisparos
}