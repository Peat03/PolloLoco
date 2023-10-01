class Cloud extends MovableObject {

    y = 40;
    width = 350;
    height = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500;
        this.animate();
        this.moveLeft();
        this.speed = 0.008 + Math.random() * 0.1;

    }

    animate() {
        this.moveLeft();
    }
}
