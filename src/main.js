import { Rectangle } from "./assets";
import { Controller, LEFT, RIGHT, UP, DOWN } from "./input";
import { Boundary, Obstacle } from "./logic";
import "./styles.css";
export { ctx, CANVAS_HEIGHT, CANVAS_WIDTH, intervalCounter, intervalId }

const CANVAS = document.querySelector( `#canvas` );
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;
const ctx = CANVAS.getContext( `2d` );
let GRAVITY = 3.14;
let intervalCounter = 0;
let intervalId;


const rect = new Rectangle( { x: CANVAS_WIDTH / 3, y: CANVAS_HEIGHT / 2, width: 50, height: 50, ctx: ctx, dx: 0, dy: 0 } );
const control = new Controller();
const walls = new Boundary( { ctx: ctx, canvas_height: CANVAS_HEIGHT, canvas_width: CANVAS_WIDTH } );
const obstacles = new Obstacle();


function game ()
{
  intervalCounter++;
  ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
  walls.collided( rect );

  rect.dy += GRAVITY;
  control.jump( rect );

  obstacles.obstacleGeneration();
  obstacles.draw();
  obstacles.collision(rect);

  rect.move();
  rect.draw();

}
intervalId = setInterval( game, 60 );

// requestAnimationFrame

