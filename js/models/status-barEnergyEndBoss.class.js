class StatusBarEnergyEndBoss extends drawableObject {


    IMAGES = [

        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 100;
    energyLoss;

    constructor() {
        super();
        this.loadImage(this.IMAGES[5])
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = -50;
        this.width = 200;
        this.height = 50;

    }

    /**
     * 
    * @param {variable} percentage 
    * sets the endBoss statusBar
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * 
     * proves how many energy in percentage and return a number that indicates the position of the arrayes where "percentage images" are located 
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 80) {
            return 4;
        }
        else if (this.percentage > 60) {
            return 3;
        }
        else if (this.percentage > 40) {
            return 2;
        }
        else if (this.percentage > 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
















