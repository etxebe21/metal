import globals from "./globals.js";
import {Game, State, SpriteID} from "./constants.js";

export default function update()
{

    //Change what thw game is doing based game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            console.log("Loading assets...");
            break;

        case Game.PLAYING:
            playGame();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}

//fUNCIÓN QUE ACTUALIZA EL PERSONAJE
function updatePlayer(sprite)
{
    //Lectura de teclado. Asignamos direccion a la tecla
    readKeyboardAndAssignState(sprite);

    const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;

    switch(sprite.state)
    {
        case State.RIGHT:
            //Si se mueve a la derecha ax (+)
            sprite.physics.ax = sprite.physics.aLimit;
            break;

        case State.LEFT:
            //Si se mueve a la izquierda asignamos ax (-)
            sprite.physics.ax = -sprite.physics.aLimit;
            break;

        default: //Resto de casos(arriba,abajo y parado)
            sprite.physics.ax = 0;
    }

//Calculamos velocidad en X y en Y (V = V + at)
sprite.physics.vx += sprite.physics.ax * globals.deltaTime;

//Aplicamos la friccion en los cambios de direccion y cuando haya teclas pulsadas para reducir velocidad rapido
if((sprite.state === State.LEFT && sprite.physics.vx > 0)||
    (sprite.state === State.RIGHT && sprite.physics.vx < 0) ||
    (!isLeftOrRightPressed))
{
    sprite.physics.vx *= sprite.physics.friction;
}

//Limitamos a lavelocidad maxima en direccion horizontal
if (sprite.physics.vx > sprite.physics.vLimit) //derecha (velocidad +)
{
    sprite.physics.vx = sprite.physics.vLimit;
}
else if (sprite.physics.vx < -sprite.physics.vLimit) //izquierda (velocidad -)
{
    sprite.physics.vx =- sprite.physics.vLimit;
}

//Calculamos distancia que se mueve (X = X + Vt)
//xPos segura en movimiento unif. acelerado
sprite.xPos += sprite.physics.vx * globals.deltaTime;

//Actualizamos la animación
updateAnimationFrame(sprite);

}

//Funcion que actualiza el pirata
function updatePirate(sprite)
{
//Maquina de estados pirata
    switch(sprite.state)
    {
        case State.RIGHT_2:
        //Si se mueve a la derecha asignamos velocidad en Xpositiva
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        case State.LEFT_2:
         //Si se mueve a la izquierda asignamos velocidad en X negativa
            sprite.physics.vx = -sprite.physics.vLimit;
            break;

    default:
        console.error("Error: state invalid");
    }
//Calculamos distancia que se mueve (X = X +Vt)
sprite.xPos += sprite.physics.vx * globals.deltaTime;

updateAnimationFrame(sprite);

}


function playGame()
{
    updateSprites();
    updateLevelTime();
}

function updateSprites()
{
    for (let i=0; i < globals.sprites.length; ++i)
    {
        const sprite = globals.sprites[i];
        updateSprite(sprite);
    }
}

function updateSprite(sprite)
{
    const type= sprite.id;
    switch(type)
    {
        //Caso del jugador
        case SpriteID.PLAYER:
            updatePlayer(sprite);
            break;

        case SpriteID.PIRATE:
            updatePirate(sprite);
            break;

        default:
            break;
    }
}

function updateLevelTime()
{
    //Incrementamos el contador de cambio de valor
    globals.levelTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue)
    {
        globals.levelTime.value--;

        //Reseteamos timeChangeCounter
        globals.levelTime.timeChangeCounter = 0;
    }
}

function updateAnimationFrame(sprite)
{
    //Aumentamos el contador de tiempo entre frames
    sprite.frames.frameChangeCounter++;

    //Cambiamos de frame cuando el lag de animaci´n alcanza animSpeed
    if(sprite.frames.frameChangeCounter === sprite.frames.speed)
    {
        //Cambiamos de frame y reseteamos el contador de cambio frame
        sprite.frames.frameCounter++;
        sprite.frames.frameChangeCounter =0;

    }

    //Si hemos llegado al maximo de frames reiniciamos el contador (animación cíclica)
    if (sprite.frames.frameCounter === sprite.frames.framePerState)
    {
        sprite.frames.frameCounter = 0;
    }

}
