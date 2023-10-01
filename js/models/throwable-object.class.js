class ThrowableObject extends MovableObject {

    hit = false;
    y = 350;

    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, otherDirection) {

        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png')
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 80;
        this.width = 80;
        this.throw(x, y);
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.setBottlePosition();

    }

    /**
     * play the animation when the bottle hits the ground or an enemy
     */
    splash() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }
    /**
     * defines the position of the bottles 
     */
    setBottlePosition() {
        if (this.otherDirection) {
            this.x -= 125;
        }
    }
    /**
     * 
     * @param {variable} x 
     * @param {variable} y 
     * defines parameters location and flight altitude of the bottle 
     */
    throw(x, y) {

        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();

        /**
         * change the position according to the direction of the character
         * the bottle rotates if the bottle did not hit anything
         * the bottle splashes if it hit anything
         */
        setInterval(() => {

            if (this.otherDirection) {
                this.x -= 10;

            } else if (!this.otherDirection) {
                this.x += 10;
            }

            if (!this.hit) {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATE);

            } else if (this.hit) {

                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);

            }

        }, 25);
    }

}