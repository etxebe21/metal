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
    //Aqui actualizariamos el estado de las variables del player

    sprite.xPos = 10;
    sprite.yPos = 50;

    sprite.frames.frameCounter = 2;

    sprite.state = State.LEFT;
}

//Funcion que actualiza el pirata
function updatePirate(sprite)
{
//Actualizríamos el estadop de variables pirata

sprite.xPos = 150;
sprite.yPos = 130;

sprite.state = State.LEFT_2;

sprite.frames.frameCounter = 3;
}



function playGame()
{
    updateSprites();
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
