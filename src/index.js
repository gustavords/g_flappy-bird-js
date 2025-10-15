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
  const atInterval = ( time, frame ) => { return ( frame / time ) % 1 === 0 ? true : false; }
  const close = ( interval ) => { clearInterval( interval ) };
  return { canvas_el, ctx, height, width, clear, atInterval, close }
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

  collisionDetected ( gameObj )
  {
    let obj_a_left = this.xpos;
    let obj_a_right = this.xpos + this.width;
    let obj_a_top = this.ypos;
    let obj_a_bottom = this.ypos + this.height;

    let obj_b_left = gameObj.xpos;
    let obj_b_right = gameObj.xpos + gameObj.width;
    let obj_b_top = gameObj.ypos;
    let obj_b_bottom = gameObj.ypos + gameObj.height;

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
      const rdmNumInRange = ( min, max ) => { return Math.floor( Math.random() * ( max - min ) + min ); }
      const gapRange = { min: 75, max: 150 };
      const rdmGap = rdmNumInRange( gapRange.min, gapRange.max );
      const objRange = { min: 100, max: 500 };
      const rdmObjHeight = rdmNumInRange( objRange.min, objRange.max );
      const secondObjHeight = ( ( rdmObjHeight + rdmGap ) - theCanvas().height ) * -1;
      arr.push( new GameObj( theCanvas().width, 0, 75, rdmObjHeight, `green`, 0 ) )
      arr.push( new GameObj( theCanvas().width, theCanvas().height - secondObjHeight, 75, secondObjHeight, `green`, 0 ) );
    }
  }
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


const rec_1 = new GameObj( 10, 10, 50, 50, `black`, 0 );
const towers = [];
let currFrame = 0;

function loadOnCanvas ()
{
  document.addEventListener( `keydown`, keyHandlerDown );
  document.addEventListener( `keyup`, keyHandlerUp );
  theCanvas().clear();

  currFrame++;

  towers.forEach( ( obstacle ) =>
  {
    if ( rec_1.collisionDetected( obstacle ) )
    {
      theCanvas().close( theInterval );
    };
  } );

  GameObj.createAtInterval( currFrame, theCanvas().atInterval( 275, currFrame ), towers );
  GameObj.drawMultipleMoving( theCanvas().ctx, towers );

  rec_1.draw( theCanvas().ctx );
  rec_1.update()
}


const theInterval = setInterval( loadOnCanvas, 20 );
theInterval;

