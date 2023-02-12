import globals from "./globals.js";
import {Game, SpriteID, State, FPS, ParticleState, ParticleID} from "./constants.js";
import Sprite, { Bruja, Disparo, Puntos } from "./sprite.js";
import ImageSet from "./imageSet.js";
import Frames from "./frames.js";
import {Level, level1} from "./Level.js";
import Timer from "./Timers.js";
import Physics from "./Physics.js";
import { keydownHandler, keyupHandler } from "./events.js";
import HitBox from "./HitBox.js";
import Camera from "./Camera.js";
import ExplosionParticle from "./particle.js";

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
    globals.frameTimeObj = 1 / FPS; //Frame time in secondsg

    //Iniciar el estado juego
    globals.gameState = Game.PLAYING;

    //Inicializamos los estados de las acciones
    globals.action = {
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
        attack: false,
        jump: false,
        move1: false,
        move2: false,
        move3: false,
        move4: false
    }
    //Variables logica juego
    globals.life = 300;

    globals.highscore = 100;
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

    //fondo pantalla
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/fondocanvas1.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //home
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/MENU1.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //high score
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/HIGHSCORES.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //history
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/HISTORY.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //game over
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/GAMEOVER.png";
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
    initBruja(); 
    initBruja2();
}

function initPlayer()
{
    //Creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 40, 50, 65, 32, 28);

    //Creamos los datos de la animación. 8 frmaes / state
    const frames = new Frames(8, 5);

    //Creamos nuestro objeto physics con vLimit = 40 pixels/seconds, aLimit= 40 y friction = 0,98
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(25, 45, 9, 2);

    //Creamos nuestr sprite
    const player = new Sprite(SpriteID.PLAYER, State.STILL_RIGHT, 200, 260, imageSet, frames,physics, hitBox);

    //Añadimos el player al array de sprites
    globals.sprites.push(player);
}

function initZezen()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(8, 0, 36, 50, 65, 30, 28);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 5);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(22, 46, 9, 3);

    //Creamos nuestro sprite
    const sprite = new Sprite(SpriteID.ZEZEN, State.LEFT_2, 200, 259, imageSet, frames, physics, hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(sprite);
}

function initToro()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(11, 0, 39, 55, 65, 25, 25);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(22, 45, 13, 9);

    //Creamos nuestro sprite
    const sprite = new  Sprite(SpriteID.TORO, State.LEFT_2, 100, 251, imageSet, frames, physics, hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(sprite);
}

function initFruta()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(14, 0, 36, 40, 65, 33, 30);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(22, 30, 9, 8);

    //Creamos nuestro sprite
    const puntos = new Puntos (SpriteID.FRUTA, State.STILL, 220, 267, imageSet, frames, physics,hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(puntos);
}

function initAgua()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(16, 0, 30, 46, 63, 33, 22);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(15, 33, 10, 11);

    //Creamos nuestro sprite
    const puntos = new Puntos(SpriteID.AGUA, State.STILL, 320, 263, imageSet, frames, physics , hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(puntos);
}

function initBruja()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(23, 0, 35, 45, 65, 42, 15);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(2, 5);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(15, 28, 9, 9);

    //Creamos nuestro sprite
    const bruja = new Bruja (SpriteID.BRUJA, State.STILL, 100, 75, imageSet, frames, physics, hitBox);

    //Iniciamos velocidades
    bruja.physics.vx = bruja.physics.vLimit;
    bruja.physics.vy = bruja.physics.vLimit;

    //Añadimos el pirate al array de sprites
    globals.sprites.push(bruja);
}

function initBruja2()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(24, 0, 35, 45, 65, 40, 1);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(2, 3);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(15, 30, 11, 5);

    //Creamos nuestro sprite
    const bruja = new Bruja (SpriteID.BRUJA, State.STILL, 10, 7, imageSet, frames, physics,hitBox);

    //Iniciamos velocidades
    bruja.physics.vx = -bruja.physics.vLimit;
    bruja.physics.vy = -bruja.physics.vLimit;

    //Añadimos el pirate al array de sprites
    globals.sprites.push(bruja);
}

function initDisparos(sprite)
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(7, 0, 50, 50, 65, 20, 7);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 5);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(35, 30, 10,11);

    //Creamos nuestro sprite
    const bullet = new Disparo(SpriteID.BULLET, State.ATTACK, sprite.xPos, sprite.yPos, imageSet, frames, physics, hitBox );

    //Añadimos el DIPASRO al array de sprites
    globals.sprites.push(bullet);
    
    console.log(sprite.state);

    switch(sprite.state)
    {
    case State.STILL_RIGHT:
        console.log("entra");
        bullet.physics.vx = bullet.physics.vLimit;
        break;

    case State.RIGHT:
        bullet.physics.vx = bullet.physics.vLimit;
        break;
    
    case State.STILL_LEFT:
        bullet.physics.vx = - bullet.physics.vLimit;
        break;

    case State.LEFT:
        bullet.physics.vx = - bullet.physics.vLimit;
        break;
    
    case State.STILL_UP:
        bullet.physics.vy = - bullet.physics.vLimit;
        break;

    case State.UP:
        bullet.physics.vy = - bullet.physics.vLimit;
        break;
    
    case State.STILL_DOWN:
        bullet.physics.vy = bullet.physics.vLimit;
        break;

    case State.DOWN:
        bullet.physics.vy = bullet.physics.vLimit;
        break;

    default:
        console.error("error: state invalid");
    }
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
    //Creamos timer, con cambios cada 1 segundos
    globals.levelTime = new Timer(0, 1);
    globals.lifeTime = new Timer (3 ,1);
}

function initEvents()
{
    //Add the keyboard event listeners
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
}

function initCamera()
{
    globals.camera = new Camera(0, 0);
}

function initParticles(sprite)
{
    initExplosion(sprite);
}

function initExplosion(sprite)
{
    const numParticles = 50;
    const xInit = sprite.xPos;
    const yInit = sprite.yPos;
    const radius = 1;
    const timeToFadeMax = 3;
    const alpha = 1.0;

    for (let i = 0; i < numParticles; ++i)
     {
        const velocity = Math.random() * 15 + 5;
        const physics = new Physics(velocity);
        const timeToFade = timeToFadeMax * Math.random() + 1;
        const particle = new ExplosionParticle(ParticleID.EXPLOSION, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade);

        //Asignamos velocidades según ángulo aleatorio
        const randomAngle = Math.random() * 2 * Math.PI;
        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

        globals.particles.push(particle);
     }
}

//Exportar funciones
export {
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel,
    initTimers,
    initEvents,
    initDisparos,
    initCamera,
    initParticles
}