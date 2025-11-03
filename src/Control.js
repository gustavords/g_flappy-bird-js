const UP = `UP`;
const DOWN = `DOWN`;
const LEFT = `LEFT`;
const RIGHT = `RIGHT`;
const JUMP = `JUMP`;

export class Control
{
  constructor ()
  {
    this.heldDirection = [];
    this.sprite;
    this.code;
    this.repeat;
    document.addEventListener( `keydown`, ( e ) =>
    {
      this.code = e.code;
      this.repeat = e.repeat;
      // console.log( this.repeat )

      if ( !e.repeat )
      {
        if ( this.code === `KeyW` || this.code === `ArrowUp` )
        {
          this.onButtonPress( UP );
        }
        if ( this.code === `KeyA` || this.code === `ArrowLeft` )
        {
          this.onButtonPress( LEFT );
        }
        if ( this.code === `KeyS` || this.code === `ArrowDown` )
        {
          this.onButtonPress( DOWN );
        }
        if ( this.code === `KeyD` || this.code === `ArrowRight` )
        {
          this.onButtonPress( RIGHT );
        }
        if ( this.code === `Space` )
        {
          this.onButtonPress( JUMP );
        }
      }
      else
      {
        // console.log( this.repeat )
      }


    } )

    document.addEventListener( `keyup`, ( e ) =>
    {
      this.code = e.code;
      this.repeat = e.repeat;

      if ( !e.repeat )
      {
        if ( this.code === `KeyW` || this.code === `ArrowUp` )
        {
          this.onButtonRelease( UP );
        }
        if ( this.code === `KeyA` || this.code === `ArrowLeft` )
        {
          this.onButtonRelease( LEFT );
        }
        if ( this.code === `KeyS` || this.code === `ArrowDown` )
        {
          this.onButtonRelease( DOWN );
        }
        if ( this.code === `KeyD` || this.code === `ArrowRight` )
        {
          this.onButtonRelease( RIGHT );
        }
        if ( this.code === `Space` )
        {
          this.onButtonRelease( JUMP );
        }
      }

    } )
  }

  get direction ()
  {
    return this.heldDirection[ 0 ];
  }

  onButtonPress ( value )
  {
    //means if it doesn't exist in array
    if ( this.heldDirection.indexOf( value ) === -1 )
    {
      this.heldDirection.unshift( value );
    }
  }

  onButtonRelease ( value )
  {
    if ( this.heldDirection.indexOf( value ) === -1 ) { return; }
    this.heldDirection.splice( this.heldDirection.indexOf( value ), 1 );
  }

  move ( sprite )
  {
    if ( this.direction === UP )
    {
      sprite.dy -= 1;
    }
    if ( this.direction === LEFT )
    {
      sprite.dx -= 1;
    }
    if ( this.direction === DOWN )
    {
      sprite.dy += 1;
    }
    if ( this.direction === RIGHT )
    {
      sprite.dx += 1;
    }
    if ( this.direction === JUMP )
    {
      this.jump( sprite );
    }
  }

  jump ( sprite )
  {
    if ( this.repeat )
    {
      return;
    }
    else
    {
      sprite.dy = -.3;
      sprite.dy -= 3;
    }

  }
}