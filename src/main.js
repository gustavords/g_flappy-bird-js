import "./styles.css";
import { ResourceLoader } from "./ResourceLoader.js";
import { Animate } from "./Animate.js";
import { Sprite } from "./Sprite.js";
import { Control } from "./Control.js";

const resources = new ResourceLoader();
const CANVAS = document.querySelector( `#canvas` );
const gameLoop = new Animate( CANVAS, update, render );
const GRAVITY = .3;

const toggle = document.querySelector( `#pause` );
toggle.checked = false;
toggle.addEventListener( `click`, () => { toggle.checked ? gameLoop.stop() : gameLoop.start(); } );


const bird = new Sprite( {
  context: gameLoop.context,
  image: resources.loadedImages.bird.image,
  src_x: 0,
  src_y: 0,
  src_w: 32,
  src_h: 32,
  x: CANVAS.width/3,
  y: 0,
  w: 32,
  h: 32,
  dx: 0,
  dy: 0,
  scale: 2
} )
const birdControl = new Control();

function render ()
{
  gameLoop.context.clearRect(0, 0, CANVAS.width, CANVAS.height);
  
  bird.dy += GRAVITY;

  bird.draw();
  bird.update();
  birdControl.move( bird );

}

function update ()
{

}
