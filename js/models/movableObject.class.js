class MovableObject extends drawableObject {

    speed = 0.1;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    statusBarEnergy = new StatusBarEnergy();
    move;
    gravity;

    toHell() {
        setInterval(() => {
            this.y += 2;

        }, 100);
    }

    /**
     * this functions sets the y axis of the character to its fix value 140
     */
    checkForBottomReached() {
        this.bottomReached = setInterval(() => {
            if (this.y > 140) {
                this.y = 140
            }

        }, 1);

    }

    /**
     * if an objects is above ground or the speedY variable, which is the hight/speed, an object can jump, is bigger than zero, the objects jumps and next an accelaration is applied for gravity
     */
    applyGravity() {
        this.gravity = setInterval(() => {

            if (this.aboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 60);

    }

    /**
     * 
     * to prove if an object is in the air
     */
    aboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        }
        else {
            return (this.y < 140)
        }
    }

    /**
     * 
     * @param {object} obj 
     * proves if an object is colliding with another
     */
    isColliding(obj) {

        return (this.x + this.width - 60) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.height) >= obj.y &&
            (this.y + 50) <= (obj.y + obj.height)
    }

    /**
     * 
     * @param {object} obj
     * proves if an object is colliding in the air 
     */
    isCollidingJump(obj) {
        this.y < obj.y + obj.height &&
            this.height + this.y > obj.y
    }


    /**
     * 
     * proves if the last hit accured less the 0.2
     */
    hurt() {
        let passedTime = new Date().getTime() - this.lastHit
        passedTime = passedTime / 1000;
        return passedTime < 0.2;
    }

    /**
     * subtract 0.1 energy points 
     */
    hit() {
        this.energy -= 0.1
        if (this.checkForDeath()) {
            this.energy = 0;
        }

        else
            this.lastHit = new Date().getTime();
    }

/**
 * 
 * proves if any energy left
 */    checkForDeath() {
        return this.energy <= 0;
    }

    /**
     * 
     * @param {array} images 
     * an array with paths to images is loaded with help of the modulus operator an infitie loop corrispondint to the lenght of the array animates the object for example the character or the chicken 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * enables the enemy to move left
     */
    enemyMoveLeft() {
        this.x -= this.speed;
    }

    /**
     * stops the move for pausing the game
     */
    stopMove() {
        setTimeout(() => {
            clearInterval(this.move)
        }, 1000);
    }

    /**
     * interval for moving to the left
     */
    moveLeft() {
        this.move = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}