import "./styles.css";

console.log( `in here` );


let myGamePiece;
let myObstacle;
// let myObstacles=[];
let test;
// let key;
let keys;


function startGame ()
{

  window.addEventListener( 'keydown', function ( e )
  {
    keys = ( keys || [] );
    keys[ e.key ] = ( e.type == "keydown" );
  } )
  window.addEventListener( 'keyup', function ( e )
  {
    // key = false;
    keys[ e.key ] = ( e.type == "keydown" );
  } )

  myGamePiece = new component( 30, 30, `red`, 10, 120 );
  myObstacle = new component( 40, 200, `green`, 300, 120 );
  myGameArea().setInterval;

  myGameArea().context;

}

function component ( width, height, color, x, y )
{
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;

  this.update = () =>
  {
    const ctx = myGameArea().context;
    ctx.fillStyle = color;
    ctx.fillRect( this.x, this.y, this.width, this.height );

  }
  this.newPos = () =>
  {
    this.x += this.speedX;
    if ( this.x >= ( myGameArea().width - 30 ) )
    {
      this.x = ( myGameArea().width - 30 );
    }
    else if ( this.x <= 0 )
    {
      this.x = 0;
    }
    else
    {
      this.x += this.speedX;
    }

    this.y += this.speedY;
    if ( this.y >= ( myGameArea().height - 30 ) )
    {
      this.y = ( myGameArea().height - 30 );
    }
    else if ( this.y <= 0 )
    {
      this.y = 0;
    }
    else
    {
      this.y += this.speedY;
    }
  }

  this.crashWith = function ( otherobj )
  {
    var myleft = this.x;
    var myright = this.x + ( this.width );
    var mytop = this.y;
    var mybottom = this.y + ( this.height );
    var otherleft = otherobj.x;
    var otherright = otherobj.x + ( otherobj.width );
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + ( otherobj.height );
    var crash = true;
    if ( ( mybottom < othertop ) ||
      ( mytop > otherbottom ) ||
      ( myright < otherleft ) ||
      ( myleft > otherright ) )
    {
      crash = false;
    }
    return crash;
  }
}


function myGameArea ()
{
  const canvas_el = document.getElementById( `canvas` );
  const context = canvas_el.getContext( `2d` );
  const interval = setInterval( updateGameArea, 20 );
  const frameNo = 0;

  return {
    context,
    width: canvas_el.width,
    height: canvas_el.height,
    interval,
    frameNo,
    clear: () => { context.clearRect( 0, 0, canvas_el.width, canvas_el.height ) },
    stop: () => { clearInterval( interval ) },
  }
}

function updateGameArea ()
{
  if ( myGamePiece.crashWith( myObstacle ) )
  {
    myGameArea().stop();
  }
  else
  {
    myGameArea().clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if ( keys && keys[ `ArrowLeft` ] ) { myGamePiece.speedX = -.1; }
    if ( keys && keys[ `ArrowRight` ] ) { myGamePiece.speedX = .1; }
    if ( keys && keys[ `ArrowUp` ] ) { myGamePiece.speedY = -.2; }
    if ( keys && keys[ `ArrowDown` ] ) { myGamePiece.speedY = .2; }
    myGamePiece.newPos();
    myObstacle.x += -.2;
    myObstacle.update();
    myGamePiece.update();
  }

}

function everyinterval ( n )
{
  if ( ( myGameArea().frameNo / n ) % 1 == 0 ) { return true; }
  return false;
}



startGame();