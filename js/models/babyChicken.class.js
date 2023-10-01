class BabyChicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    height = 80;
    width = 60;
    x = 700 + Math.random() * 3000;
    y = 350;
    speedY = 0;
    speed = 0.5;
    babyJumpTime = 500 + Math.random() * 5000;
    move;
    animation;
    jumper;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/3_walk_new/yellow_1.png')
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.startGameLoop();
    }

    /**
     * stops all intervals when user clicks the pause button 
     */

    pause() {
        setTimeout(() => {
            this.stopGameLoop();
        }, 100);
    }

    /**
     * restarts all the intervals when user clicks the play button
     */

    startGameLoop() {
        this.walk();
        this.animate();
        this.babyJump();

    }

/**
 * proves condition for walk and lets the baby chicken move left
 */
    walk() {
        this.move = setInterval(() => {
            if (this.energy > 0) {
                this.enemyMoveLeft();
            }
        }, 1000 / 60);
    }


/**
 * provides the ability to jump
 */
    jump() {
        this.speedY = 20;
    }

    /**
     * 
     * proves if the babyCicken is on the ground
     */
    aboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return (this.y < 350)
        }
    }
/**
 * as long as the babyChicken is above the ground and it's energy isn't zero, the baby chicken can jump
 */
    babyJump() {
        this.jumper = setInterval(() => {
            if (!this.aboveGround() && this.energy != 0) {
                this.jump();
            }
        }, this.babyJumpTime);
    }

    /**
     * animates the babyChicken as long it is alive, otherwise it's going to hell
     */
    animate() {
        this.animation = setInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING)
            } else if (this.energy == 0) {
                this.toHell();
            }
        }, 100);
    }

    /**
     * restarts the babyChicken moves after pressing the play butten (after pause)
     */
    restart() {
        this.stopGameLoop();
        this.startGameLoop();
        this.applyGravity();
    }

    /**
     * clears all babyChicken Intervals to pause the game
     */
    stopGameLoop() {
        clearInterval(this.move)
        clearInterval(this.animation)
        clearInterval(this.jumper)
        clearInterval(this.gravity)
    }
}
