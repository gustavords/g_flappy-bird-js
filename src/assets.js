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
    this.dx = dx ?? 1;
    this.dy = dy ?? -1;
  }

  move = () =>
  {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw ()
  {
    this.ctx.fillRect( this.x, this.y, this.width, this.height );
  }


}