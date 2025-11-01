import { Dialog } from './menu.js';
import { Rectangle } from "./assets";
import { Controller, LEFT, RIGHT, UP, DOWN } from "./input";
import { Boundary, Obstacle } from "./logic";
import "./styles.css";
export { ctx, CANVAS_HEIGHT, CANVAS_WIDTH, intervalCounter, intervalId, game, stopGame, startGame, deltaTimeInSeconds }

const CANVAS = document.querySelector( `#canvas` );
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;
const ctx = CANVAS.getContext( `2d` );
let GRAVITY = 1;
let intervalCounter = 0;
let intervalId;
let animationId;


const rect = new Rectangle( { x: CANVAS_WIDTH / 3, y: CANVAS_HEIGHT / 2, width: 50, height: 50, ctx: ctx, dx: 0, dy: 0 } );
const control = new Controller();
const walls = new Boundary( { ctx: ctx, canvas_height: CANVAS_HEIGHT, canvas_width: CANVAS_WIDTH } );
const obstacles = new Obstacle();
const dialog = new Dialog();

let lastTimeStamp = 0;
let deltaTime;
let deltaTimeInSeconds = 0.00;
let fps = 60;
let fpsInterval = 1000 / fps;
let test  =5;


function updateDelta ( deltaTime ) 
{
  // let pF = ( deltaTime / 1000 );
  let pF = parseFloat( ( deltaTime / 1000 ).toFixed( 2 ) );

  if ( !pF ) { pF = 0 }

  // console.log( pF );
  return deltaTimeInSeconds += pF;
}



function animateGame ( timestamp )
{
  if ( lastTimeStamp === undefined )
  {
    lastTimeStamp = timestamp;
  }

  deltaTime = timestamp - lastTimeStamp;
  updateDelta( deltaTime );
  console.log( deltaTimeInSeconds )

  if ( deltaTime > fpsInterval )
  {
    // const value = ( timestamp - lastTimeStamp ) / fpsInterval;
    // console.log(value);
    ctx.fillRect( 50, 50, 50, 50 );

    
    lastTimeStamp = timestamp - ( deltaTime % fpsInterval )
  }
  game();

  startGame();

}


function game ()
{
  // if ( lastTimeStamp === undefined )
  // {
  //   lastTimeStamp = timestamp;
  // }

  // console.log( intervalCounter )
  // deltaTime = timestamp - lastTimeStamp;
  // deltaTimeInSeconds = Math.round( deltaTime.toFixed( 2 ) / 1000 );
  // console.log( deltaTimeInSeconds );
  // fpsInterval = 1000 / fps;

  animationId = undefined;
  // If cancelAnimationFrame() is called before requestAnimationFrame() has even had a chance to execute and return an ID, there will be nothing to cancel.
  //so this has to be at the start
  // startGame();

  // console.log( animationId )

  intervalCounter++;
  // ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
  walls.collided( rect );

  rect.dy += GRAVITY;
  control.jump( rect );

  obstacles.obstacleGeneration();
  obstacles.draw();
  // obstacles.collision( rect );

  // if ( obstacles.hasCollided )
  // {
  //   dialog.show();
  // }

  rect.move();
  // if ( deltaTime > fpsInterval )
  // {
  //update
  rect.draw();
  // }

}

window.requestAnimationFrame( animateGame );

function startGame ()
{
  if ( !animationId )
  {
    animationId = window.requestAnimationFrame( animateGame );
  }
}

function stopGame ()
{
  if ( animationId )
  {
    window.cancelAnimationFrame( animationId );
    animationId = undefined;
  }

}

