// export class Animate
// {
//   constructor( canvas )
//   {
//     this.canvas = canvas;
//     this.context = this.canvas.getContext( '2d' );
//     this.animationId;
//     this.startTime;
//     this.deltaTime;
//     this.accumulatedTime = 0;
//     this.fps ??= 60;
//     this.fpsInterval = 1000 / this.fpsInterval;
//     this.start();
//     this.test = 0;
//   }


//   start = () =>
//   {
//     if ( !this.animationId )
//     {
//       console.log( `here` )
//       this.animationId = requestAnimationFrame( this.animateGame );
//     }
//   }

//   stop()
//   {
//     if ( this.animationId )
//     {
//       cancelAnimationFrame( this.animationId );
//     }
//   }

//   animateGame = ( timestamp ) =>
//   {

//     // this.context.fillRect( 50, 50, 50, 50 );

//     console.log( this.animationId )
//     this.start();
//     console.log( this.animationId )
//     console.log( this.test++ );

//     this.start;
//   }

// }

export { animateGame, startAnimation, stopAnimation }

const CANVAS = document.querySelector( `#canvas` );
const context = canvas.getContext( '2d' );
let animationId;
let startTime;
let deltaTime;
let accumulatedTime = 0;
let fps = 60;
let fpsInterval = 1000 / fps;
let y = 0;
let x = 0;

const toggle = document.querySelector( `#pause` );
toggle.checked = false;


toggle.addEventListener( `click`, ( e ) =>
{
  toggle.checked ? stopAnimation() : startAnimation();
  // if ( toggle.checked )
  // {
  //   stopAnimation();
  // }

  // else
  // {
  //   startTime = 0;
  //   startAnimation();
  // }
} );


function animateGame ( timestamp )
{
  if ( !startTime ) { startTime = timestamp; }

  deltaTime = timestamp - startTime; //milliseconds
  startTime = timestamp;
  accumulateDeltaTime( deltaTime );


  //doing stuff at intervals seconds
  while ( accumulatedTime >= 5000 )
  {
    update();
    accumulatedTime -= 5000;
  }


  render();
  startAnimation();
}


function startAnimation ()
{
  if ( !animationId || animationId )
  {
    animationId = window.requestAnimationFrame( animateGame );
  }
}

function stopAnimation ()
{
  if ( animationId )
  {
    window.cancelAnimationFrame( animationId );
    animationId = undefined;
  }
}

function accumulateDeltaTime ( deltaTime )
{
  if ( !deltaTime ) { deltaTime = 0 }
  return accumulatedTime += deltaTime;
}

function render ()
{
  context.clearRect( 0, 0, CANVAS.width, CANVAS.height )
  context.fillRect( 50, y, 50, 50 );
  y++;
}

function update ()
{
  context.strokeRect( x, 50, 50, 50 );
  x++;
}
