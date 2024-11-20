const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "https://pin.it/5UQO2emRX";  // Bird image
bg.src = "https://images.app.goo.gl/9pxbaVnhLdkVG7wCA";    // Background image
fg.src = "https://images.app.goo.gl/9pxbaVnhLdkVG7wCA";    // Foreground image
pipeNorth.src = "https://images.app.goo.gl/sFTbdiUBX82RGAT49"; // Top pipe
pipeSouth.src = "https://images.app.goo.gl/GMfjnEhXxFAZWicg7"; // Bottom pipe

// Variables
const gap = 90;
let constant;
let birdX = 50;
let birdY = 150;
let gravity = 1.5;
let score = 0;

// Audio files
const fly = new Audio();
const scor = new Audio();

fly.src = "https://www.soundjay.com/button/beep-07.mp3";
scor.src = "https://www.soundjay.com/button/beep-08.mp3";

// Pipe coordinates
const pipe = [];
pipe[0] = { x: canvas.width, y: 0 };

// On key press
document.addEventListener("keydown", moveUp);

function moveUp() {
    birdY -= 25;
    fly.play();
}

// Draw function
function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
            });
        }

        // Detect collision
        if (
            birdX + bird.width >= pipe[i].x &&
            birdX <= pipe[i].x + pipeNorth.width &&
            (birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + constant) ||
            birdY + bird.height >= canvas.height - fg.height
        ) {
            location.reload(); // Reload game on collision
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, birdX, birdY);

    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
