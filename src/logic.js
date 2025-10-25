/**
 * 
 * what gives and takes game points:
 * - like difficulty
 * - grabbing items
 * - collision stuff
*/
import { Rectangle } from "./assets.js";
import { ctx, CANVAS_HEIGHT, CANVAS_WIDTH, intervalCounter } from "./main.js"
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

    // if ( obj.x + obj.width >= canvas.width || obj.x <= 0 )
    // {
    //   // obj.dx = 0;
    //   // obj.dy = 0;
    //   this.inBoundary = false;
    // }
    // if ( obj.y + obj.height >= canvas.height || obj.y <= 0 )
    // {
    //   // obj.dx = 0;
    //   // obj.dy = 0;
    //   this.inBoundary = false;
    // }

    if ( ( obj.y + obj.height ) >= this.canvas_height )
    {
      // obj.dy = -obj.dy; 
      obj.dy *= -0.88; //reflection with damping;
      // for when obj goes beyond canvas   
      obj.y += -( ( obj.y + obj.height ) - this.canvas_height ) * 1.5
      return true;
    }
  }
}

class Obstacle
{
  constructor ()
  {
    this.obstacleArr = []
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


    if ( intervalCounter % 50 === 0 )
    {
      const top = new Rectangle( {  
        x: CANVAS_WIDTH,
        y: 0,
        width: 65,
        height: topH,
        ctx: ctx, 
        dx: 5,
        dy: 0,
      } );

      const btm = new Rectangle( {
        x: CANVAS_WIDTH,
        y: bottomY,
        width: 65,
        height: bottomH,
        ctx: ctx,
        dx: 5,
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





}