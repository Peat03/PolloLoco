class Endboss extends MovableObject {


    height = 400;
    width = 300;
    y = 55;
    energy = 100;
    speedRight = 300;
    speed = 20;
    endBossRun = false;
    animation;
    pause = false;
    moveLeftInterval;
    moveRightInterval;
    move;  
    endgame;

    imagesWalking = [

        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'

    ];

    imagesAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    imagesHurt =

        ['img/4_enemie_boss_chicken/4_hurt/G21.png',
            'img/4_enemie_boss_chicken/4_hurt/G22.png',
            'img/4_enemie_boss_chicken/4_hurt/G23.png'

        ]


    imagesDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 3500;
        this.animate();

    }

    /**
    let the endboss walk to the right
     */
    moveRight() {
        this.x += this.speedRight;
        this.otherDirection = false;
    }

    /**
     * the endboss is killed and walks to hell
     */


    endbossToHell() {
        this.y += 20;
    }

    /**
     * paus interval when user clicks pause button
     */

    pauseEndboss() {
        this.pause = true;
        clearInterval(this.move)
        clearInterval(this.animation);
    }


    /**
     * restarts the game when user clicks play butten
     */
    restart() {
        this.pause = false;
        this.animate();
        this.walk();
    }

    /**
     * animates the endboss on different actions
     */
    animate() {
        this.animation = setInterval(() => {

            if (!this.endBossRun) {
                this.playAnimation(this.imagesAlert);
            }

            if (this.hurt()) {
                this.playAnimation(this.imagesHurt)
            }

            if (this.checkForDeath()) {
                this.playAnimation(this.imagesDead);
                this.endbossToHell();
            }

            if (this.endBossRun && !this.checkForDeath() && this.x >= 500 && !this.reachedStartPoint) {
                clearInterval(this.moveRightInterval)                
                this.x -= this.speed              
                this.otherDirection = false;
                this.playAnimation(this.imagesWalking);              
            }

            if (this.x <= 500) {
                this.reachedStartPoint = true;
            }

            if(this.x >= 2800) {
                this.reachedStartPoint = false;
            }

            if (this.endBossRun && !this.checkForDeath() && this.x <= 2800 && this.reachedStartPoint) {                
                clearInterval(this.move)
                this.otherDirection = true;
                this.x += this.speed
                this.playAnimation(this.imagesWalking);
            }
        }, 100);
    }

/**
 * the enboss walks back to the end of the map when reached the start point of the map
 */
    walkBack() {
        this.moveRight();
        this.playAnimation(this.imagesWalking);
        
    }

    /**
     * the endboss moves to the left
     */
    walk() {
        this.move = setInterval(() => {

            this.x -= this.speed     

        }, 1000);
    }
}
