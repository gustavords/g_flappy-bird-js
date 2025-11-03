import { Sprite } from "./Sprite.js";
import { CANVAS } from "./main.js";
import { resources } from "./ResourceLoader.js";

export class Obstacle
{
  constructor ( ctx )
  {
    this.ctx = ctx;
    this.obstacleArr = [];
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
    const bottomH = CANVAS.height - bottomY;


    const top = new Sprite( {
      context: this.ctx,
      image: resources.loadedImages.towerD.image,
      src_x: 16,
      src_y: 0,
      src_w: 32,
      src_h: 64,
      x: CANVAS.width,
      y: 0,
      w: 65,
      h: topH,
      dx: 1,
      dy: 0,
      scale: 1,

    } );

    const btm = new Sprite( {
      context: this.ctx,
      image: resources.loadedImages.towerU.image,
      src_x: 16,
      src_y: 0,
      src_w: 32,
      src_h: 64,
      x: CANVAS.width,
      y: bottomY,
      w: 65,
      h: bottomH,
      dx: 1,
      dy: 0,
      scale: 1,
    } );

    //place in a array
    this.obstacleArr.push( top );
    this.obstacleArr.push( btm );
  }


  draw ()
  {
    this.obstacleArr.forEach( ( obstacle ) =>
    {
      obstacle.x -= obstacle.dx;
      obstacle.draw()
    } );

  }

  collision ( sprite )
  {
    this.obstacleArr.forEach( ( obstacle ) =>
    {

      if ( sprite.x < obstacle.x + obstacle.w && sprite.x + sprite.w > obstacle.x &&
        sprite.y < obstacle.y + obstacle.h && sprite.y + sprite.h > obstacle.y )
      {
        this.hasHit = true;
        console.log( this.hasHit );
      }
    } );

    // return this.hasHit;
  }

}
