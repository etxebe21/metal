import globals from "./globals.js";
import { Block, State, SpriteID } from "./constants.js";

//Función que calcula si 2 rectángulos interseccionan
function rectIntersect ( x1, y1, w1, h1, x2, y2, w2, h2)
{
    let isOverlap;

    //Check x and y for overlap
    if ( x2> w1 + x1 || x1> w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2)
    {
        isOverlap = false;
    }
    else 
    
        isOverlap = true;
    
    return isOverlap;
}

export default function detectCollisions()
{
    //Calculamos colision del player con cada uno de los sprites
    for ( let i = 1; i < globals.sprites.length; ++i)
    {
        const sprite = globals.sprites[i];
        detectCollisionBetweenPlayerAndSprite(sprite);
    
        if (sprite.id === SpriteID.BULLET)
        {
            for ( let j = 1; j < globals.sprites.length; ++j)
            {      
                const enemy = globals.sprites[j];
                if(enemy.id === SpriteID.TORO || enemy.id === SpriteID.ZEZEN || enemy.id === SpriteID.BRUJA || enemy.id === SpriteID.FIRE)
                {
                    detectCollisionBetweenDisparoAndSprite(sprite, enemy);        
                }
            }
        }
    }
    //Calculamos colision del player con los obstaculos del mapa
    detectCollisionBetweenPlayerAndMapObstacles();
}

function detectCollisionBetweenPlayerAndSprite (sprite)
{    
        //Reset collision state
        sprite.isCollidingWithPlayer = false;

        //Nustro player esta en la posición 0 
        const player = globals.sprites[0];

        //Datos del player
        const x1 = player.xPos + player.hitBox.xOffset;
        const y1 = player.yPos + player.hitBox.yOffset;
        const w1 = player.hitBox.xSize;
        const h1 = player.hitBox.ySize;

        //Datos de otro sprite
        const x2 = sprite.xPos + sprite.hitBox.xOffset;
        const y2 = sprite.yPos + sprite.hitBox.yOffset;
        const w2 = sprite.hitBox.xSize;
        const h2 = sprite.hitBox.ySize;

        const isOverlap = rectIntersect (x1, y1, w1, h1, x2, y2, w2, h2) 
        //console.log("entra hasta aqui");
        if(isOverlap)
        {
            //Existe colision
            sprite.isCollidingWithPlayer = true;
        }
}

function detectCollisionBetweenDisparoAndSprite ( bullet, sprite)
{    
        //Reset collision state
        sprite.isCollidingWithDisparo = false;
        // bullet.isCollidingWith        = false;

        //Datos del disparo
        const x1 = bullet.xPos + bullet.hitBox.xOffset;
        const y1 = bullet.yPos + bullet.hitBox.yOffset;
        const w1 = bullet.hitBox.xSize;
        const h1 = bullet.hitBox.ySize;

        //Datos de otro sprite
        const x2 = sprite.xPos + sprite.hitBox.xOffset;
        const y2 = sprite.yPos + sprite.hitBox.yOffset;
        const w2 = sprite.hitBox.xSize;
        const h2 = sprite.hitBox.ySize;

        const isOverlap = rectIntersect (x1, y1, w1, h1, x2, y2, w2, h2) 
        //console.log("entra hasta aqui");
        if(isOverlap)
        {
            //Existe colision
            sprite.isCollidingWithDisparo = true;
            bullet.isCollidingWith        = true;
        }
}

//Deevuelve el Id del tile del mapa para las coordenadas xPos y yPos
function getMapTileId (xPos, yPos)
{
    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    const fil = Math.floor(yPos / brickSize);
    const col = Math.floor(xPos / brickSize);

    return levelData[fil][col];
}

function isCollidingWithObstacleAt (xPos, yPos,)
{
    let isColliding;

    const id = getMapTileId(xPos, yPos);

    //Calculamos colision con bloque de cristal 
    if (id === Block.BROWN_1)
        isColliding = true;
    else
        isColliding = false;

    return isColliding;
}

//Calculo de cvolision con los bloques del mapa
function detectCollisionBetweenPlayerAndMapObstacles()
{
    const player = globals.sprites[0];

    //Reset collision state
    player.isCollidingWithObstacleOnTheRight = false;

    //Variables to use
    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isColliding;
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const direction = player.state;

    //ID del obsatculo
    const obstacleId = Block.BROWN_1;  //aqui cambiarlo!!!!!!!!!!!!

    switch(direction)
    {
        case State.RIGHT:

            //pRIMERA colision en ( xPos + xSize - 1 , y Pos)
            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize -1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);

            //Segunda colision en (xPos + xSize -1, yPos + brickSize)
            yPos = player.yPos + player.hitBox.yOffset + brickSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt (xPos, yPos, obstacleId);

            //Ultima colision en (xPos + xSize -1, yPos + ySize -1)
            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize -1;
            isCollidingOnPos3 = isCollidingWithObstacleAt (xPos, yPos, obstacleId);

            //Habra colision si toca alguno de los 3 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

            if(isColliding)
            {
                //Exist colision a la derecha
                player.isCollidingWithObstacleOnTheRight = true;

                //AJUSTE: Calculamos solapamiento (overlap) y lo eliminiamos
                //moviendo el personaje tantos pixeles como overlap a la izda
                overlap = Math.floor(xPos) % brickSize + 1;
                player.xPos -= overlap;
            }
                break;
        
        case State.LEFT:

            //pRIMERA colision en ( xPos + xSize - 1 , y Pos)
            xPos = player.xPos + player.hitBox.xOffset -1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleId);


            //Ultima colision en (xPos + xSize -1, yPos + ySize -1)
            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize -1;
            isCollidingOnPos3 = isCollidingWithObstacleAt (xPos, yPos, obstacleId);

            //Habra colision si toca alguno de los 3 bloques
            isColliding = isCollidingOnPos1 || isCollidingOnPos3;

            if(isColliding)
            {
                //Exist colision a la derecha
                player.isCollidingWithObstacleOnTheRight = true;

                //AJUSTE: Calculamos solapamiento (overlap) y lo eliminiamos
                //moviendo el personaje tantos pixeles como overlap a la izda
                overlap = (Math.floor(xPos) % brickSize) - brickSize + 1;
                player.xPos -= overlap;
            }
                break;

            default:
            
                break;
        }
}
































































