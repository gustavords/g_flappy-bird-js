///takes user input to move/ interact with game
export { UP, DOWN, LEFT, RIGHT, Controller }

const UP = `UP`;
const DOWN = `DOWN`;
const LEFT = `LEFT`;
const RIGHT = `RIGHT`;
const JUMP = `JUMP`;

class Controller
{
  constructor ()
  {
    this.heldDirection = [];

    document.addEventListener( `keydown`, ( e ) =>
    {
      // console.log( e.code );
      if ( e.code === `ArrowUp` || e.code === `KeyW` )
      {
        this.onArrowPressed( UP );
      }
      if ( e.code === `ArrowDown` || e.code === `KeyS` )
      {
        this.onArrowPressed( DOWN );
      }
      if ( e.code === `ArrowLeft` || e.code === `KeyA` )
      {
        this.onArrowPressed( LEFT );
      }
      if ( e.code === `ArrowRight` || e.code === `KeyD` )
      {
        this.onArrowPressed( RIGHT );
      }
      if ( e.code === `Space` )
      {
        this.onArrowPressed( JUMP );
      }

    } );

    document.addEventListener( `keyup`, ( e ) =>
    {
      // console.log( e.code );
      if ( e.code === `ArrowUp` || e.code === `KeyW` )
      {
        this.onArrowReleased( UP );
      }
      if ( e.code === `ArrowDown` || e.code === `KeyS` )
      {
        this.onArrowReleased( DOWN );
      }
      if ( e.code === `ArrowLeft` || e.code === `KeyA` )
      {
        this.onArrowReleased( LEFT );
      }
      if ( e.code === `ArrowRight` || e.code === `KeyD` )
      {
        this.onArrowReleased( RIGHT );
      }
      if ( e.code === `Space` )
      {
        this.onArrowReleased( JUMP );
      }

    } );
  }

  get direction ()
  {
    return this.heldDirection[ 0 ];
  }

  onArrowPressed ( direction )
  {
    if ( this.heldDirection.indexOf( direction ) === -1 )
    {
      this.heldDirection.unshift( direction );
    }
  }

  onArrowReleased ( direction )
  {
    const index = this.heldDirection.indexOf( direction );
    if ( index === -1 )
    {
      return;
    }
    this.heldDirection.splice( index, 1 );
  }



  movement ( obj )
  {
    if ( this.direction === UP )
    {
      obj.y--;
    }
    if ( this.direction === DOWN )
    {
      obj.y++;
    }
    if ( this.direction === LEFT )
    {
      obj.x--;
    }
    if ( this.direction === RIGHT )
    {
      obj.x++;
    }
  }

  jump ( obj, gravity )
  {
    if ( this.direction === JUMP )
    {
      // obj.x += obj.dx;
      obj.y += -5;
      // obj.y += gravity;
    }
  }
}