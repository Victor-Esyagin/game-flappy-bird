let cvs = document.querySelector('#canvas');
let ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeBottom.src = "images/pipeBottom.png";

// Звуковые файлы
let fly = new Audio();
let scoreAudio = new Audio();
fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

let gap = 150; //отступ

document.addEventListener('keydown', moveup);

function moveup() {
    yPos -= 25;
    fly.play();
}
// Создание блоков
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}
let score = 0;
// Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.5;


function draw() {
    ctx.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        if (pipe[i].x == 50) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        //Отслеживание соприкосновений
        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap)|| yPos + bird.height >= cvs.height - fg.height) {
            location.reload();
        }
        if(pipe[i].x == 5){
            score++;
            scoreAudio.play();
        }
    }



    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;
    ctx.fillStyle='black';
    ctx.font='24px sans-serif';
    ctx.fillText('Счет: '+ score, 10, cvs.height -20);
    
    
    
    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;