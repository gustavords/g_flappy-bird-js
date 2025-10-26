/**
 * 
 * what gives and takes game points:
 * - like difficulty
 * - grabbing items
 * - collision stuff
*/
import { Rectangle } from "./assets.js";
import { ctx, CANVAS_HEIGHT, CANVAS_WIDTH, intervalCounter, intervalId } from "./main.js"
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

  collision ( obj )
  {

    this.obstacleArr.forEach( obstacle =>
    {

      const yA1 = obj.y;
      const yB1 = obj.y + obj.height;
      const yA2 = obstacle.y;
      const yB2 = obstacle.y + obstacle.height;
      const xA1 = obj.x;
      const xB1 = obj.x + obj.width;
      const xA2 = obstacle.x;
      const xB2 = obstacle.x + obstacle.width;

      if ( ( yA1 <= yB2 && yB2 < yB1 || yB1 >= yA2 && yA1 < yA2 ) &&
        ( xA1 <= xB2 && xB2 < xB1 || xB1 >= xA2 && xA1 < xA2 ) )
      {
        clearInterval( intervalId );
      }

    } );


  }

}