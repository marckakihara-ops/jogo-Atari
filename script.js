const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const player = {
    x: 10,
    y: 200,
    width: 15,
    height: 100,
    speed: 8
};

const cpu = {
    x: 775,
    y: 200,
    width: 15,
    height: 100,
    speed: 4
};

const ball = {
    x: 400,
    y: 250,
    radius: 10,
    speedX: 5,
    speedY: 5
};

let upPressed = false;
let downPressed = false;

// CONTROLES TOUCH
upBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    upPressed = true;
});

upBtn.addEventListener("touchend", () => {
    upPressed = false;
});

downBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    downPressed = true;
});

downBtn.addEventListener("touchend", () => {
    downPressed = false;
});

//


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        upPressed = true;
    }

    if (event.key === "ArrowDown") {
        downPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") {
        upPressed = false;
    }

    if (event.key === "ArrowDown") {
        downPressed = false;
    }
});

function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

function drawCPU() {
    ctx.fillRect(
        cpu.x,
        cpu.y,
        cpu.width,
        cpu.height
    );
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(
        ball.x,
        ball.y,
        ball.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();
    ctx.closePath();
}

function movePlayer() {
    if (upPressed && player.y > 0) {
        player.y -= player.speed;
    }

    if (
        downPressed &&
        player.y < canvas.height - player.height
    ) {
        player.y += player.speed;
    }
}

function moveCPU() {
    if (cpu.y + cpu.height / 2 < ball.y) {
        cpu.y += cpu.speed;
    }

    if (cpu.y + cpu.height / 2 > ball.y) {
        cpu.y -= cpu.speed;
    }
}

function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;


    if (
        ball.y + ball.radius > canvas.height ||
        ball.y - ball.radius < 0
    ) {
        ball.speedY *= -1;
    }

    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.speedX *= -1;
    }

    if (
        ball.x + ball.radius > cpu.x &&
        ball.y > cpu.y &&
        ball.y < cpu.y + cpu.height
    ) {
        ball.speedX *= -1;
    }

    if (ball.x < 0 || ball.x > canvas.width) {

        // Bola nasce na CPU
        ball.x = cpu.x - 20;

        // Sai do meio da raquete da CPU
        ball.y = cpu.y + cpu.height / 2;

        // Direção para o jogador
        ball.speedX = -5;
    }
}

function update() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    movePlayer();
    moveCPU();
    moveBall();

    drawPlayer();
    drawCPU();
    drawBall();

    requestAnimationFrame(update);
}

update();