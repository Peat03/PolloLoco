class Chicken extends MovableObject {

    move;
    animation;



    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    imagesDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    height = 110;
    width = 70;
    y = 335;


    constructor() {

        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 500 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.walk()
        this.loadImages(this.imagesWalking);

    }

    /**
     * to restart the game by pressing the "play button" after pause
     */
    restart() {
        this.animation = setInterval(() => {

            if (this.energy > 0) {
                this.playAnimation(this.imagesWalking)
            }
        }, 100);

        this.move = setInterval(() => {

            if (this.energy > 0) {
                this.enemyMoveLeft();
            }

        }, 1000 / 60);

    }

    /**
     *to pause the game - clears the intervals of the chicken
     */
    pause() {
        setTimeout(() => {

            clearInterval(this.move)
            clearInterval(this.animation)

        }, 100);
    }

    /**
     * interval for chicken walk
     */
    walk() {
        this.move = setInterval(() => {

            if (this.energy > 0) {
                this.enemyMoveLeft();
            }

        }, 1000 / 60);
    }

    /**
     * animates the chicken by calling the playAnimation function
     */
    animate() {
        this.animation = setInterval(() => {

            if (this.energy > 0) {
                this.playAnimation(this.imagesWalking)
            }

        }, 100);

    }

}