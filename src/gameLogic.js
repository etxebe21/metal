import globals from "./globals.js";
import {Game, State, SpriteID, Collision,ParticleState,ParticleID} from "./constants.js";
import Sprite from "./sprite.js";
import {initDisparos, initSprites, initParticles} from "./initialize.js";
import detectCollisions from "./collisions.js";

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

        case Game.HOME:
            updateNewGame();
            break;

        case Game.HISTORY:
            updateHistory();
            break;

        case Game.GAME_OVER:
            updateGameOver();

        case Game.HIGH_SCORES:
            updateHighScores();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}

function updateNewGame()
{
    if( globals.action.move1)
        globals.gameState = Game.PLAYING;

    if ( globals.action.move3)
        globals.gameState = Game.HIGH_SCORES;

    if ( globals.action.move2)
        globals.gameState = Game.HISTORY;
}

function updateGameOver()
{
    if( globals.action.move4)
        globals.gameState = Game.HOME;
}

function updateHighScores()
{
    if( globals.action.move4)
        globals.gameState = Game.HOME;
}

function updateHistory()
{
    if( globals.action.move4)
        globals.gameState = Game.HOME; 
}

function playGame()
{
    //Actualizacion de la fisica de Sprites
    updateSprites();

    //Colisiones
    detectCollisions();

    //Actualizacion de la camara
    //updateCamera();

    //Actualizacion de la logica de juego
    updateLevelTime(); 
    updateLifeTime();
    updateScoreTotal();
    updateSprites();
    updateDied();
    updateParticles();
}

//fUNCIÓN QUE ACTUALIZA EL PERSONAJE
function updatePlayer(sprite)
{
    //Lectura de teclado. Asignamos direccion a la tecla
    readKeyboardAndAssignState(sprite);

    //const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;

    switch(sprite.state)
    {
        case State.ATTACK:
            initDisparos(sprite);
            console.log("disparo");
            break;

        case State.RIGHT:
            //Si se mueve a la derecha vx (+)
            sprite.physics.vx = sprite.physics.vLimit;
            sprite.physics.vy = 0;
            console.log("derecha");
            break;

        case State.LEFT:
            //Si se mueve a la izquierda asignamos vx (-)
            sprite.physics.vx = -sprite.physics.vLimit;
            sprite.physics.vy = 0;
            console.log("izquierda");
            break;

        default: //Resto de casos( parado)
            sprite.physics.vx = 0;
            sprite.physics.vy = 0;
    }
if(globals.action.moveAttack)
{
    initDisparos(sprite);
}

//Calculamos distancia que se mueve (X = X + Vt)
sprite.xPos += sprite.physics.vx * globals.deltaTime;
sprite.yPos += sprite.physics.vy * globals.deltaTime;

//Actualizamos la animación
updateAnimationFrame(sprite)
}

function updateFruta(sprite)
{ 
//Actualizamos la animación
updateAnimationFrame(sprite);
sumPoints(sprite);
restartFruta(sprite);
particlesFruta(sprite);
}

function updateAgua(sprite)
{
sumPoints(sprite);
restartAgua(sprite);
particlesFruta(sprite);
sumarLife(sprite);
} 

//Funcion que actualiza el ZEZEN
function updateZezen(sprite)
{
//Maquina de estados pirata
    switch(sprite.state)
    {
        case State.RIGHT_2:
            //Si se mueve a la derecha asignamos velocidad en Xpositiva
            sprite.physics.vx = sprite.physics.vLimit;
           // initDisparoEnemy(sprite);
            break;

        case State.LEFT_2:
            //Si se mueve a la izquierda asignamos velocidad en X negativa
            sprite.physics.vx = -sprite.physics.vLimit;
            //initDisparoEnemy(sprite);
            break;

        default:
            console.error("Error: state invalid");
    }
//Calculamos distancia que se mueve (X = X +Vt)
sprite.xPos += sprite.physics.vx * globals.deltaTime;

//Actualizamos la animación
updateAnimationFrame(sprite);

restartZezen(sprite);

quitarLife(sprite);
}

//Funcion que actualiza el TORO
function updateToro(sprite)
{
//Maquina de estados toro
    switch(sprite.state)
    {
        case State.RIGHT_2:
        //Si se mueve a la derecha asignamos velocidad en Xpositiva
            sprite.physics.vx = -sprite.physics.vLimit;
            break;

        case State.LEFT_2:
         //Si se mueve a la izquierda asignamos velocidad en X negativa
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        default:
        console.error("Error: state invalid");
    }
//Calculamos distancia que se mueve (X = X +Vt)
sprite.xPos += sprite.physics.vx * globals.deltaTime;

//Actualizamos la animación
updateAnimationFrame(sprite);

restartToro(sprite);

quitarLife(sprite);

 }

function updateBruja(sprite)
{
    //Movimiento de rebote. Cambiamos velocidades sgun haya colision con las paredes
    switch(sprite.collisionBorder)
    {
        case Collision.BORDER_RIGHT:
            sprite.physics.vx = -sprite.physics.vLimit;
            break;

        case Collision.BORDER_LEFT:
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        case Collision.BORDER_UP:
            sprite.physics.vy =sprite.physics.vLimit;
            break;

        case Collision.BORDER_DOWN:
            sprite.physics.vy = -sprite.physics.vLimit;
            break;

        default:
            //Si no hay colision mantenemos velocidades
    }

    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    updateAnimationFrame(sprite);

    restartBruja(sprite);

    quitarLife(sprite);

    calculateCollisionWithFourBorders(sprite);   
}

function updateBruja2(sprite)
{
    //Movimiento de rebote. Cambiamos velocidades sgun haya colision con las paredes
    switch(sprite.collisionBorder)
    {
        case Collision.BORDER_RIGHT:
            sprite.physics.vx = -sprite.physics.vLimit;
            break;

        case Collision.BORDER_LEFT:
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        case Collision.BORDER_UP:
            sprite.physics.vy = sprite.physics.vLimit;
            break;

        case Collision.BORDER_DOWN:
            sprite.physics.vy = -sprite.physics.vLimit;
            break;

        default:
            //Si no hay colision mantenemos velocidades
    }

    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    updateAnimationFrame(sprite);

    restartBruja2(sprite);

    quitarLife(sprite);

    calculateCollisionWithFourBorders(sprite);
    
}

function updateSprites()
{
    for (let i=0; i < globals.sprites.length; ++i)
    {
        const sprite = globals.sprites[i];
        updateSprite(sprite);
    
    if(sprite.state === State.STATE_OFF){ // -1

        globals.sprites.splice(i, 1);
         i--; }
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

        case SpriteID.ZEZEN:
            updateZezen(sprite);
            break;
        
        case SpriteID.TORO:
            updateToro(sprite); 
            break;

        case SpriteID.AGUA:
            updateAgua(sprite);
            break;

        case SpriteID.FRUTA:
            updateFruta(sprite);
            break;

        case SpriteID.BULLET:
            updateDisparos(sprite);
            break;

        case SpriteID.BRUJA:
            updateBruja(sprite);
            break;

        case SpriteID.BRUJA:
            updateBruja2(sprite);
            break;

        default:
            break;
    }
}

function updateDisparos(sprite)
{
    //Calculamos distancia que se mueve (Y = Y +Vt)
    sprite.yPos += sprite.physics.vy * globals.deltaTime;
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    //Actualizamos la animación
    updateAnimationFrame(sprite);
}

function updateScoreTotal()
{
    if(globals.score > globals.highscore)
    {
        globals.highscore = globals.score;
    }
}

function updateLevelTime()
{
    //Incrementamos el contador de cambio de valor
    globals.levelTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue)
    {
        globals.levelTime.value++;

        //Reseteamos timeChangeCounter
        globals.levelTime.timeChangeCounter = 0;
    }
}

function updateLifeTime()
{
    //Incrementamos el contador de cambio de valor
    globals.lifeTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if (globals.lifeTime.timeChangeCounter > globals.lifeTime.timeChangeValue && globals.lifeTime != 0)
    {
        globals.lifeTime.value--;

        //Reseteamos timeChangeCounter
        globals.lifeTime.timeChangeCounter = 0;
    }
}

function updateLife()
{
    for (let i = 1; i < globals.sprites.length; ++i)
    {
        const sprite = globals.sprites[i];
        
        if(sprite.isCollidingWithPlayer && globals.life > 0 && globals.lifeTime.value === 0)
        { 
            console.log("entra");
            if(sprite.id != SpriteID.AGUA || sprite.ID != SpriteID.FRUTA || sprite.ID != SpriteID.BRUJA || sprite.id != SpriteID.TORO || sprite.id != SpriteID.ZEZEN)
            {
                //Si hay colision reducimos la vida
                globals.life -= 10;
                globals.lifeTime.value = 3;
            }
        }
    }
}
// function updateScore()
// { 
//     for (let i = 1; i < globals.sprites.length; ++i)
//     {
//         const sprite = globals.sprites[i];
        
//         if(sprite.isCollidingWithPlayer && globals.life > 0 && globals.lifeTime.value ===  0)
//         { 
            
//             if( sprite.id = SpriteID.FRUTA)
//             {console.log("entra");
//                 //Si hay colision sumamos puntos
//                  globals.score += 100;
//                  globals.lifeTime.value = 3;
//             }
//         }
//     }
// }

function swapDirection(sprite)
{
    sprite.state = sprite.state === State.RIGHT_2 ? State.LEFT_2 : State.RIGHT_2;
}

function updateDirectionRandom(sprite)
{
    //Incrementamos el tiempo para cambio de direccion
    sprite.directionChangeCounter += globals.deltaTime;

    if(sprite.directionChangeCounter > sprite.maxTimeToChangeDirection)
    {
        //Reseteamos el contador 
        sprite.directionChangeCounter = 0;

        //Actualizamos el tiempo de cambio de direccion aleatoriamente, entre 1 y 8 segubdos
        sprite.maxTimeToChangeDirection = Math.floor(Math.random() * 8) + 1;
        
        //Cambiamos la direccion
        swapDirection(sprite);
    }
}

function calculateCollisionWithFourBorders(sprite)
{
    if(sprite.xPos + sprite.imageSet.xSize > globals.canvas.width)
    {
        sprite.collisionBorder = Collision.BORDER_RIGHT;
    }
    else if (sprite.xPos < 0)
    {
        sprite.collisionBorder = Collision.BORDER_LEFT;
    }
    else if (sprite.yPos < 0)
    {
        sprite.collisionBorder = Collision.BORDER_UP;
    }
    else if (sprite.yPos + sprite.imageSet.ySize > globals.canvas.height)
    {
        sprite.collisionBorder = Collision.BORDER_DOWN;
    }
    else 
    {
        sprite.collisionBorder = Collision.NO_COLLISION;
    }
}


function calculateCollisionWithBorders(sprite)
{
    let isCollision = false;

    //Colision con el borde derecho de la pantalla
    if(sprite.xPos + sprite.imageSet.xSize > globals.canvas.width)
    {
        isCollision = true;
    }
    //Colision con el borde izquierdo de la pantalla
    else if (sprite.xPos < 0)
    {
        isCollision = true;
    }

     //Colision con el borde superior de la pantalla
     else if(sprite.yPos + sprite.imageSet.ySize > globals.canvas.height)
     {
         isCollision = true;
     }
     //Colision con el borde inferior de la pantalla
     else if (sprite.yPos < 0)
     {
         isCollision = true;
     }
 
    return isCollision;
}

function updateAnimationFrame(sprite)
{
    switch(sprite.state)
    {
        case State.STILL_UP:
        case State.STILL_LEFT:
        case State.STILL_DOWN:
        case State.STILL_RIGHT:
            sprite.frames.frameCounter = 0;
            sprite.frames.frameChangeCounter = 0;
            break;

    default:

        //Aumentamos el contador de tiempo entre frames
        sprite.frames.frameChangeCounter++;

        //Cambiamos de frame cuando el lag de animaci´n alcanza animSpeed
        if(sprite.frames.frameChangeCounter === sprite.frames.speed)
        {
         //Cambiamos de frame y reseteamos el contador de cambio frame
            sprite.frames.frameCounter++;
            sprite.frames.frameChangeCounter = 0;
        }

        //Si hemos llegado al maximo de frames reiniciamos el contador (animación cíclica)
        if (sprite.frames.frameCounter === sprite.frames.framesPerState)
        {
            sprite.frames.frameCounter = 0;
        }
    }
}

function readKeyboardAndAssignState(sprite)
{
    sprite.state = globals.action.moveLeft       ? State.LEFT:      //Left Key
                    globals.action.moveRight     ? State.RIGHT:       //rIGHT KEY
                    globals.action.moveUp        ? State.UP:         //Uo key
                    globals.action.moveDown      ? State.DOWN:          //Down key
                    sprite.state === State.LEFT  ? State.STILL_LEFT:    //No key pressed and previous state LEFT
                    sprite.state === State.RIGHT ? State.STILL_RIGHT:   //No key pressed and previous state RIGHT
                    sprite.state === State.UP    ? State.STILL_UP:     //No key pressed and previous state UP
                    sprite.state === State.DOWN  ? State.STILL_DOWN:  //No key pressed and previous state DOWN
                    sprite.state === State.ATTACK ? State.STILL:
                    sprite.state;
}      


// function updateCamera()
// {
//     //Centramos la camara en el player
//     const player = globals.sprites[0];

//     globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width) / 2);
//     globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.ySize - globals.canvas.height) / 2);
// }

// function restartFresa(sprite)
// {
//     if(sprite.isCollidingWithPlayer)
//     {
//         initParticles(sprite);
//     }
// }

function sumPoints(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {
        globals.score += 100;
        globals.lifeTime.value = 3;
    }
}

function quitarLife(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {
        globals.life -= 10;
    }
}

function sumarLife(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {
        globals.life += 10;
    }
}

function restartFruta(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {  
        sprite.xPos = Math.round(Math.random()*(500));
        sprite.yPos = 267;
    }
}

function restartAgua(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {  
        sprite.xPos = Math.round(Math.random() * 300);
        sprite.yPos = 260;
    }
}

function restartBruja(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {  
        sprite.xPos = Math.random()*10 + 5;
        sprite.yPos = Math.random()*20 + 10;
    }
}

function restartBruja2(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {  
        sprite.xPos = Math.random(sprite.xPos);
        sprite.yPos = 200;
    }
}

function restartToro(sprite)
{
    if(sprite.xPos  > 1000 || sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.xPos = -250;
        sprite.yPos = 250;
    }
}

function restartZezen(sprite)
{
    if(sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.xPos = 1200;
        sprite.yPos = 260;
    }
}

function updateParticles()
{
  for (let i = 0; i < globals.particles.length; ++i)
    {  
      const particle = globals.particles[i];
      updateParticle(particle);
    }
}

function updateParticle(particle)
{
  const type = particle.id;
  switch (type)
  {
    //Caso del jugador
    case ParticleID.EXPLOSION:
      updateExplosionParticle(particle);
      break;

    //caso del enemigo
    default:
      break;
  }
}

function updateExplosionParticle(particle)
{
    particle.fadeCounter += globals.deltaTime;

    //Cogemos las velocidades de los arrays
    switch (particle.state)
    {
        case ParticleState.ON:
            if (particle.fadeCounter > particle.timeToFade)
            {
                particle.fadeCounter = 0;
                particle.state = ParticleState.FADE;
            }
            break;

        case ParticleState.FADE:
            particle.alpha -= 0.5;
            if (particle.alpha <= 0)
            {
                particle.state = ParticleState.OFF;
            }
            break;

       case ParticleState.OFF:

            break;

        default:
   }
      particle.xPos += particle.physics.vx * globals.deltaTime;
      particle.yPos += particle.physics.vy * globals.deltaTime;
  }

function particlesFruta(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {
        initParticles(sprite);
    }
}

function updateDied()
{
    if(globals.life === 0 || globals.levelTime.value >= 150)
    {   globals.highscore = globals.score;
        globals.score = 0;
        globals.life = 300;
        globals.levelTime.value = 0;
        globals.sprites.splice(0)
        globals.gameState = Game.GAME_OVER;
        initSprites();
    } 
  }



