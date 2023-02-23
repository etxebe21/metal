import globals from "./globals.js";
import {Game, State, SpriteID, Collision,ParticleState,ParticleID, Sound, GRAVITY} from "./constants.js";
import sprite from "./sprite.js";
import {initDisparos, initSprites, initParticles, initToro, initZezen, initBruja, initFire3, initAgua} from "./initialize.js";
import detectCollisions from "./collisions.js";

export default function update()
{
    //Change what thw game is doing based game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            updateLoading();
            break;

        case Game.PLAYING:
            playGame();
            break;

        case Game.LEVEL2:
            updateLevel2();
            break;
        
        case Game.PLAYING2:
            playLevel2();
            break;

        case Game.HOME:
            updateNewGame();
            break;

        case Game.HISTORY:
            updateHistory();
            break;

        case Game.GAME_OVER:
            updateGameOver();
            break;

        case Game.HIGH_SCORES:
            updateHighScores();
            break;

        case Game.PLAYERNAME:
            updatePlayerName();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}
 
///////////// UPDATES PANTALLAS JUEGO //////////////

function updateLoading()
{
    if( globals.action.moveSpace)
    globals.gameState = Game.HOME;  
}

function updateNewGame()
{   
    if( globals.action.move1)
    {
        updateStart();
        globals.gameState = Game.PLAYING
    }
      
    if ( globals.action.move3)
        globals.gameState = Game.HIGH_SCORES; 

    if ( globals.action.move2)
        globals.gameState = Game.HISTORY;
}

function updateLevel2()
{
    if( globals.action.moveSpace)
        globals.gameState = Game.PLAYING2;
}

function updateGameOver()
{  
    //updateGameOverMusic();
    if( globals.action.moveSpace)
        globals.gameState = Game.PLAYERNAME; 
}

function updateHighScores()
{ 
    updatehighScoreCam();
    if( globals.action.move4)
    {
        globals.gameState = Game.HOME;
        globals.highScoreCam.y = 0;
    }  
}

function updateHistory()
{
    if( globals.action.move4)
        globals.gameState = Game.HOME; 
}

function updatePlayerName()
{
    writeName();
}

function playGame()
{
    //Actualizacion de la fisica de Sprites
    updateSprites();

    //Musica Y sonidos
    updateGameMusic();
    updateShootMusic();
    updateAguaMusic(sprite);
    updateFrutaMusic(sprite);
    updateHitMusic(sprite);
    updateEnemyMusic(sprite);

    //Colisiones
    detectCollisions();

    //Actualizacion de la camara
    updateCamera();

    //Actualizacion de la logica de juego
    updateLevelTime(); 
    updateLifeTime();
    updateDisparoTime();
    updateScoreTotal();
    updateSprites();
    updateParticles();
    playSound();
    updateDied();

    if (globals.score > 3000)
    {
        playLevel2();
        //globals.gameState = Game.LEVEL2;
    }
    if (globals.score > 7500)
    {
        playLevel2();
    }  
}

function playLevel2()
{
//Actualizacion de la fisica de Sprites
updateSprites();

//Musica Y sonidos
updateGameMusic();
updateShootMusic();
updateAguaMusic(sprite);
updateFrutaMusic(sprite);
updateHitMusic(sprite);
updateEnemyMusic(sprite);

//Colisiones
detectCollisions();

//Actualizacion de la camara
updateCamera();

//Actualizacion de la logica de juego
updateLevelTime(); 
updateLifeTime();
updateScoreTotal();
updateSprites();
updateParticles();
playSound();
updateDied();
}

//////////////// UPDATES SPRITES/PERSONAJES /////////////
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

//FUNCIÓN QUE ACTUALIZA EL PERSONAJE
function updatePlayer(sprite)
{
    //Lectura de teclado. Asignamos direccion a la tecla
    readKeyboardAndAssignState(sprite);
    // const isLeftOrRightPressed = globals.action.moveLeft || globals.action.moveRight;

    // switch(sprite.state)
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

    // //////// MOVIMIENTO VERTICAL ////////

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
            globals.currentSound = Sound.SHOOT;
            break;

        case State.RIGHT:
            //Si se mueve a la derecha vx (+)
            sprite.physics.vx = sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;

        case State.LEFT:
            //Si se mueve a la izquierda asignamos vx (-)
            sprite.physics.vx = -sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;

        default: //Resto de casos( parado)
            sprite.physics.vx = 0;
            sprite.physics.vy = 0;
    }
    
if(globals.action.moveAttack && globals.disparoTime.value > 1 )
{
    initDisparos(sprite);
    globals.disparoTime.value = 0;
}

//Calculamos distancia que se mueve (X = X + Vt)
sprite.xPos += sprite.physics.vx * globals.deltaTime;
sprite.yPos += sprite.physics.vy * globals.deltaTime;

//Actualizamos la animación
updateAnimationFrame(sprite);
}

function updateFruta(sprite)
{ 
//sumPoints(sprite);
restartFruta(sprite);
}

function updateAgua(sprite)
{
restartAgua(sprite);
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

quitarLife(sprite);

restartZezen(sprite);
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

quitarLife(sprite);

restartToro(sprite);
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

function updateFire(sprite)
{
  const amplitude = 250;
  
  sprite.physics.vx = -sprite.physics.vLimit;
  sprite.physics.angle += sprite.physics.omega + globals.deltaTime;
 
  //Calculamos distancia que se mueve ( x = x +vt)
  sprite.xPos += sprite.physics.vx * globals.deltaTime;
  sprite.yPos = sprite.physics.yRef + amplitude * Math.sin(sprite.physics.angle); 
  
  updateAnimationFrame(sprite);

  restartFire(sprite);

  quitarLife(sprite);
}

function updateDisparos(sprite)
{ 
    if(sprite.isCollidingWith)
    {   
        initParticles(sprite);
        sprite.state = State.STATE_OFF;
    }
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

export function updateLetterTime()
{
    //Incrementamos el contador de cambio de valor
    globals.letterHighscoreTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if (globals.letterHighscoreTime.timeChangeCounter > globals.letterHighscoreTime.timeChangeValue && globals.letterHighscoreTime != 0)
    {
        globals.letterHighscoreTime.value++;
        //Reseteamos timeChangeCounter
        globals.letterHighscoreTime.timeChangeCounter = 0;
    }
}

export function updateDisparoTime()
{
    //Incrementamos el contador de cambio de valor
    globals.disparoTime.timeChangeCounter += globals.deltaTime;

    //Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if (globals.disparoTime.timeChangeCounter > globals.disparoTime.timeChangeValue && globals.disparoTime != 0)
    {
        globals.disparoTime.value++;
        //Reseteamos timeChangeCounter
        globals.disparoTime.timeChangeCounter = 0;
    }
}

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
    sprite.state =  globals.action.moveLeft       ? State.LEFT:      //Left Key
                    globals.action.moveRight      ? State.RIGHT:       //rIGHT KEY
                    globals.action.moveUp         ? State.UP:         //Uo key
                    globals.action.moveDown       ? State.DOWN:          //Down key
                    sprite.state === State.LEFT   ? State.STILL_LEFT:    //No key pressed and previous state LEFT
                    sprite.state === State.RIGHT  ? State.STILL_RIGHT:   //No key pressed and previous state RIGHT
                    sprite.state === State.UP     ? State.STILL_UP:     //No key pressed and previous state UP
                    sprite.state === State.DOWN   ? State.STILL_DOWN:  //No key pressed and previous state DOWN
                    sprite.state === State.ATTACK ? State.STILL:
                    sprite.state;
}      


/////////////////// CAMARA //////////////////////

function updateCamera()
{
    //Centramos la camara en el player
    const player = globals.sprites[0];

    globals.camera.x = Math.floor(player.xPos) + Math.floor((player.imageSet.xSize - globals.canvas.width) / 2 );
    globals.camera.y = Math.floor(player.yPos) + Math.floor((player.imageSet.ySize - globals.canvas.height) + 10 );
}

function updatehighScoreCam()
{
    let speed = 10;
    
    globals.highScoreCam.y -= speed * globals.deltaTime;
}

///////////////// FUNCIONES ACCION JUEGO //////////////////

function quitarLife(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {
        globals.life -= 5;
        globals.currentSound = Sound.HIT;
    }
}

function restartFruta(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {  
        globals.score += 50;
        globals.frutas += 0.5;
        sprite.xPos = Math.round(Math.random()*(1400-250) + 250);
        sprite.yPos = 250;
        globals.currentSound = Sound.FRUTA;
    }
}

function restartAgua(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {  
        sprite.state = State.STATE_OFF;
        globals.life += 1.5;
        globals.agua += 1;
        initParticles(sprite);
        initAgua();
        globals.currentSound = Sound.AGUA;
    }
}

function restartBruja(sprite)
{
    if(sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.state = State.STATE_OFF;
        globals.kills += 1;
        globals.score += 50;
        initBruja();
        globals.currentSound = Sound.ENEMY;
    }
}

function restartBruja2(sprite)
{
    if(sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.state = State.STATE_OFF;
        globals.kills += 1;
        globals.score += 50;
        initBruja();
        globals.currentSound = Sound.ENEMY;
    }
}

function restartToro(sprite)
{
    if(sprite.xPos  > 2000 || sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo )
    {  
        sprite.state = State.STATE_OFF;
        initToro();
        globals.kills += 1;
        globals.score += 50;
        globals.currentSound = Sound.ENEMY;
    }
}

function restartZezen(sprite)
{
    if(sprite.xPos < 0 || sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.state = State.STATE_OFF;
        initZezen();
        globals.kills += 1;
        globals.score += 50;
        globals.currentSound = Sound.ENEMY;
    }
}

function restartFire(sprite)
{
    if(sprite.xPos < 0 || sprite.isCollidingWithPlayer || sprite.isCollidingWithDisparo)
    {  
        sprite.state = State.STATE_OFF;
        globals.kills += 1;
        globals.score += 50;
        initFire3();
        globals.currentSound = Sound.ENEMY;
    }
}

/////////////////////// FUNCIONES PARTICULAS ///////////////////

function updateParticles()
{
  for (let i = 0; i < globals.particles.length; ++i)
    {  
        const particle = globals.particles[i];
        updateParticle(particle);

        if(particle.state === ParticleState.OFF)
        {
            globals.particles.splice(i,1);
            i--;
        }
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
            particle.alpha -= 0.4;
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


function updateDied()
{
    if(globals.life <= 0 )  //|| globals.levelTime.value >= 150
    {    
        //updateGameOverMusic();
        globals.name = "";
        globals.highscore = globals.scores[0];
        globals.score = globals.score;
        globals.life = globals.life;
        globals.agua = globals.agua;
        globals.frutas = globals.frutas;
        globals.kills = globals.kills;
        globals.levelTime.value = 0;
        globals.sprites.splice(0)
        globals.gameState = Game.GAME_OVER;
    } 
}

function updateStart()
{    
    globals.name = "";
    globals.highscore = globals.scores[0];
    globals.score = 0;
    globals.life = 30;
    globals.agua = 0;
    globals.frutas = 0;
    globals.kills = 0;
    globals.levelTime.value = 0;
    globals.sprites.splice(0)
    globals.gameState = Game.PLAYING;
    initSprites();
} 

function updateGameMusic()
{
   if(globals.action.move1)
   {
    globals.gameState = Game.PLAYING;
    //Reproducimos GAME_MUSIC a un volumen inferior
    globals.sounds[Sound.GAME_MUSIC].play();
    globals.sounds[Sound.GAME_MUSIC].volume = 1;
   }  
}

// function updateGameOverMusic()
// {
//    if(globals.life <= 0)
//    {
//     //Reproducimos GAME_MUSIC a un volumen inferior
//     globals.sounds[Sound.GAME_OVER].play();
//     globals.sounds[Sound.GAME_OVER].volume = 1;
//     console.log("musica");
//    }  
// }

function updateShootMusic()
{
    if(globals.action.moveAttack)
    {
    //globals.gameState = Game.PLAYING;
     //Reproducimos GAME_MUSIC a un volumen inferior
     globals.sounds[Sound.SHOOT].play();
     globals.sounds[Sound.SHOOT].volume = 1;
    } 
}

function updateAguaMusic(sprite)
{
    if(restartAgua(sprite))
    {
    globals.gameState = Game.PLAYING;
     //Reproducimos GAME_MUSIC a un volumen inferior
     globals.sounds[Sound.HIT].play();
     globals.sounds[Sound.HIT].volume = 1;
    } 
}

function updateFrutaMusic(sprite)
{
    if(restartFruta(sprite))
    {
    globals.gameState = Game.PLAYING;
     //Reproducimos GAME_MUSIC a un volumen inferior
     globals.sounds[Sound.FRUTA].play();
     globals.sounds[Sound.FRUTA].volume = 1;
    } 
}

function updateHitMusic(sprite)
{
    if(sprite.isCollidingWithPlayer)
    {
        globals.gameState = Game.PLAYING;
        //Reproducimos GAME_MUSIC a un volumen inferior
        globals.sounds[Sound.HIT].play();
        globals.sounds[Sound.HIT].volume = 1;
        
    } 
}

function updateEnemyMusic(sprite)
{
    if(sprite.isCollidingWithDisparo)
    {
        globals.gameState = Game.PLAYING;
        //Reproducimos GAME_MUSIC a un volumen inferior
        globals.sounds[Sound.ENEMY].play();
        globals.sounds[Sound.ENEMY].volume = 1;
        
    } 
}

function playSound()
{
    //Reproducir el sonido que ha sido invocado
    if(globals.currentSound != Sound.NO_SOUND)
    {
        //Reproducimos el sonido correspondiente
        globals.sounds[globals.currentSound].currenTime = 0;
        globals.sounds[globals.currentSound].play();

        //Reseteamos current sound
        globals.currentSound = Sound.NO_SOUND;
    }
}


function writeName()
{   
    //console.log(globals.asciKey);
    //console.log(globals.highscorename);
    const insertchar = String.fromCharCode(globals.asciKey);

    if(globals.asciKey > 64 && globals.asciKey < 91)
    {
        if(globals.letterHighscoreTime.value > 0)
        {
            globals.highscorename += insertchar;
            globals.letterHighscoreTime.value = 0;

            if(globals.highscorename.length > 2)
            {
                const objectToSend = upData();
                
                saveScores(objectToSend); 
                globals.gameState = Game.HIGH_SCORES;             
            }
        }  
    }
}
function saveScores(objectToSend)
{
    for(let i = 0; i < globals.scores.length; i ++)
    {
        if(globals.score > globals.scores)
        {
            globals.scores.splice(i, 0, objectToSend);
            i = globals.scores.length;
        }
    }
}

function upData ()
{
    //Send data
    const objectToSend= {
        name:    globals.highscorename,
        score:   globals.score,  
    }

    //String data to send
    const dataToSend = 'name=' + objectToSend.name + '&score=' + 
    objectToSend.score; 

    console.log(dataToSend);

    //Ruta relativa al fichero que hace la peticion(testAjax.php)
    const url = "http://localhost/serverClient/server/routes/postHighscores.php";
    //const url = "http://2223arcadetalde2.aegcloud.pro/server/MikelServer/routes/postHighscores.php";

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
                    const resultJSON = JSON.parse(this.responseText);
                    //Iniciamos los datos
                    saveScores(objectToSend);
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
  


