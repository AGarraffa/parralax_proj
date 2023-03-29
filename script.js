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

// horizontal position of the background images=
let x = 0;
let x2 = 2400;

function animateBG() {

    // clears the image for each animation cycle so it doesn't continually draw the image
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(backgroundLayer4, x, 0);
    // drawing the image again to help with the scrolling
    ctx.drawImage(backgroundLayer4, x2, 0);

    // the image will scroll off the screen. Resetting the x value get's the image back in to frame. 2400 is the pixel width of this particular image so you just need to know that based on your assets.
    if (x < -2400) x = 2400;
    // changing the rate at which x decreases will change how fast the image scrolls
    else x -= gameSpeed;
    if (x2 < -2400) x2 = 2400;
    else x2 -= gameSpeed;
    requestAnimationFrame(animateBG);
};

animateBG();