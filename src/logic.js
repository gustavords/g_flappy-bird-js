/**
 * 
 * what gives and takes game points:
 * - like difficulty
 * - grabbing items
 * - collision stuff
*/
export { Boundary }

class Boundary
{
  constructor ( { ctx, canvas, obj } )
  {
    this.ctx = ctx;
    this.canvas = canvas;
    this.obj = obj;
    this.inBoundary = true;

    if ( obj.x + obj.width >= canvas.width || obj.x <= 0 )
    {
      obj.dx = 0;
      obj.dy = 0;
      this.inBoundary = false;
    }
    if ( obj.y + obj.height >= canvas.height || obj.y <= 0 )
    {
      obj.dx = 0;
      obj.dy = 0;
      this.inBoundary = false;
    }

  }

  get inBoundary ()
  {
    return this.inBoundary;
  }



}