class drawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 150;
    width = 100;


    /**
     * 
     * @param {path} path 
     * the variable path contains the path to the image that has to be loaded and a new Object is created 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr 
     * an array with images is loaded and for each variable of the array will be created an object
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })

    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * 
     * this functions draws a frame on every obeject as help for setting the collision of the different objects
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof collectableObject || this instanceof Endboss || this instanceof BabyChicken) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            ctx.font = "48px serif";
            ctx.fillText(Math.round(this.x), this.x, this.y + this.height);
            ctx.fillText(Math.round(this.y), this.x, this.y);

        }
    }
}