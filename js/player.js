//player class
function Player() {
    this.yVel = 0;
    this.x = width / 5;
    this.y = height / 2;
    this.gravity = 0.5;
    this.radius = 25;
    this.state = 0;
    this.jumpHeight = -10;
    this.frameBuffer = 0;
    this.imageUpArray = [];
    this.imageDownArray = [];
    //setting images for wing animation
    for (let i = 0; i < 3; i++) {
        this.imageUpArray.push(new Image());
        this.imageDownArray.push(new Image());
        this.imageUpArray[i].src = `./assets/images/birds/bu${i+1}.png`;
        this.imageDownArray[i].src = `./assets/images/birds/bd${i+1}.png`;
    }
    //display the player on the screen
    this.show = function() {

        if (this.state === 0) {
            context.drawImage(
                this.imageDownArray[this.frameBuffer % 3],
                this.x - this.radius,
                this.y - this.radius,
                this.radius * 2,
                this.radius * 2
            );
        } else {
            context.drawImage(
                this.imageUpArray[this.frameBuffer % 3],
                this.x - this.radius,
                this.y - this.radius,
                this.radius * 2,
                this.radius * 2
            );
        }
    };
    //updating position of the bird and the state
    this.update = function() {
        this.y += this.yVel;
        this.yVel += this.gravity;

        if (frameCount % 10 === 0) {
            this.frameBuffer++;
        }

        if (this.yVel > 0) {
            this.state = 0;
        } else {
            this.state = 1;
        }
    };
    //adds upward velocity to the player
    this.jump = function() {
            this.yVel = this.jumpHeight;
            sound = new Audio('./assets/sounds/sfx_flap.wav');
            sound.play();
        }
        /**
         * checks for collision with pipes
         * @param {Pipe} pipe
         * @returns {boolean} 
         */
    this.collides = function(pipe) {

        if ((this.x + this.radius) >= (pipe.x - pipe.width / 2) && (this.x - this.radius) <= (pipe.x + pipe.width / 2)) {

            if ((this.y + this.radius) >= (pipe.y + pipe.passage / 2) || (this.y - this.radius) <= (pipe.y - pipe.passage / 2)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns boolean after checking for edge
     * @returns {boolean} 
     */
    this.edge = function() {

        if (this.y > height - deckHeight || this.y < 0) {
            return true;
        }
        return false;
    };
}