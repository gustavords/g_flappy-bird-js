export { Rectangle }


class Rectangle
{
  constructor (
    {
      x,
      y,
      width,
      height,
      ctx,
      dx,
      dy,
    }
  )
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.dx = undefined ?? 1;
    this.dy = undefined  ?? -1;
  }

  draw ()
  {
    this.ctx.fillRect( this.x, this.y, this.width, this.height );
  }


}