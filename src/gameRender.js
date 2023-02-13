import globals from "./globals.js";
import {Tile, Game, ParticleID, ParticleState, SCORE_SIZE} from "./constants.js";
import Sprite from "./sprite.js";

export default function render()
{

    //Change what thw game is doing based game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            //Draw loading spinner
            break;

        case Game.PLAYING:
            drawGame();
            break;
        
        case Game.HOME:
            renderHome();
            break;
        
        case Game.HISTORY:
            renderHistory();
            break;

        case Game.HIGH_SCORES:
            renderHighScores();
            break;
        
        case Game.GAME_OVER:
            renderGameOver();
            break; 
        default:
            console.error("Error: Game State invalid");
    }
}

function renderHome()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.drawImage(
        globals.tileSets[3],
    
        0, 0,                   //The source x and y position
        534, 320,               //The source height and width
        0, 0,                   //The destination x and y position
        534, 320,             //The destination height and width
    );                 
}

function renderHistory()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.drawImage(
        globals.tileSets[5],
    
        0, 0,                   //The source x and y position
        534, 320,               //The source height and width
        0, 0,                   //The destination x and y position
        534, 320,             //The destination height and width
    );                 
}

function renderHighScores()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.drawImage(
        globals.tileSets[4],
    
        0, 0,                   //The source x and y position
        534, 320,               //The source height and width
        0, 0,                   //The destination x and y position
        534, 320,             //The destination height and width
    );  
    renderScore();             
}

function renderGameOver()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.drawImage(
        globals.tileSets[6],
    
        0, 0,                   //The source x and y position
        534, 320,               //The source height and width
        0, 0,                   //The destination x and y position
        534, 320,             //The destination height and width
    );                 
}

function renderHUD()
{
        //TEST: Datos metidos en bruto
        const score = globals.score;
        const highScore = globals.highscore;
        const life = globals.life;
        const time = globals.levelTime.value;
        

        //Draw score
        globals.ctxHUD.font = '8px emulogic';
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("SCORE", 8, 8);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText( " " + globals.score, 8, 16);

        //Draw High Score 
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("HIGH SCORE", 72, 8);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText(" " + highScore, 72, 16);

        //Draw life 
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("LIFE", 168, 8);
        globals.ctxHUD.fillStyle =  'red';
        globals.ctxHUD.fillText(" " + globals.life, 168, 16);

        //Round corners. ( Remove 1 pixel per corner)
        globals.ctxHUD.fillStyle = 'black';
        globals.ctxHUD.fillRect(168, 9, 1, 1);
        globals.ctxHUD.fillRect(168, 15, 1, 1); 
        globals.ctxHUD.fillRect(168 + life - 1, 9, 1, 1);
        globals.ctxHUD.fillRect(168, + life - 1, 15, 1, 1);

        //Draw time
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("TIME", 224, 8);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText(time, 224, 16);
}

function drawGame()
{
  //Borramos la pntalla entera
  globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
  globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    //Movemos la camara
    moveCamera();

    //DIBUJAR FOONDO
    renderBackground();

    //Dibujamos mapa (nivel)
    renderMap();

    //Dibujamos los elementos
    drawSprites();  

    //Restauramos la camara
    restoreCamera();

    //Dibujamos el HUD
    renderHUD();

    renderParticles();
}

function renderSprite(sprite)
{
    //Calculamos la posición del tile de inicio
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    //Calculamos la posición en el tilemap a dibujar
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    //Dibujamos el nuevo fotograma del sprite en la posición adecuada
    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_64],                               //The image file
        xTile, yTile,                                   //The source x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize,   //The source height and width
        xPos, yPos,                                     //The destination x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize    //The destination heigth and width
    );
}

function drawSprites()
{
    for (let i = 0; i < globals.sprites.length; ++i)
    {
        const sprite = globals.sprites[i];

        //Test, dibujar rectangulo verde sprite
        drawSpriteRectangle(sprite);
    
        renderSprite(sprite);

        //TEST: Dibuja el HitBox
        drawHitBox(sprite);
        
    }
}

function drawSpriteRectangle(sprite)
{

    //Datos del sprite
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);
    const w1 = sprite.imageSet.xSize;
    const h1 = sprite.imageSet.ySize;

    globals.ctx.fillStyle = "transparent";
    globals.ctx.fillRect(x1, y1, w1, h1);
}

function drawHitBox (sprite)
{
        //Datos del sprite
        const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
        const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset);
        const w1 = sprite.hitBox.xSize;
        const h1 = sprite.hitBox.ySize;

    globals.ctx.strokeStyle = "transparent";
    globals.ctx.strokeRect (x1, y1, w1, h1);
}

//Dibuja mapa
function renderMap()
{
    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    //Dibujmos mapa
    const num_fil = levelData.length;
    const num_col = levelData[0].length;

    for ( let i = 0; i < num_fil; ++i)
    {
        for (let j = 0; j < num_col; ++j)
        {
            const xTile = (levelData[i][j] - 1) * brickSize;
            const yTile = 0;
            const xPos = j * brickSize;
            const yPos = i * brickSize;

            //Dibujamos el nuevo fotograma del sprite en la posición adecuada
            globals.ctx.drawImage(
                globals.tileSets[Tile.SIZE_32],   //The image file
                xTile, yTile,          //The source x and y position
                brickSize, brickSize,      //The source height and width
                xPos, yPos,               //The destination x and y position
                brickSize, brickSize,         //The destination height and width
            );
        }
    }
}

function renderBackground()
{
    globals.ctx.drawImage(
        globals.tileSets[2],
    
        0, 0,                   //The source x and y position
        1600, 320,               //The source height and width
        0, 0,                   //The destination x and y position
        1600, 320,             //The destination height and width
    );               
}

function moveCamera()
{
    const xTranslation = -globals.camera.x;
    const yTranslation = -globals.camera.y;

    globals.ctx.translate(xTranslation, yTranslation);
}

function restoreCamera()
{
    globals.ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function renderParticles()
{
    for (let i = 0; i < globals.particles.length; ++i)
    {
        const particle = globals.particles[i];
        renderParticle(particle);
    }
}

function renderParticle(particle)
{
    const type = particle.id;
    switch (type)
    {
        //Caso del jugador
        case ParticleID.EXPLOSION:
            renderExplosionParticle(particle);
            break;
    
        default:
            break;
     }
}

function renderExplosionParticle(particle)
{
    if(particle.state != ParticleState.OFF)
    {
        globals.ctx.fillStyle = 'red';
        globals.ctx.globalAlpha = particle.alpha; //Set alpha
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0,5 * Math.PI );
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;  //Restore alpha
    }
}

function renderScore()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    renderScores();
}

function renderScores()
{
    for (let i = 0; i < globals.scores.length; ++i)
    {
        const score = globals.scores[i];
        renderScoreTable(score);    
    }
}

function renderScoreTable(score)
{    
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.font = '42px emulogic';
    globals.ctx.fillStyle = 'green';
    globals.ctx.fillText("HIGH SCORES", 30,45);
    globals.ctx.font = '20px emulogic';
    globals.ctx.fillStyle = 'yellow';
    globals.ctx.fillText("POS  NAME    SCORE", 40,90);
    globals.ctx.font = '22px emulogic';
    globals.ctx.fillText("1   MIK    20000", 60,130);
    globals.ctx.fillText("2   JAV    15500", 60,165);
    globals.ctx.fillText("3   ASI    12000", 60,200);
    globals.ctx.fillText("4   EST    11500", 60,235);
    globals.ctx.fillText("5   IGO    10000", 60,270); 
    globals.ctx.font = '13px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.fillText("4 HOME", 20,300);  
    globals.ctx.backgroundStyle = 'black'; 
}