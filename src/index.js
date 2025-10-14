import "./styles.css";

console.log( `in here` );


let myGamePiece;
// let key;
let keys;
function startGame ()
{
  myGamePiece = new component( 30, 30, `red`, 10, 120 );

  window.addEventListener( 'keydown', function ( e )
  {
    // key = e.key;
    keys = ( keys || [] );
    keys[ e.key ] = ( e.type == "keydown" );

    console.log( keys );
    console.log( e.key );
  } )
  window.addEventListener( 'keyup', function ( e )
  {
    // key = false;
    keys[ e.key ] = ( e.type == "keydown" );
  } )

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
    ctx.fillColor = color;
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
}


function myGameArea ()
{
  const canvas_el = document.getElementById( `canvas` );
  const context = canvas_el.getContext( `2d` );



  return {
    context,
    width: canvas_el.width,
    height: canvas_el.height,
    interval: setInterval( updateGameArea, 20 ),
    clear: () => { context.clearRect( 0, 0, canvas_el.width, canvas_el.height ) },
  }
}

function updateGameArea ()
{
  myGameArea().clear();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if ( keys && keys[ `ArrowLeft` ] ) { myGamePiece.speedX = -1; }
  if ( keys && keys[ `ArrowRight` ] ) { myGamePiece.speedX = 1; }
  if ( keys && keys[ `ArrowUp` ] ) { myGamePiece.speedY = -1; }
  if ( keys && keys[ `ArrowDown` ] ) { myGamePiece.speedY = 1; }
  myGamePiece.newPos();
  myGamePiece.update();

}


startGame();