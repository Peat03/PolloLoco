class Coin extends collectableObject {


    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png']


    height = 150;
    width = 150;
    y = 335;

    constructor(x) {
        super().loadImages(this.IMAGES_COIN);
        this.x = x + Math.random() * 3000;
        this.y -= Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.5; 
        this.coinSmallToBig();
    }

/**
 * animates the coin by changing the size of the coin in an interval
 */
    coinSmallToBig() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);

        }, 300);
    }

}