//board
var blockSize = 15;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 15;
var snakeY = blockSize * 8;

var velocityX = 0;
var velocityY = 0;

//snake body
var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

//Starting cover
window.onload = function loadBoard() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
};

function playSnake() {
  document.getElementById("play").style.opacity = "0";
  document.getElementById("cover").style.opacity = "0";

  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();

  document.addEventListener("keyup", ChangeDirection);
  setInterval(update, 1000 / 10);
}

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "white";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "rgb(209, 202, 0)";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    document.getElementById("play").style.opacity = "1";
    document.getElementById("cover").style.opacity = "1";

    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    document.getElementById("cover").style.opacity = 0;
    document.getElementById("cover").style.opacity = 0;
    document.getElementById("coverTwo").style.visibility = "visible";
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;

      board = document.getElementById("board");
      board.height = rows * blockSize;
      board.width = cols * blockSize;
      context = board.getContext("2d");

      context.fillStyle = "black";
      context.fillRect(0, 0, board.width, board.height);

      document.getElementById("coverTwo").style.visibility = "visible";
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

//snake movement
function ChangeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
