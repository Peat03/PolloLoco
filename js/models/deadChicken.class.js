class DeadChicken extends MovableObject {

    imagesDead = [

        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    height = 110;
    width = 70;
    y = 335;


    constructor(x, y) {

        super().loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.x = x;
        this.y = y;
        this.speed = 0
        this.animate();
        this.loadImages(this.imagesDead);
    }

    /**
     * changes the position when the chicken is dead
     */
    chickenToHell() {
        this.y += 10;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesDead)
            this.chickenToHell();
        }, 100);
    }

}