import "./styles.css";
import { ResourceLoader } from "./ResourceLoader.js";
import { Animate } from "./Animate.js";
import { Sprite } from "./Sprite.js";
// import birdDude from "./assets/bird-dude.png";

const resources = new ResourceLoader();
const CANVAS = document.querySelector( `#canvas` );
const gameLoop = new Animate( CANVAS, update, render );
const ctx = gameLoop.context;

const bird = new Sprite( {
  context: ctx,
  image: resources.loadedImages.bird.image,
  src_x: 0,
  src_y: 0,
  src_w: 32,
  src_h:32,
  x: 0,
  y: 0,
  w: 32,
  h: 32,
  dx: 1,
  dy: 1,
  scale: 3
} )

function render ()
{
  bird.draw();
}

function update ()
{
  //  console.log(x);
  // x++;
}
