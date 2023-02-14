import globals from "./globals.js";
import {initHTMLelements, loadAssets, initSprites, initVars, initLevel, initTimers, initEvents, initCamera, getDataBase } from "./initialize.js";
import update from "./gameLogic.js";
import render from "./gameRender.js";


//////////////////////////////////////////
///////  GAME INIT 
/////////////////////////////////////////

window.onload = init;

function init()
{
    //Inicializamos los elementos HTML : Canvas, Context, Caja de texto pruebas
    initHTMLelements();

    //Cargamos todos los activos: TILEMAPS, IMAGES, SOUNDS
    loadAssets();

    //Inicializamos los sprites
    initSprites();

    //Inicialización de variables del juego
    initVars();

    //Inicializamos el mapa del juego
    initLevel();

    //Inicializamos contador
    initTimers();

    //Iniciamos evento teclado
    initEvents();

    //Inicializamos camera
    initCamera();

    //Inciamos particulas
    
    getDataBase();

    //Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

////////////////////////////////////
////// GAME EXECUTE
///////////////////////////////////

//Bucle principal de ejecución
function gameLoop(timeStamp)
{
    //Keep requesting new frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    //Tiempo real de ciclo de ejecución
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000; //sconds

    //Tiempo anterior de ciclo de ejecucion
    globals.previousCycleMilliseconds = timeStamp;

    //Variable que corrige el tiempo de frmae debido a rerasos con respecto al tiempo objetivo (frameTimeObj)
    globals.deltaTime += elapsedCycleSeconds;

    if ( globals.deltaTime >= globals.frameTimeObj)
    {
        //Update the game logic. gameLogic.js
        update();

        //Perform the drawing operation, gameRender.js
        render();

        //Corregimos los excesos de tiempo
        globals.deltaTime -=  globals.frameTimeObj;

    }
}