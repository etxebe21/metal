import globals from "./globals.js";
import {Game, SpriteID, State, FPS} from "./constants.js";
import Sprite from "./sprite.js";
import ImageSet from "./imageSet.js";
import Frames from "./frames.js";
import {Level, level1} from "./Level.js";
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
}

//Carga de activos: TILEMAPS, IMAGES, SOUNDS
function loadAssets()
{
    let tileSet;

    //Load the spritesheet image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheet.png"; //Ruta relativa HTML
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
    initPirate();
}

function initPlayer()
{
    //Creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(1, 1, 40, 55, 64, 10, 9);

    //Creamos los datos de la animación. 8 frmaes / state
    const frames = new Frames(8);

    //Creamos nuestr sprite
    const player = new Sprite(SpriteID.PLAYER, State.UP, 100, 70, imageSet, frames)

    //Añadimos el player al array de sprites
    globals.sprites.push(player);

}

function initPirate()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
<<<<<<< HEAD
    const imageSet = new ImageSet(5, 0, 33, 48, 64, 20, 16);
=======
    const imageSet = new ImageSet(0, 0, 32, 47, 64, 17, 16);
>>>>>>> b8a0d8967e9998673529099a990f2a1e3ec81498

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8);

    //Creamos nuestro sprite
    const pirate = new Sprite(SpriteID.PIRATE, State.RIGHT_2, 100, 100, imageSet, frames);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(pirate);
}

function initLevel()
{
    //Creamos las propiedades de las imagemnes del mapa; initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 16, 16, 16, 0, 0);

    //Creamos y guardamos nuestro livel
    globals.level = new Level(level1, imageSet);
}

//Exportar funciones
export{
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel
}