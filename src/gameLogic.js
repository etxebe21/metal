import globals from "./globals.js";
import {Game, State, SpriteID, Collision,ParticleState,ParticleID, GRAVITY} from "./constants.js";
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

    if( globals.action.move5)
        globals.gameState = Game.HIGH_SCORES;
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
    updateCamera();

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

    // const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;

    //  switch(sprite.state)
    // {
    //     case State.ATTACK:
    //         initDisparos(sprite);
    //         break;

    //     case State.RIGHT:
    //         //Si se mueve a la derecha vx (+)
    //         sprite.physics.ax = sprite.physics.aLimit;
    //         break;

    //     case State.LEFT:
    //         //Si se mueve a la izquierda asignamos vx (-)
    //         sprite.physics.ax = -sprite.physics.aLimit;
    //         break;

    //     default: //Resto de casos( parado)
    //         sprite.physics.ax = 0;
            
    // }

    // //Calculamos velocidad en X y en Y (V 0 V +aT)
    // sprite.physics.vx += sprite.physics.ax * globals.deltaTime;

    // //Aplicamos friccion en los cambios de direccion y cuando no haya teclas pulsadas
    // if((sprite.state === State.LEFT && sprite.physics.vx > 0)||
    //     (sprite.state === State.RIGHT && sprite.physics.vx < 0)||
    //     (!isLeftOrRightPressed))
    // {
    //     sprite.physics.vx *= sprite.physics.friction;
    // }

    // //Limitamos a la velocidad maxima en direccion horizontal
    // if(sprite.physics.vx > sprite.physics.vLimit) //Derecha velocidad +
    // {
    //     sprite.physics.vx = sprite.physics.vLimit;
    // }
    // else if (sprite.physics.vx < -sprite.physics.vLimit) //izquierda velocidad -
    // {
    //     sprite.physics.vx =- sprite.physics.vLimit;
    // }

    // //Calculamos distancia que se mueve (X = X + Vt)
    // //xPos seguira un movimiento unif. acelerado
    // sprite.xPos += sprite.physics.vx * globals.deltaTime;

    // sprite.physics.ay = GRAVITY;
    // //No estamos en el suelo
    // if (!sprite.physics.isOnGround)
    // {
    //     //Calculamos velocidad en Y (V = V + A*t)
    //     sprite.physics.vy += sprite.physics.ay * globals.deltaTime;
    // }
    // else //Estamos en el suelo
    // {
    //     if(globals.action.jump) //Pulsamos la tecla de salto
    //     {
    //         sprite.physics.isOnGround = false;
    //         //Asignamos velocidad inicial de salto
    //         sprite.physics.vy += sprite.physics.jumpForce;
    //     }
    // }

    // //Calculamos distancia que se mueve (Y = Y + Vt)
    // //yPos seguira un movimiento unif. acelerado
    // sprite.yPos += sprite.physics.vy * deltaTime;

    // //COLISION CON EL SUELO (PASAREMOS LUEGO A COLISIONS)

    // if( sprite.yPos > globals.canvas.height - sprite.imageSet.ySize)
    // {
    //     sprite.physics.isOnGround = true;
    //     sprite.yPos = globals.canvas.height - sprite.imageSet.ySize;
    //     sprite.physics.vy = 0;
    // }

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

//calculateCollisionWithBorders();
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

sumPointsEnemy(sprite);
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

sumPointsEnemy(sprite);
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

    sumPointsEnemy(sprite);

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

    sumPointsEnemy(sprite);

    calculateCollisionWithFourBorders(sprite);
}

function updateFire(sprite)
{
  const amplitude = 10;
  
  sprite.physics.vx = -sprite.physics.vLimit;
  sprite.physics.angle += sprite.physics.omega + globals.deltaTime;
 
  //Calculamos distancia que se mueve ( x = x +vt)
  sprite.xPos += sprite.physics.vx * globals.deltaTime;
  sprite.yPos = sprite.physics.yRef + amplitude * Math.sin(sprite.physics.angle); 
  
  updateAnimationFrame(sprite);

  restarFire(sprite);
}
function updateSprites()
{
    for(let i = 0; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];
            updateSprite(sprite);

            if (sprite.state === State.STATE_OFF )
            {
                globals.sprites.splice(i,1);
                i--;
            } 
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
        
        case SpriteID.FIRE:
            updateFire(sprite);
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

// function updateLife()
// {
//     for (let i = 1; i < globals.sprites.length; ++i)
//     {
//         const sprite = globals.sprites[i];
        
//         if(sprite.isCollidingWithPlayer && globals.life > 0 && globals.lifeTime.value === 0)
//         { 
//             console.log("entra");
//             if(sprite.id != SpriteID.AGUA || sprite.ID != SpriteID.FRUTA || sprite.ID != SpriteID.BRUJA || sprite.id != SpriteID.TORO || sprite.id != SpriteID.ZEZEN)
//             {
//                 //Si hay colision reducimos la vida
//                 globals.life -= 10;
//                 globals.lifeTime.value = 3;
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
    if(sprite.xPos + sprite.imageSet.xSize > 1532)
    {
        sprite.collisionBorder = Collision.BORDER_RIGHT;
    }
    else if (sprite.xPos < -200)
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
    if(sprite.xPos + sprite.imageSet.xSize > 1532)
    {
        isCollision = true;
    }
    //Colision con el borde izquierdo de la pantalla
    else if (sprite.xPos < -200)
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

function updateCamera()
{
    //Centramos la camara en el player
    const player = globals.sprites[0];

    globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width) / 2 );
    globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.ySize - globals.canvas.height) + 10 );
}

function sumPoints(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {
        globals.score += 100;
        globals.lifeTime.value = 3;
    }
}

function sumPointsEnemy(sprite)
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
        globals.life -= 20;
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
        sprite.xPos = Math.round(Math.random()*(1500) + 20);
        sprite.yPos = 267;
    }
}

function restartAgua(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {  
        sprite.xPos = Math.round(Math.random() * 1400 + 5);
        sprite.yPos = 260;
    }
}

function restartBruja(sprite)
{
    if(sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.xPos = Math.round(Math.random() * 80) + 1;
        sprite.yPos = Math.round(Math.random() * 80) + 1;
    }
}

function restartBruja2(sprite)
{
    if(sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.xPos = Math.round(Math.random() * 180) + 1;
        sprite.yPos = Math.round(Math.random() * 180) + 1;
    }
}

function restartToro(sprite)
{
    if(sprite.xPos  > 2000 || sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo )
    {  
        sprite.xPos = -600;
        sprite.yPos = 250;
    }
}

function restartZezen(sprite)
{
    if(sprite.xPos < 0 || sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.xPos = 1700;
        sprite.yPos = 260;
    }
}

function restarFire(sprite)
{
    if(sprite.xPos < 0 || sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.xPos = 1300;
        sprite.yPos = 360;
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

  function getDataBase()
  {
    //Ruta o absoluta o elativa al fivchero que hace la peticion(HTML)
    const url = "http://localhost/serverClient/server/routes/getAllClassic.php"
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
                    initGame(resultJSON);
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
  

  function upData ()
  {
    console.log("Add button pressed");

    //Generamos isbn aleatorio
    const isbn = Math.floor(Math.random() * Math.pow(10,13));

    //Send data
    const objectToSend= {
        name:    "XG Erudite",
        score:     "Lord of the kings"  
    }

    //String data to send
    const dataToSend = 'name=' + objectToSend.name + '&score=' + 
    objectToSend.score; 

    console.log(dataToSend);

    //Ruta relativa al fichero que hace la peticion(testAjax.php)
    const url = "http://localhost/serverClient/server/routes/postClassic.php";
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function()
    {
        if(this.readyState == 4)
        {
            if(this.status == 200)
            {
                if(this.responseText != null)
                {
                    //console.log(this.responseText);
                    const resultJSON = JSON.parse(this.responseText);
                    //console.log (resultJSON);

                    //Metemos los datos en un array , ya que lo que nos devuelve la ruta es un Objeto
                    const arrayResult = [resultJSON];

                    //Iniciamos los datos
                    initGame(arrayResult);
                    console.log(arrayResult);
                }
                else
                    alert("Communication error: No data received");
            }
            else
                alert("Communication error: " + this.statusText);
        }
    }
    request.responseType = "text";
    request.send(dataToSend);

}
  


