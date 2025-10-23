import { Rectangle } from "./assets";
import { Controller, LEFT, RIGHT, UP, DOWN } from "./input";
import "./styles.css";


const CANVAS = document.querySelector( `#canvas` );
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;
const ctx = CANVAS.getContext( `2d` );
const GRAVITY = 2;

setInterval( game, 60 );


const rect = new Rectangle( { x: CANVAS_WIDTH / 3, y: CANVAS_HEIGHT - 50, width: 50, height: 50, ctx: ctx } );
console.log( rect.dy )
const control = new Controller();
function game ()
{
  ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
  control.movement( rect );
  // rect.x++;
  rect.y += GRAVITY;
  // rect.y += rect.dy;

  control.jump( rect );
  rect.draw();

}



