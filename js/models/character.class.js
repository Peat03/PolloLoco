class Character extends MovableObject {
    width = 150;
    height = 300;
    y = 0;
    speed = 10;
    idleCounter = 0;
    charMove;
    deathInt;
    charJump;
    charWalk;
    won;
    enemy;

    imagesDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    imagesWalking = [
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    imagesIdleLong = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    imagesHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    imagesJumping = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png'
    ];

    world;
    walking_sound = new Audio('audio/walking.mp3');

    constructor(y) {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.y = y;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesIdleLong);
        this.applyGravity();
        this.animate();
        this.checkForBottomReached();
    }

    /**
     * clears all character intervals - for pause
     */
    pauseCharacter() {
        clearInterval(this.charMove);
        clearInterval(this.charWalk);
        clearInterval(this.charIdle);
    }
/**
 * restarts the game after the play button is pressed - after pause
 */
    restart() {
        this.animate();
    }
/**
 * animates the character
 */
    animate() {
        this.characterMovements();
        this.characterDeathAni();
        this.characterJumpAni();
        this.characterMoveAni();
        this.charIdelAni();
    }

   /**
    * character move to the left 
    * the otherDirection variable is set to true, so the flipImage function is executed and the character is drawn watching to the left
    */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
    }

     /**
    * character move to the left 
    * the otherDirection variable is set to false, so the flipIBack function is executed and the character is drawn watching to the right
    */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }

     /**
     * 
     * proves if the character should move
     */
     conditionForWalking() {
        return (
            (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
            !this.aboveGround() &&
            !this.checkForDeath()
        );
    }

    /**
     * 
     * enables the moveLeft function
     */
    conditionForMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.endgame_x && !this.checkForDeath();
    }

 /**
     * 
     * enables the moveRight function
     */
    conditionForMoveRight() {
        return (
            this.world.keyboard.RIGHT &&
            this.x < this.world.level.level_end_x &&
            !this.checkForDeath()
        );
    }
    /**
     * 
     * enables the jump function
     */
    conditionForJump() {
        return this.world.keyboard.UP && !this.aboveGround() && !this.checkForDeath();
    }
/**
 * defines how hight the character is able to jump
 */
    jump() {
        this.speedY = 20;
    }

    /**
     * 
     * @param {object} enemy 
     * proves if the character is above enemy
     */
    charAboveEnemy(enemy) {
        this.enemy = enemy;
        return this.y + this.height < enemy.y;
    }

    
    // generic functions for character animate start

    characterMovements() {
        this.charMove = setInterval(() => {
            this.walking_sound.pause();
            if (this.conditionForMoveLeft()) {
                this.moveLeft();
                this.idleCounter = 0;
            } else if (this.hurt() && this.conditionForMoveRight()) {
                this.moveRight();
                this.playAnimation(this.imagesHurt);
                this.idleCounter = 0;
            } 
            else if (this.hurt()) {
                this.playAnimation(this.imagesHurt);
                this.idleCounter = 0;
            } else if (this.conditionForJump()) {
                this.jump();
                this.idleCounter = 0;
            } else if (this.conditionForMoveRight()) {
                this.moveRight();
                this.idleCounter = 0;
            } else {
                this.idleCounter++;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * sets the character on IDLE
     */
    charIdelAni() {

        this.charIdle = setInterval(() => {
            if (this.idleCounter > 10 && this.idleCounter < 700 && !this.conditionForWalking() && !this.aboveGround()) {
                this.playAnimation(this.imagesIdle);
            } else if (this.idleCounter > 700) {
                this.playAnimation(this.imagesIdleLong);
            }
        }, 100);

    }

    /**
     * function to animate the character walking
     */

    characterMoveAni() {
        this.charWalk = setInterval(() => {
            if (this.conditionForWalking()) {
                this.playAnimation(this.imagesWalking);
            }
        }, 50);
    }
 /**
  * functin to animate the charaters DEATH
  */

    characterDeathAni() {
        this.deathInt = setInterval(() => {
            if (this.checkForDeath() && !this.won) {
                this.toHell();
                this.playAnimation(this.imagesDead);
            }
        }, 400);
    }

    /**
     * function to animate the characters JUMP
     */

    characterJumpAni() {
        this.charJump = setInterval(() => {
            if (this.aboveGround()) {
                this.playAnimation(this.imagesJumping);
            }
        }, 200);
    }
 // generic functions for character animate END
}
