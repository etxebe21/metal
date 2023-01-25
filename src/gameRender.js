import globals from "./globals.js";
import {Tile, Game, SpriteID} from "./constants.js";
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

        default:
            console.error("Error: Game State invalid");
    }
}

function renderHUD()
{
        //TEST: Datos metidos en bruto
        const score = 1990;
        const highScore = 18990;
        const life = 50;
        const time = globals.levelTime.value;
        

        //Draw score
        globals.ctxHUD.font = '8px emulogic';
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("SCORE", 8, 8);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText( " " + score, 8, 16);

        //Draw High Score 
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("HIGH SCORE", 72, 8);
        globals.ctxHUD.fillStyle =  'lightgray';
        globals.ctxHUD.fillText(" " + highScore, 72, 16);

        //Draw life 
        globals.ctxHUD.fillStyle = 'lightgreen';
        globals.ctxHUD.fillText("LIFE", 168, 8);
        globals.ctxHUD.fillStyle =  'red';
        globals.ctxHUD.fillRect(168, 9, life, 8);

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

    //Dibujamos mapa (nivel)
    renderMap();

    //Dibujamos los elementos
    drawSprites();  

    //Dibujamos el HUD
    renderHUD();
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

    globals.ctx.fillStyle = "white";
    globals.ctx.fillRect(x1, y1, w1, h1);
}

function drawHitBox (sprite)
{

    if(sprite.id === SpriteID.PLAYER)
    {
        //Datoa del sprite
        const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
        const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset);
        const w1 = sprite.hitBox.xSize;
        const h1 = sprite.hitBox.ySize;

    globals.ctx.strokeStyle = "red";
    globals.ctx.strokeRect (x1, y1, w1, h1);
    }
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