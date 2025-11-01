export { Dialog };
import { game, startGame, stopGame } from "./main.js";

class Dialog
{
  constructor ()
  {

    this.dialog = document.querySelector( `#try-again-dialog` );
    this.button = document.querySelector( `#try-again-btn` );
    this.dialogOpen = false;

    this.button.addEventListener( `click`, () =>
    {
      this.dialog.close( );
      this.dialogOpen = false;
      // stopGame();
    } )
  }

  show ()
  {
    this.dialog.showModal();
    this.dialogOpen = true;
  }



}