import "./styles.css";
import { resources } from "./ResourceLoader.js";
import { Animate } from "./Animate.js";
import { Sprite } from "./Sprite.js";
import { Control } from "./Control.js";
import { Obstacle } from "./Obstacle.js";

export { CANVAS, obstacles }

const CANVAS = document.querySelector( `#canvas` );
const gameLoop = new Animate( CANVAS, update, render );
const obstacles = new Obstacle( gameLoop.context );
const GRAVITY = .3;
const bird = new Sprite( {
  context: gameLoop.context,
  image: resources.loadedImages.bird.image,
  src_x: 0,
  src_y: 0,
  src_w: 32,
  src_h: 32,
  x: CANVAS.width / 3,
  y: 0,
  w: 32,
  h: 32,
  dx: 0,
  dy: 0,
  scale: 2
} )
const birdControl = new Control();

const toggle = document.querySelector( `#pause` );
toggle.checked = false;
toggle.addEventListener( `click`, () => { toggle.checked ? gameLoop.stop() : gameLoop.start(); } );



function render ()
{
  gameLoop.context.clearRect( 0, 0, CANVAS.width, CANVAS.height );

  obstacles.draw();
  obstacles.collision( bird );
  
  bird.dy += GRAVITY;
  hitCanvasBottom( bird );
  bird.draw();
  bird.update();
  birdControl.move( bird );
}

function update ()
{
  obstacles.obstacleGeneration();
}


function hitCanvasBottom ( sprite )
{
  if ( ( sprite.y + sprite.h ) >= CANVAS.height )
  {
    sprite.dy *= -.6; //reflection with damping;
    // for when sprite goes beyond canvas   
    sprite.y += -( ( sprite.y + sprite.h ) - CANVAS.height ) * 1.5
    // sprite.y = CANVAS.height - sprite.h;
  }
}