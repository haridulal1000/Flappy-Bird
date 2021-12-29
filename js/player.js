function Player() {
  this.yVel = 0;
  this.x = width/5;
  this.y = height/2;
  this.gravity=0.5;
  this.radius=25;
  this.state = 0;
  this.jumpHeight=-10;
  this.frameBuffer=0;
  this.imageUpArray=[];
  this.imageDownArray=[];
  for(let i=0;i<3;i++){
    this.imageUpArray.push(new Image());
    this.imageDownArray.push(new Image());
    this.imageUpArray[i].src=`./images/birds/bu${i+1}.png`;
    this.imageDownArray[i].src=`./images/birds/bd${i+1}.png`;
  }
  this.show = function () {
    // context.save();
    // context.translate(this.x,this.y);
    if(this.state===0){
    //  context.rotate(-Math.PI/6);
    context.drawImage(
      this.imageDownArray[this.frameBuffer%3],
      this.x - this.radius,
      this.y - this.radius,
      this.radius*2,
      this.radius*2
    );
    }
    else{
     //   context.rotate(Math.PI/6);
      context.drawImage(
        this.imageUpArray[this.frameBuffer%3],
        this.x - this.radius,
        this.y - this.radius,
        this.radius*2,
        this.radius*2
      );
      }
     // context.restore();


      
  };
  this.update = function () {
    this.y += this.yVel;
    this.yVel+=this.gravity;
    if(frameCount%10===0){
      this.frameBuffer++;
    }
    if(this.yVel>0){
      this.state=0;
    }
    else{
      this.state=1;
    }
  };
  this.jump=function(){
    this.yVel=this.jumpHeight;
  }
  this.collides = function (pipe) {
    if((this.x+this.radius)>=(pipe.x-pipe.width/2) && (this.x-this.radius)<=(pipe.x+pipe.width/2)){
      if((this.y+this.radius)>=(pipe.y+pipe.passage/2) || (this.y-this.radius)<=(pipe.y-pipe.passage/2)){
        return true;
      }
    }
    return false;
  };
  this.edge = function () {
    if (this.y > height-deckHeight || this.y<0) {
      return true;
    }
    return false;
  };
}