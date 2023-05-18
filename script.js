const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// setting up the speed of the scrolling speed. Uses 'let' so we can dynamically adjust the game speed.

let gameSpeed = 5;

// gameFrame is referenced in line 55 but doesn't function as well as the code it replaces.
// let gameFrame = 0;

const slider = document.getElementById('slider');
slider.value = gameSpeed;

const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change', function(e){
    console.log(e.target.value);
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
});

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
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;

        if (this.x <= -this.width){
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);

        // line 53 functions similarly as lines 47-50. The disadvantage is that when you change the game speed it recalculates the frame data and causes the background to jump around.
        // this.x = gameFrame * this.speed % this.width;

    }
    // this draws the image twice. You need to do this so that when the image reaches the end, it draws a second image so you don't see empty space or an image reset.
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
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

    // gameFrame--;
    requestAnimationFrame(animateBG);
};

animateBG();
