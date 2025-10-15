import "./styles.css";

class Screen
{
  canvas_el = document.getElementById( `canvas` );
  canvas_ctx = this.canvas_el.getContext( `2d` );
  width = this.canvas_el.width;
  height = this.canvas_el.height;
  state = () => { return setInterval( gameState, 50 ) };
  frame = 0;

  clearCanvas ()
  {
    this.canvas_ctx.clearRect( 0, 0, this.width, this.height );
  }

  stop ( state )
  {
    clearInterval( state );
  }
}

//should be other name since its all rectangles
class GameObject extends Screen
{
  constructor ( positionX, positionY, colour, width, height )
  {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.speedX = 0;
    this.speedY = 0;
    this.colour = colour;
    this.width = width;
    this.height = height;
  }
  drawObject ()
  {
    this.canvas_ctx.fillStyle = this.colour;
    this.canvas_ctx.fillRect( this.positionX, this.positionY, this.width, this.height )
  }

  collisionDetected ( gameObject )
  {
    let obj_a_left = this.positionX;
    let obj_a_right = this.positionX + this.width;
    let obj_a_top = this.positionY;
    let obj_a_bottom = this.positionY + this.height;

    let obj_b_left = gameObject.positionX;
    let obj_b_right = gameObject.positionX + gameObject.width;
    let obj_b_top = gameObject.positionY;
    let obj_b_bottom = gameObject.positionY + gameObject.height;

    let crash = true;

    if ( ( obj_a_bottom < obj_b_top ) ||
      ( obj_a_top > obj_b_bottom ) ||
      ( obj_a_right < obj_b_left ) ||
      ( obj_a_left > obj_b_right ) )
    {
      crash = false;
    }

    return crash;
  }

  updatePosition = () =>
  {
    this.positionX += this.speedX;
    if ( this.positionX >= ( gameArea.width - this.width ) )
    {
      this.positionX = ( gameArea.width - this.width );
      this.speedX = 0;
    }
    else if ( this.positionX <= 0 )
    {
      this.positionX = 0;
      this.speedX = 0;
    }
    else
    {
      this.positionX += this.speedX;
    }

    this.positionY += this.speedY;
    if ( this.positionY >= ( gameArea.height - this.height ) )
    {
      this.positionY = ( gameArea.height - this.height );
      this.speedY = 0;
    }
    else if ( this.positionY <= 0 )
    {
      this.positionY = 0;
      this.speedY = 0;
    }
    else
    {
      this.positionY += this.speedY;
    }
  }
}

//can go in scene
function everyInterval ( n )
{
  if ( ( gameArea.frame / n ) % 1 == 0 )
  {
    return true;
  }
  return false;

}

//can go in gameObject
function drawMultipleObjects ()
{

  gameArea.frame++;
  if ( gameArea.frame == 1 || everyInterval( 200 ) )
  {
    console.log( `here` );
    const random = ( min, max ) => { return Math.floor( ( Math.random() * ( max - min ) ) + min ) };
    const randomObstacleHeight = random( 100, 425 );
    const apposingHeight = ( ( randomObstacleHeight + 100 ) - gameArea.height ) * -1;
    console.log( randomObstacleHeight, apposingHeight );
    obstacleArr.push( new GameObject( gameArea.width, 0, `green`, 50, randomObstacleHeight ) );
    obstacleArr.push( new GameObject( gameArea.width, gameArea.height - apposingHeight, `green`, 50, apposingHeight ) );
  }
  obstacleArr.forEach( ( obstacle ) =>
  {
    obstacle.positionX -= 1;
    obstacle.drawObject();
  } )

}

const gameArea = new Screen();
const bird = new GameObject( 0, 0, `blue`, 50, 50 );
const obstacleArr = [];

let state = gameArea.state();

function gameState ()
{
  gameArea.clearCanvas();
  drawMultipleObjects();

  obstacleArr.forEach( ( obstacle ) =>
  {
    if ( bird.collisionDetected( obstacle ) )
    {
      gameArea.stop( state );
      return;
    }
    obstacle.stop();
  } );
  bird.stop();
  gameControls( bird );
  bird.updatePosition();
  bird.drawObject();

}


function gameControls ( gameObject )
{

  window.addEventListener( `keydown`, ( e ) =>
  {
    speedChange( e, 2 );
  } );

  window.addEventListener( `keyup`, ( e ) =>
  {
    zeroSpeed();
  } );

  function zeroSpeed ()
  {
    gameObject.speedX = 0;
    gameObject.speedY = 0;
    window.removeEventListener( `keyup`, zeroSpeed );

  }
  function speedChange ( event, velocity )
  {
    if ( event.defaultPrevented )
    {
      return; // Do nothing if the event was already processed
    }
    if ( !event.repeat )
    {
      switch ( event.key )
      {
        case `ArrowUp`:
          gameObject.speedY = -velocity;

          break;
        case `ArrowDown`:
          gameObject.speedY = velocity;
          break;
        case `ArrowLeft`:
          gameObject.speedX = -velocity;
          break;
        case `ArrowRight`:
          gameObject.speedX = velocity;
          break;
      }

      event.preventDefault();
      return;
    }

    window.removeEventListener( `keydown`, speedChange );

  }

}
