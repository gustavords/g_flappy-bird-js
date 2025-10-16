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
      const gapRange = { min: 150, max: 200 };
      const rdmGap = rdmNumInRange( gapRange.min, gapRange.max );
      const objRange = { min: 100, max: 400 };
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
function refreshPage ()
{
  window.location.reload();
}

function scoreBoard ( currFrame )
{
  theCanvas().ctx.font = "bold 25px serif";
  theCanvas().ctx.fillStyle = `red`;
  let text = `score: ` + currFrame;
  theCanvas().ctx.fillText( text, ( theCanvas().width - theCanvas().ctx.measureText( text ).width ) - 25, 25 )
  return currFrame;
}


const rec_1 = new GameObj( 10, 10, 50, 50, `black`, 0 );
const towers = [];
let currFrame = 0;
const circ_1 = circleObj( 200, 300, 22.5, 0, 2 * Math.PI, 0 );
const GRAVITY = .2;
const birdGRAVITY = 0.1;

function loadOnCanvas ()
{
  // document.addEventListener( `keydown`, keyHandlerDown );
  // document.addEventListener( `keyup`, keyHandlerUp );
  theCanvas().clear();

  currFrame++;

  towers.forEach( ( obstacle ) =>
  {
    if ( circ_1.objCollision( obstacle ) )
    {
      theCanvas().close( theInterval );
      if ( confirm( `Score : ${ scoreBoard( currFrame - 1 ) }\n Restart?` ) )
      {
        refreshPage();
      }
    };
  } );

  GameObj.createAtInterval( currFrame, theCanvas().atInterval( 275, currFrame ), towers );
  GameObj.drawMultipleMoving( theCanvas().ctx, towers );


  document.addEventListener( `keydown`, spaceBarKeyHandler );

  circ_1.wallCollision();
  circ_1.draw();

  // rec_1.draw( theCanvas().ctx );
  scoreBoard( currFrame );
  // rec_1.update()
}



function circleObj ( x, y, r, start, end, speed )
{
  const circle = {
    xpos: x,
    ypos: y,
    speed: speed,
    dx: speed * 1,
    dy: speed * 1,
    radius: r,
    diameter: Math.pow( r, 2 ),
    start: start,
    end: end
  }

  function draw ()
  {
    circle.xpos += circle.dx;
    circle.dy += GRAVITY;
    circle.ypos += circle.dy;

    theCanvas().ctx.beginPath();
    theCanvas().ctx.arc( circle.xpos, circle.ypos, circle.radius, circle.start, circle.end );
    theCanvas().ctx.stroke();
  }

  function wallCollision ( circleObj )
  {
    if ( circle.ypos + circle.radius > theCanvas().height )
    {
      console.log( `here` );
      console.log( circle.ypos + ` its the low` );
      circle.dy *= -1;
    }

    if ( circle.ypos - circle.radius < 0 )
    {
      console.log( `here` );
      console.log( circle.ypos );
      circle.dy *= -1;
    }
    if ( circle.xpos + circle.radius > theCanvas().width )
    {
      console.log( `here` );
      console.log( circle.xpos );
      circle.dx *= -1;
    }
    if ( circle.xpos - circle.radius < 0 )
    {
      console.log( `here` );
      console.log( circle.xpos );
      circle.dx *= -1;
    }
  }

  function objCollision (gameObj)
  {
    let obj_a_left = circle.xpos - circle.radius;
    let obj_a_right = circle.xpos + circle.radius;
    let obj_a_top = circle.ypos - circle.radius;
    let obj_a_bottom = circle.ypos + circle.radius;

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
  return { circle, draw, wallCollision, objCollision }
}

function spaceBarKeyHandler ( e )
{
  if ( e.key === ` ` )
  {
    if ( !e.repeat )
    {
      console.log( `space` );
      circ_1.circle.dy += birdGRAVITY;
      circ_1.circle.dy += -3;
      // circ_1.circle.dx += .2;
    }

  }
  document.removeEventListener( `keydown`, spaceBarKeyHandler );
}

function bounceObj ( gameObj )
{
  //  y= h + xtan(α) - gx²/2V₀²cos²(α)
  let y;
  const x = gameObj.xpos;
  const height = 200;
  const angle = 30;
  const velocity = 2;
  const gravity = .1;
  const tanAt = Math.tan( ( angle * Math.PI ) / 180 );
  // console.log( tanAt );
  const cosSquaredAt = Math.pow( ( Math.cos( ( angle * Math.PI ) / 180 ) ), 2 );
  // console.log( cosSquaredAt );
  y = height + ( x * tanAt ) - ( gravity * ( Math.pow( x, 2 ) ) ) / ( 2 * ( Math.pow( velocity, 2 ) ) * cosSquaredAt )
  y = Math.round( y ) * -1;
  console.log( y );

  gameObj.ypos = y;
  gameObj.xpos++;

}

const theInterval = setInterval( loadOnCanvas, 20 );
theInterval;
