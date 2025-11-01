/**
 * 
 * what gives and takes game points:
 * - like difficulty
 * - grabbing items
 * - collision stuff
*/
import { Rectangle } from "./assets.js";
import { ctx, CANVAS_HEIGHT, CANVAS_WIDTH, intervalCounter, intervalId, stopGame, deltaTimeInSeconds } from "./main.js"
export { Boundary, Obstacle }

class Boundary
{
  constructor ( { ctx, canvas_width, canvas_height } )
  {
    this.ctx = ctx;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.inBoundary;
  }

  collided ( obj )
  {
    if ( ( obj.y + obj.height ) >= this.canvas_height )
    {
      // obj.dy = -obj.dy; 
      obj.dy *= -.6; //reflection with damping;
      // for when obj goes beyond canvas   
      obj.y += -( ( obj.y + obj.height ) - this.canvas_height ) * 1.5
      return this.inBoundary = true;
    }
  }
}

class Obstacle
{
  constructor ()
  {
    this.obstacleArr = []
    this.hasHit = false;
  }

  get hasCollided ()
  {
    return this.hasHit;
  }

  obstacleGeneration ()
  {
    const rdmNum = ( max, min ) =>
    {
      return Math.floor( Math.random() * ( max - min ) + min );
    }

    const topH = rdmNum( 450, 50 );
    const spaceBetween = rdmNum( 150, 100 );
    const bottomY = topH + spaceBetween;
    const bottomH = CANVAS_HEIGHT - bottomY;

    if ( deltaTimeInSeconds % 60 === 0 )
    {
      console.log( deltaTimeInSeconds + `-------------------------` )

      const top = new Rectangle( {
        x: CANVAS_WIDTH,
        y: 0,
        width: 65,
        height: topH,
        ctx: ctx,
        dx: 1,
        dy: 0,
      } );

      const btm = new Rectangle( {
        x: CANVAS_WIDTH,
        y: bottomY,
        width: 65,
        height: bottomH,
        ctx: ctx,
        dx: 1,
        dy: 0,
      } );

      //place in a array
      this.obstacleArr.push( top );
      this.obstacleArr.push( btm );
    }
  }


  draw ()
  {
    ctx.fillStyle = `blue`;

    this.obstacleArr.forEach( obstacle =>
    {
      obstacle.x -= obstacle.dx;
      obstacle.draw()
    } );
    ctx.fillStyle = `green`;

  }

  collision ( obj )
  {

    this.obstacleArr.forEach( obstacle =>
    {

      if ( obj.x < obstacle.x + obstacle.width && obj.x + obj.width > obstacle.x &&
        obj.y < obstacle.y + obstacle.height && obj.y + obj.height > obstacle.y )
      {
        this.hasHit = true;
        // clearInterval( intervalId );
        stopGame();
      }
    } );

  }

}