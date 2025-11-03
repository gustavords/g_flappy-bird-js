import birdDude from "./assets/bird-dude.png";
import towerDown from "./assets/tower.png"
import towerUp from "./assets/tower-flip.png"

class ResourceLoader
{
  constructor ()
  {
    //WANT THIS CREATED AT MOMENT OF INITIALIZATION
    this.toLoad = {
      bird: birdDude,
      towerD: towerDown,
      towerU: towerUp,
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
        this.loadedImages[ key ].hasLoaded = true;
      }
    } );

  }


}

export const resources = new ResourceLoader();
