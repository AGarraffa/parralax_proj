const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// setting up the speed of the scrolling speed. Uses 'let' so we can dynamically adjust the game speed.
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src= '../assets/background_layer/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src= '../assets/background_layer/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src= '../assets/background_layer/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src= '../assets/background_layer/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src= '../assets/background_layer/layer-5.png';

class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        // used for doubling the image to aid in infinite scrolling
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    // this makes sure that the image redraws once it reaches the end of the image
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width){
            this.x2= this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    // this draws the image twice so that you can infinitely scroll
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.1);
const layer2 = new Layer(backgroundLayer2, 0.25);
const layer3 = new Layer(backgroundLayer3, 0.15);
const layer4 = new Layer(backgroundLayer4, 0.5);
const layer5 = new Layer(backgroundLayer5, 1);

const backgrounds = [layer1, layer2, layer3, layer4, layer5]

function animateBG() {

    // clears the image for each animation cycle so it doesn't continually draw the image
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    backgrounds.forEach(object => {
        object.update();
        object.draw();
    })

    requestAnimationFrame(animateBG);
};

animateBG();