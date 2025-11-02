import birdDude from "./assets/bird-dude.png";


export class ResourceLoader
{
  constructor ()
  {
    //WANT THIS CREATED AT MOMENT OF INITIALIZATION
    this.toLoad = {
      bird: birdDude,
    }

    this.loadedImages = {};

    Object.keys( this.toLoad ).forEach( ( key ) =>
    {
      const img = new Image();
      img.src = this.toLoad[ key ];

      this.loadedImages[ key ] = {
        image: img,
        hasLoaded: false,
      }

      img.onload = () =>
      {
        console.log(`please fucking load`)
        this.loadedImages[ key ].hasLoaded = true;
      }
    } );

  }


}