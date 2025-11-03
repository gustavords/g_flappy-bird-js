import { obstacles } from "./main.js";

export class Animate
{
  constructor ( canvas, update, render )
  {
    this.canvas = canvas;
    this.render = render;
    this.update = update;

    this.context = this.canvas.getContext( '2d' );
    this.animationId;
    this.startTime;
    this.deltaTime;
    this.accumulatedTime = 0;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fpsInterval;
    this.frame = 0;
    this.updateInterval = 5000;
    this.start(); //so its instantiated immediately
  }

  start ()
  {
    if ( !this.animationId || this.animationId )
    {
      this.animationId = window.requestAnimationFrame( this.animateGame );
    }
  }

  stop ()
  {
    if ( this.animationId )
    {
      console.log( `cancel` )
      window.cancelAnimationFrame( this.animationId );
    }
    window.cancelAnimationFrame( this.animationId );

  }

  animateGame = ( timestamp ) =>
  {
    this.deltaTime = timestamp - this.startTime; //milliseconds
    this.startTime = timestamp;
    if ( !this.deltaTime ) { this.deltaTime = 0 }
    this.accumulatedTime += this.deltaTime;
    // console.log( this.accumulatedTime );

    if ( this.accumulatedTime >= this.updateInterval )
    {
      this.update();
      this.accumulatedTime -= this.updateInterval;
    }

    this.render()

    this.start();

    if ( obstacles.hasCollided )
    {
      this.stop()
    }
  }

}

