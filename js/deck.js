//set an infinite loop of the deck image
function Deck() {
    this.width = width * 2;
    this.height = 300;
    this.x = 0;
    this.y = deckHeight;
    this.image = new Image();
    this.image.src = './assets/images/deck.png';

    //draws infinite loop of the deck image
    this.moveDeck = function() {
        this.x = (this.x + pipeSpeed) % (this.width / 2);
        context.drawImage(this.image, this.x, height - this.y, this.width, this.height);
    }
}