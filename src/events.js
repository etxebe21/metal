import { Key, Sound } from "./constants.js";
import globals from "./globals.js";

export function keydownHandler(event)
{
    switch(event.keyCode)
    {
        case Key.UP:
            globals.action.moveUp = true;
            break;

        case Key.DOWN:
            globals.action.moveDown = true;
            break;

        case Key.LEFT:
            globals.action.moveLeft = true;
            break;

        case Key.RIGHT:
            globals.action.moveRight = true;
            break;

        case Key.JUMP:
            globals.action.jump = true;
            break;

        case Key.ATTACK:
            globals.action.moveAttack = true;
            break;

        case Key.ONE:
            globals.action.move1 = true;
            break;
    
        case Key.TWO:
            globals.action.move2 = true;
            break;
    
        case Key.THREE:
            globals.action.move3 = true;
            break;
    
        case Key.FOUR:
            globals.action.move4 = true;
            break;

        case Key.FIVE:
            globals.action.move5 = true;
            break;
    }
}

export function keyupHandler(event)
{
    switch(event.keyCode)
    {
        case Key.UP:
            globals.action.moveUp = false;
            break;

        case Key.DOWN:
            globals.action.moveDown = false;
            break;

        case Key.LEFT:
            globals.action.moveLeft = false;
            break;

        case Key.RIGHT:
            globals.action.moveRight = false;
            break;

        case Key.JUMP:
            globals.action.jump = false;
            break;

        case Key.ATTACK:
            globals.action.moveAttack = false;
            break;

        case Key.ONE:
            globals.action.move1 = false;
            break;

        case Key.TWO:
            globals.action.move2 = false;
            break;

        case Key.THREE:
            globals.action.move3 = false;
            break;

        case Key.FOUR:
            globals.action.move4 = false;
            break;

        case Key.FIVE:
            globals.action.move5 = false;
            break;
    }
}

export  function updateMusic()
{
    const buffer = 0.28;
    const music = globals.sounds[Sound.GAME_MUSIC];
    if(music.currentTime > music.duration - buffer)
    {
        music.currentTime = 0;
        music.play();
    }
}