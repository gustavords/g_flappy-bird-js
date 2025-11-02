
export class Sprite
{
  constructor ( {
    context,
    image,
    src_x,
    src_y,
    src_w,
    src_h,
    x,
    y,
    w,
    h,
    dx,
    dy,
    scale

  } )
  {
    this.context = context;
    this.image = image;
    this.src_x = src_x;
    this.src_y = src_y;
    this.src_w = src_w;
    this.src_h = src_h;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.scale = scale;
  }

  draw ()
  {
    this.context.drawImage(
      this.image,
      this.src_x,
      this.src_y,
      this.src_w,
      this.src_h,
      this.x,
      this.y,
      this.w * this.scale,
      this.h * this.scale
    );
  }

  update ()
  {
    this.x = this.dx;
    this.y = this.dy;
  }
}