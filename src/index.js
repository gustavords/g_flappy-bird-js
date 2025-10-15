import "./styles.css";

const theCanvas = () =>
{
  const canvas_el = document.getElementById( `canvas` );
  const ctx = canvas_el.getContext( `2d` );
  const height = canvas_el.height;
  const width = canvas_el.width;
  const clear = () =>
  {
    ctx.beginPath();
    ctx.clearRect( 0, 0, width, height );
  };

  const atInterval = ( time, frame ) =>
  {
    return ( frame / time ) % 1 === 0 ? true : false;
  }
  return { canvas_el, ctx, height, width,  clear, atInterval }
};

class GameObj
{
  constructor ( xpos, ypos, width, height, colour, speed )
  {
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
    this.multiples = [];
  }

  draw ( ctx )
  {
    ctx.fillStyle = this.colour;
    ctx.fillRect( this.xpos, this.ypos, this.width, this.height );
  }
  update ()
  {
    this.xpos += this.dx;
    this.ypos += this.dy;
  }

  static drawMultipleMoving ( ctx, arr )
  {
    arr.forEach( ( gameObj ) =>
    {
      gameObj.xpos -= 1;
      gameObj.draw( ctx );
    } );
  }
  static createAtInterval ( frame, atInterval, arr )
  {
    if ( frame == 1 || atInterval )
    {
      arr.push( new GameObj( theCanvas().width, 100, 100, 200, `green`, 0 ) );
    }
  }
}

const rec_1 = new GameObj( 10, 10, 50, 50, `black`, 0 );
const towers = [];
let currFrame = 0;

function loadOnCanvas ()
{
  document.addEventListener( `keydown`, keyHandlerDown );
  document.addEventListener( `keyup`, keyHandlerUp );
  theCanvas().clear();

  currFrame++;

  GameObj.createAtInterval( currFrame, theCanvas().atInterval( 200, currFrame ), towers );
  GameObj.drawMultipleMoving( theCanvas().ctx, towers );

  rec_1.draw( theCanvas().ctx );
  rec_1.update()

}

function keyHandlerDown ( e )
{
  let speed = 4;
  if ( !e.repeat )
  {
    if ( e.key === `ArrowLeft` )
    {
      rec_1.dx = -speed;
      console.log( e.key );
    }
    if ( e.key === `ArrowUp` )
    {
      rec_1.dy = -speed;

      console.log( e.key );
    }
    if ( e.key === `ArrowRight` )
    {
      rec_1.dx = speed;
      console.log( e.key );
    }
    if ( e.key === `ArrowDown` )
    {
      rec_1.dy = speed;
      console.log( e.key );
    }
  }
  document.removeEventListener( `keyup`, keyHandlerUp );
}

function keyHandlerUp ( e )
{
  theCanvas().ctx.restore()

  rec_1.dx = 0;
  rec_1.dy = 0;
  // rec_1.speed = 0;
  theCanvas().ctx.save()

  document.removeEventListener( `keydown`, keyHandlerDown );
}
setInterval( loadOnCanvas, 20 );



// class Screen
// {
//   canvas_el = document.getElementById( `canvas` );
//   canvas_ctx = this.canvas_el.getContext( `2d` );
//   width = this.canvas_el.width;
//   height = this.canvas_el.height;
//   state = () => { return setInterval( gameState, 50 ) };
//   frame = 0;

//   clearCanvas ()
//   {
//     this.canvas_ctx.clearRect( 0, 0, this.width, this.height );
//   }

//   stop ( state )
//   {
//     clearInterval( state );
//   }
// }

// //should be other name since its all rectangles
// class GameObject extends Screen
// {
//   constructor ( positionX, positionY, colour, width, height )
//   {
//     super();
//     this.positionX = positionX;
//     this.positionY = positionY;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.colour = colour;
//     this.width = width;
//     this.height = height;
//   }
//   drawObject ()
//   {
//     this.canvas_ctx.fillStyle = this.colour;
//     this.canvas_ctx.fillRect( this.positionX, this.positionY, this.width, this.height )
//   }

//   collisionDetected ( gameObject )
//   {
//     let obj_a_left = this.positionX;
//     let obj_a_right = this.positionX + this.width;
//     let obj_a_top = this.positionY;
//     let obj_a_bottom = this.positionY + this.height;

//     let obj_b_left = gameObject.positionX;
//     let obj_b_right = gameObject.positionX + gameObject.width;
//     let obj_b_top = gameObject.positionY;
//     let obj_b_bottom = gameObject.positionY + gameObject.height;

//     let crash = true;

//     if ( ( obj_a_bottom < obj_b_top ) ||
//       ( obj_a_top > obj_b_bottom ) ||
//       ( obj_a_right < obj_b_left ) ||
//       ( obj_a_left > obj_b_right ) )
//     {
//       crash = false;
//     }

//     return crash;
//   }

//   updatePosition = () =>
//   {
//     this.positionX += this.speedX;
//     if ( this.positionX >= ( gameArea.width - this.width ) )
//     {
//       this.positionX = ( gameArea.width - this.width );
//       this.speedX = 0;
//     }
//     else if ( this.positionX <= 0 )
//     {
//       this.positionX = 0;
//       this.speedX = 0;
//     }
//     else
//     {
//       this.positionX += this.speedX;
//     }

//     this.positionY += this.speedY;
//     if ( this.positionY >= ( gameArea.height - this.height ) )
//     {
//       this.positionY = ( gameArea.height - this.height );
//       this.speedY = 0;
//     }
//     else if ( this.positionY <= 0 )
//     {
//       this.positionY = 0;
//       this.speedY = 0;
//     }
//     else
//     {
//       this.positionY += this.speedY;
//     }
//   }
// }

// //can go in scene
// function everyInterval ( n )
// {
//   if ( ( gameArea.frame / n ) % 1 == 0 )
//   {
//     return true;
//   }
//   return false;

// }

// //can go in gameObject
// function drawMultipleObjects ()
// {

//   gameArea.frame++;
//   if ( gameArea.frame == 1 || everyInterval( 200 ) )
//   {
//     console.log( `here` );
//     const random = ( min, max ) => { return Math.floor( ( Math.random() * ( max - min ) ) + min ) };
//     const randomObstacleHeight = random( 100, 425 );
//     const apposingHeight = ( ( randomObstacleHeight + 100 ) - gameArea.height ) * -1;
//     console.log( randomObstacleHeight, apposingHeight );
//     obstacleArr.push( new GameObject( gameArea.width, 0, `green`, 50, randomObstacleHeight ) );
//     obstacleArr.push( new GameObject( gameArea.width, gameArea.height - apposingHeight, `green`, 50, apposingHeight ) );
//   }
//   obstacleArr.forEach( ( obstacle ) =>
//   {
//     obstacle.positionX -= 1;
//     obstacle.drawObject();
//   } )

// }

// const gameArea = new Screen();
// const bird = new GameObject( 0, 0, `blue`, 50, 50 );
// const obstacleArr = [];

// let state = gameArea.state();

// function gameState ()
// {
//   gameArea.clearCanvas();
//   drawMultipleObjects();

//   obstacleArr.forEach( ( obstacle ) =>
//   {
//     if ( bird.collisionDetected( obstacle ) )
//     {
//       gameArea.stop( state );
//       return;
//     }
//     obstacle.stop();
//   } );
//   bird.stop();
//   gameControls( bird );
//   bird.updatePosition();
//   bird.drawObject();

// }


// function gameControls ( gameObject )
// {

//   window.addEventListener( `keydown`, ( e ) =>
//   {
//     speedChange( e, 2 );
//   } );

//   window.addEventListener( `keyup`, ( e ) =>
//   {
//     zeroSpeed();
//   } );

//   function zeroSpeed ()
//   {
//     gameObject.speedX = 0;
//     gameObject.speedY = 0;
//     window.removeEventListener( `keyup`, zeroSpeed );

//   }
//   function speedChange ( event, velocity )
//   {
//     if ( event.defaultPrevented )
//     {
//       return; // Do nothing if the event was already processed
//     }
//     if ( !event.repeat )
//     {
//       switch ( event.key )
//       {
//         case `ArrowUp`:
//           gameObject.speedY = -velocity;

//           break;
//         case `ArrowDown`:
//           gameObject.speedY = velocity;
//           break;
//         case `ArrowLeft`:
//           gameObject.speedX = -velocity;
//           break;
//         case `ArrowRight`:
//           gameObject.speedX = velocity;
//           break;
//       }

//       event.preventDefault();
//       return;
//     }

//     window.removeEventListener( `keydown`, speedChange );

//   }

// }
