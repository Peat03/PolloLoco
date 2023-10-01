class collectableObject extends MovableObject {


    width = 120;
    height = 120;
    y = 50;
    randomNumber = Math.floor(Math.random() * 2) + 1;



    IMAGE_BOTTLE = [

        'img/7_statusbars/3_icons/icon_salsa_bottle.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor(x) {
        super();
        this.loadImages(this.IMAGE_BOTTLE);
        this.x = x;
        this.y = 350 - Math.random() * 200;
        this.x = 300 + Math.random() * 2000;
        this.bottlePosition();
    }

    /**
     * to set the bottle at least 300 from the start point of the world and added a random number
     */
    bottlePosition() {
        if (this.y <= 300) {
            this.loadImage(this.IMAGE_BOTTLE[0]);
        } else {
            this.loadImage(this.IMAGE_BOTTLE[this.randomNumber])            
        }
    }
}



