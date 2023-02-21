import globals from "./globals.js";
import {Tile, Game, ParticleID, ParticleState} from "./constants.js";
import { updateLetterTime } from "./gameLogic.js";

export default function render()
{
    //Change what thw game is doing based game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            renderLoading();
            renderBarra();
            break;

        case Game.PLAYING:
            drawGame();
            break;
        
        case Game.HOME:
            renderHome();
            break;

        case Game.LEVEL2:
            renderLevel2();
            break;
            
        case Game.PLAYING2:
            drawLevel2();
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

        case Game.PLAYERNAME:
            renderPlayerName();
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

function renderLevel2()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.drawImage(
        globals.tileSets[10],
    
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

function renderLoading()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.drawImage(
        globals.tileSets[7],
    
        0, 0,                   //The source x and y position
        534, 320,               //The source height and width
        0, 0,                   //The destination x and y position
        534, 320,             //The destination height and width
    );                 
}

function renderBarra()
{
    globals.ctx.fillStyle = "blue";
    globals.ctx.fillRect(38, 240, globals.assetsLoaded * (470/globals.assetsToLoad.length), 32);

    if(globals.assetsLoaded * (470/globals.assetsToLoad.length) === 470)
    {
        globals.ctx.font         = '14px emulogic';
        globals.ctx.fillStyle    = 'blue';
        globals.ctx.fillText("PRESS KEY  <SPACE>  TO CONTINUE", 60, 292);
    }
}

function renderHighScores()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    //moveCameraScore();
    renderScore();
    //restoreCamera();             
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
    globals.ctx.font         = '10px emulogic';
    globals.ctx.fillStyle    = 'red';  
    globals.ctx.fillText("PRESS KEY  <SPACE>  TO ENTER NAME IN HIGHSCORES", 35, 250);
}

function renderPlayerName() 
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctx.drawImage(
        globals.tileSets[8],
    
        0, 0,                   //The source x and y position
        534, 320,               //The source height and width
        0, 0,                   //The destination x and y position
        534, 320,             //The destination height and width  
    );  

    updateLetterTime();
    const agua = globals.agua;
    const frutas = globals.frutas;
    const score = globals.score;
    globals.ctx.font         = '50px emulogic';
    globals.ctx.fillStyle    = 'blue';  
    globals.ctx.fillText(globals.highscorename, 180, 170);

    globals.ctx.font = '18px emulogic';
    globals.ctx.fillText("WATER", 375, 260);
    globals.ctx.fillStyle =  'black';
    globals.ctx.fillText(agua, 385, 290);

    globals.ctx.fillStyle =  'green';
    globals.ctx.fillText("FRUIT", 215, 260);
    globals.ctx.fillStyle =  'black';
    globals.ctx.fillText(frutas, 230, 290);

    globals.ctx.font = '18px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.fillText("SCORE", 50, 260);
    globals.ctx.fillStyle =  'black';
    globals.ctx.fillText(score, 70, 290);
}

function renderHUD()
{
        //TEST: Datos metidos en bruto
        const score = globals.score;
        const highScore = globals.scores[0].score;
        const name = globals.scores[0].name;
        const life = globals.life;
        const time = globals.levelTime.value;
        const frutas = globals.frutas;
        
        //Draw score
        globals.ctxHUD.font = '8px emulogic';
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("SCORE", 8, 8);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText( " " + score, 6, 18);

        //Draw High Score 
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("HIGH SCORE", 62, 8);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText(name+" " + highScore, 70, 18);

        //Draw life 
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("LIFE", 155, 8);
        globals.ctxHUD.fillStyle =  'green';
        globals.ctxHUD.fillRect(157,10, life, 8);

        //Round corners. ( Remove 1 pixel per corner)
        globals.ctxHUD.fillStyle = 'black';
        globals.ctxHUD.fillRect(168, 9, 1, 1);
        globals.ctxHUD.fillRect(168, 15, 1, 1); 
        globals.ctxHUD.fillRect(168 + life - 1, 9, 1, 1);
        globals.ctxHUD.fillRect(168, + life - 1, 15, 1, 1);

        //Draw fruits
        globals.ctxHUD.drawImage(globals.tileSets[11], 200, -3);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText(" " + frutas, 214, 18);
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

    drawStats();
    
    if (globals.score > 1500)
    {
        drawLevel2();
    }
    if(globals.score > 4000)
    {
        drawLevel3();
    }
    
}

function drawStats()
{
    const agua = globals.agua;
    globals.ctx.font         = '40px emulogic';
    globals.ctx.fillStyle    = 'green';
    globals.ctx.fillText("LEVEL 1", 100, 50);
    globals.ctx.font         = '15px emulogic';
    globals.ctx.fillStyle    = 'green';
    globals.ctx.fillText("TIME:" + globals.levelTime.value, 410, 25);
    globals.ctx.drawImage(globals.tileSets[12], 8, 0);
    globals.ctx.fillStyle =  'green';
    globals.ctx.fillText(":" + agua, 30, 33);
}

function drawLevel2()
{
    //Borramos la pntalla entera
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    //Movemos la camara
    moveCamera();
    
    //DIBUJAR FOONDO
    renderLevel2Background();

    //Dibujamos mapa (nivel)
    renderMap();

    //Dibujamos los elementos
    drawSprites();  

    //Restauramos la camara
    restoreCamera();

    //Dibujamos el HUD
    renderHUD();

    renderParticles();

    const agua = globals.agua;
    globals.ctx.font         = '40px emulogic';
    globals.ctx.fillStyle    = 'brown';
    globals.ctx.fillText("LEVEL 2", 95, 50);
    globals.ctx.font         = '15px emulogic';
    globals.ctx.fillStyle    = 'brown';
    globals.ctx.fillText("TIME:" + globals.levelTime.value, 410, 25);
    globals.ctx.drawImage(globals.tileSets[12], 8, 0);
    globals.ctx.fillStyle =  'lightbrown';
    globals.ctx.fillText(":" + agua, 30, 33);
}

function drawLevel3()
{
  //Borramos la pntalla entera
  globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
  globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
  

    //Movemos la camara
    moveCamera();
    
    //DIBUJAR FOONDO
    renderLevel3Background();

    //Dibujamos mapa (nivel)
    renderMap();

    //Dibujamos los elementos
    drawSprites();  

    //Restauramos la camara
    restoreCamera();

    //Dibujamos el HUD
    renderHUD();

    renderParticles();

    const agua = globals.agua;
    globals.ctx.font         = '40px emulogic';
    globals.ctx.fillStyle    = 'pink';
    globals.ctx.fillText("LEVEL 3", 95, 50);
    globals.ctx.font         = '15px emulogic';
    globals.ctx.fillStyle    = 'pink';
    globals.ctx.fillText("TIME:" + globals.levelTime.value, 410, 25);
    globals.ctx.drawImage(globals.tileSets[12], 8, 0);
    globals.ctx.fillStyle =  'lightpink';
    globals.ctx.fillText(":" + agua, 30, 33);
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
        globals.tileSets[Tile.SIZE_64],                 //The image file
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
        3200, 320,               //The source height and width
        -500, 0,                   //The destination x and y position
        3200, 320,             //The destination height and width
    );               
}

function renderLevel2Background()
{
    globals.ctx.drawImage(
        globals.tileSets[9],
    
        0, 0,                   //The source x and y position
        3200, 320,               //The source height and width
        -500, 0,                   //The destination x and y position
        3200, 320,             //The destination height and width
    );       
}

function renderLevel3Background()
{
    globals.ctx.drawImage(
        globals.tileSets[10],
    
        0, 0,                   //The source x and y position
        3200, 320,               //The source height and width
        -500, 0,                   //The destination x and y position
        3200, 320,             //The destination height and width
    );       
}

function moveCamera()
{
    const xTranslation = -globals.camera.x;
    const yTranslation = -globals.camera.y;

    globals.ctx.translate(xTranslation, yTranslation);
}

function moveCameraScore()
{
    const yTranslation = globals.highScoreCam.y;
    globals.ctx.translate(0, yTranslation);
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
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 5 * Math.PI );
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;  //Restore alpha
    }
}

function renderScore()
{
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    renderScores();
    globals.ctx.fillStyle = 'rgb(189, 106, 161)';
    globals.ctx.fillRect(0, 0,globals.canvas.width, 75);
    globals.ctx.font = '42px emulogic';
    globals.ctx.fillStyle = 'green';
    globals.ctx.fillText("HIGH SCORES", 30,45);
    globals.ctx.font = '16px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.fillText("NAME     SCORE", 110,70);
    globals.ctx.font = '10px emulogic';
    globals.ctx.fillStyle = 'red';
    globals.ctx.fillText("4HOME", 485,75)
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
    
    for( let i = 0; i < globals.scores.length; ++i)
    {
        moveCameraScore();
        globals.ctx.font = '30px emulogic';
        globals.ctx.fillStyle = 'white';
        globals.ctx.fillText((i + 1),score.xPos + 30, score.yPos + 100); 
        globals.ctx.font = '30px emulogic';
        globals.ctx.fillStyle = 'white';
        globals.ctx.fillText(score.name, score.xPos + 70, score.yPos + 100);
        globals.ctx.fillText(score.score, score.xPos + 220, score.yPos + 100); 
        restoreCamera();
    }
    
 }