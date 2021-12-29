function Pipe() {
  this.imageUpper = new Image();
  this.imageUpper.src ='./images/pipe-upper.png';
  this.imageLower = new Image();
  this.imageLower.src ='./images/pipe-lower.png';
  this.passage=150;
  this.xVel = pipeSpeed;
  this.yVel = 0;
  this.margin=200;
  this.x = width+50;
  this.y = random(this.margin,height-deckHeight-this.margin);
  this.width = 50;
  this.height = 1000;
  this.crossed = false;
  this.show = function () {
    context.drawImage(
      this.imageUpper,
      this.x - this.width / 2,
      this.y - this.height-this.passage/2,
      this.width,
      this.height
    );
    context.drawImage(
      this.imageLower,
      this.x - this.width / 2,
      this.y + this.passage/2,
      this.width,
      this.height
    );
  };
  this.update = function () {
    this.x += this.xVel;
  };
  this.pointUp = function (player) {
    if (this.crossed === true) {
      return false;
    }
    if (this.x < player.x) {
      this.crossed = true;
      return true;
    }
    return false;
  };
  this.edge=function(){
    if(this.x<0){
      return true;
    }
    return false;
  }
}
