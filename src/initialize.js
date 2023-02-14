import globals from "./globals.js";
import {Game, SpriteID, State, FPS, ParticleState, ParticleID, SCORE_SIZE} from "./constants.js";
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
import Score from "./score.js";
import renderScore from "./gameRender.js";



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
    globals.gameState = Game.HOME;

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
        move4: false,
        move5: false
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
    tileSet.src = "./images/fondoGame.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //home
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/MENU.png";
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
    tileSet.src = "./images/history.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //game over
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/GAMEOVER.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //loading
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/loading.png";
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
        globals.gameState = Game.HOME;
    }
}

function initSprites()
{
    initPlayer();
    initZezen();
    initZezen2();
    initToro();
    initToro2();
    initFresa();
    initManzana();
    initPera();
    initPlatano();
    initAgua(); 
    initBruja(); 
    initBruja2();
    initFire();
    initFire2();
    initFire3();
}

function initPlayer()
{
    //Creamos las propiedades de las imagenes: xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 40, 50, 65, 32, 28);

    //Creamos los datos de la animación. 8 frmaes / state
    const frames = new Frames(8, 5);

    //Creamos nuestro objeto physics con vLimit = 40 pixels/seconds, aLimit= 40 y friction = 0,98
    const physics = new Physics(40, 40, 0.98) //,-100 ;

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(25, 36, 9, 5);

    //Creamos nuestr sprite
    const player = new Sprite(SpriteID.PLAYER, State.STILL_RIGHT, 350, 260, imageSet, frames,physics, hitBox);

    //Añadimos el player al array de sprites
    globals.sprites.push(player);
}

function initZezen()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(8, 0, 36, 50, 65, 30, 28);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(18, 44, 9, 3);

    //Creamos nuestro sprite
    const sprite = new Sprite(SpriteID.ZEZEN, State.LEFT_2, 1000, 259, imageSet, frames, physics, hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(sprite);
}

function initZezen2()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(10, 0, 36, 50, 65, 30, 28);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(30);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(18, 44, 9, 3);

    //Creamos nuestro sprite
    const sprite = new Sprite(SpriteID.ZEZEN, State.LEFT_2, 1400, 255, imageSet, frames, physics, hitBox);

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
    const hitBox = new HitBox(18, 43, 13, 9);

    //Creamos nuestro sprite
    const sprite = new  Sprite(SpriteID.TORO, State.LEFT_2, -400, 251, imageSet, frames, physics, hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(sprite);
}

function initToro2()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(9, 0, 39, 55, 65, 25, 25);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(30);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(18, 43, 13, 9);

    //Creamos nuestro sprite
    const sprite = new  Sprite(SpriteID.TORO, State.LEFT_2, -600, 257, imageSet, frames, physics, hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(sprite);
}

function initFresa()
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
    const puntos = new Puntos (SpriteID.FRUTA, State.STILL, 720, 267, imageSet, frames, physics,hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(puntos);
}

function initManzana()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(14, 2, 36, 40, 65, 33, 30);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(22, 30, 9, 8);

    //Creamos nuestro sprite
    const puntos = new Puntos (SpriteID.FRUTA, State.STILL, 900, 267, imageSet, frames, physics,hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(puntos);
}

function initPera()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(14, 3, 36, 40, 65, 33, 30);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(22, 30, 9, 8);

    //Creamos nuestro sprite
    const puntos = new Puntos (SpriteID.FRUTA, State.STILL, 600, 267, imageSet, frames, physics,hitBox);

    //Añadimos el pirate al array de sprites
    globals.sprites.push(puntos);
}

function initPlatano()
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset

    const imageSet = new ImageSet(14, 1, 40, 40, 65, 33, 30);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(22, 30, 9, 8);

    //Creamos nuestro sprite
    const puntos = new Puntos (SpriteID.FRUTA, State.STILL, 15, 267, imageSet, frames, physics,hitBox);

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
    const puntos = new Puntos(SpriteID.AGUA, State.STILL, 480, 263, imageSet, frames, physics , hitBox);

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
    const physics = new Physics(30);

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

function initFire()
{
    //Creamos las propiedades de las imagenes: initFil , initCol , xSize , ySize , gridSize , xOffset , yOffset
    const imageSet = new ImageSet(19, 0, 55, 55, 65, 20, 20);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 8);

    //Valores inciciales para Physics
    const initAngle = 50 * Math.PI / 180;
    const omega     = 10;
    const yRef      = 20;

    //Creamos nuestro objeto physics con vLimit = 40 pixels/seconds
    const physics = new Physics(20, 0.001, 1, 0, omega, initAngle, yRef);

    //Creamos nuestro objeto Hitbox
    const hitBox = new HitBox (29 ,30 ,12 , 12);

    //Creamos sprite
    const fire = new Sprite(SpriteID.FIRE, State.STILL, 900, 100, imageSet,frames,physics,hitBox);

    //Añadimos array de sprites
    globals.sprites.push(fire);
}

function initFire2()
{
    //Creamos las propiedades de las imagenes: initFil , initCol , xSize , ySize , gridSize , xOffset , yOffset
    const imageSet = new ImageSet(18, 0, 55, 55, 65, 20, 20);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 8);

    //Valores inciciales para Physics
    const initAngle = 50 * Math.PI / 180;
    const omega     = 10;
    const yRef      = 20;

    //Creamos nuestro objeto physics con vLimit = 40 pixels/seconds
    const physics = new Physics(20, 0.002, 1, 0, omega, initAngle, yRef);

    //Creamos nuestro objeto Hitbox
    const hitBox = new HitBox (29 ,30 ,12 , 12);

    //Creamos sprite
    const fire = new Sprite(SpriteID.FIRE, State.STILL, 1400, 100, imageSet,frames,physics,hitBox);

    //Añadimos array de sprites
    globals.sprites.push(fire);
}

function initFire3()
{
    //Creamos las propiedades de las imagenes: initFil , initCol , xSize , ySize , gridSize , xOffset , yOffset
    const imageSet = new ImageSet(17, 0, 55, 55, 65, 20, 20);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(8, 8);

    //Valores inciciales para Physics
    const initAngle = 50 * Math.PI / 180;
    const omega     = 10;
    const yRef      = 20;

    //Creamos nuestro objeto physics con vLimit = 40 pixels/seconds
    const physics = new Physics(20, 0.003, 1, 0, omega, initAngle, yRef);

    //Creamos nuestro objeto Hitbox
    const hitBox = new HitBox (29 ,30 ,12 , 12);

    //Creamos sprite
    const fire = new Sprite(SpriteID.FIRE, State.STILL, 1900, 100, imageSet,frames,physics,hitBox);

    //Añadimos array de sprites
    globals.sprites.push(fire);
}

function initDisparos(sprite)
{
    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(7, 0, 50, 50, 65, 20, 7);

    //Creamos los datos de la animación. 8 frames / state
    const frames = new Frames(4, 10);

    //Creamos objeto physics con vLimit = 40pixels/seconds
    const physics = new Physics(40);

    //Creamos nuestro objeto HitBox con xSize, ySize, xOffset, yOffset
    const hitBox = new HitBox(35, 30, 10,11);

    //Creamos nuestro sprite
    const bullet = new Disparo(SpriteID.BULLET, State.ATTACK, sprite.xPos, sprite.yPos, imageSet, frames, physics, hitBox );

    //Añadimos el DIPASRO al array de sprites
    globals.sprites.push(bullet);

    switch(sprite.state)
    {
        case State.STILL_RIGHT:
            bullet.physics.vx = bullet.physics.vLimit + 50;
            break;

        case State.RIGHT:
            bullet.physics.vx = bullet.physics.vLimit + 50;
            break;
        
        case State.STILL_LEFT:
            bullet.physics.vx = - bullet.physics.vLimit - 50;
            break;

        case State.LEFT:
            bullet.physics.vx = - bullet.physics.vLimit - 50;
            break;
        
        case State.STILL_UP:
            bullet.physics.vy = - bullet.physics.vLimit - 50;
            break;

        case State.UP:
            bullet.physics.vy = - bullet.physics.vLimit  - 50;
            break;
        
        case State.STILL_DOWN:
            bullet.physics.vy = bullet.physics.vLimit + 50;
            break;

        case State.DOWN:
            bullet.physics.vy = bullet.physics.vLimit + 50;
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
    const xInit = sprite.xPos + 5;
    const yInit = sprite.yPos + 5;
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

function getDataBase()
{
  //Ruta o absoluta o elativa al fivchero que hace la peticion(HTML)
  const url = "http://localhost/serverClient/server/routes/getAllHighscores.php"
  const request = new XMLHttpRequest();

  request.onreadystatechange = function()
  {
      if(this.readyState == 4)
      {
          if(this.status == 200)
          {
              if(this.responseText != null)
              {
                  const resultJSON = JSON.parse(this.responseText);
                  console.log (resultJSON);
                  console.log("entra");
                  //Iniciamos los datos del juego
                  initScores(resultJSON);
              }
              else
                  alert("Communication erro: No data received");
          }
          else
              alert("Communication error: " + this.statusText);
      }
  }
  request.open('GET', url, true);
  request.responseType = "text";
  request.send();
}

function initScores(data)
{
    //Creamos score
    createScores(data);

    //Dibujamos lscore
    renderScore();
}

function createScores(data)
{
    let score;

    //Reseteamos score
    globals.scores = [];

    for(let i = 0; i < data.length; ++i)
    {
        score = new Score(
            0,
            0,
            data[i].name,
            data[i].score,
        )
        globals.scores.push(score);
    }
    //Posicionamos score en la pantalla
    setScorePosition();
}

function setScorePosition()
{
    //Posicion inicial
    let yPos = 30;
    let xPos = 25;

    for(let i = 0; i < globals.scores.length; ++i)
    {
        globals.scores[i].xInit = xPos;
        globals.scores[i].yInit = yPos;

        globals.scores[i].xPos = xPos;
        globals.scores[i].yPos = yPos;

        yPos += SCORE_SIZE + 20;
  
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
    initParticles,
    getDataBase   
}