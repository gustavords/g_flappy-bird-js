export { Dialog };

class Dialog
{
  constructor ()
  {

    this.dialog = document.querySelector( `#try-again-dialog` );
    this.button = document.querySelector( `#try-again-btn` );

    this.button.addEventListener( `click`, () =>
    {
      this.dialog.close();
    } )
  }

  show ()
  {
    this.dialog.showModal();
  }

}