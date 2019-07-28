var cvs;
var ctx;
var canvasWidth;
var canvasHeight;
var snake;
var direction;
var food;
var score;

window.onload = function() {
  snake = [[2, 0], [1, 0], [0, 0]];

  cvs = document.getElementById("canvas");
  ctx = cvs.getContext("2d");

  canvasWidth = cvs.width;
  canvasHeight = cvs.height;

  food = makeFood();
  direction = "right";
  document.addEventListener("keydown", getDirection);
  setInterval(getDirection, 10);
  setInterval(drawSnake, 60);

  score = 3;
};

function draw(x, y, isFood) {
  if (!isFood) {
    ctx.fillStyle = "white";
  } else {
    ctx.fillStyle = "yellow";
  }
  ctx.fillRect(x * 10, y * 10, 10, 10);

  ctx.fillStyle = "#000";
  ctx.strokeRect(x * 10, y * 10, 10, 10);
}

function drawSnake() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (var i = 0; i < snake.length; i++) {
    var x = snake[i][0];
    var y = snake[i][1];
    draw(x, y, false);
  }
  draw(food[0], food[1], true);

  step();
}

function step() {
  // remove last block of Snake
  var sX = snake[0][0];
  var sY = snake[0][1];
  //console.log(sX);
  if (sX == food[0] && sY == food[1]) {
    makeFood();
    score++;
  } else {
    snake.pop();
  }

  var newHead = getNext(sX, sY);
  // add new block based on snake direction

  snake.unshift(newHead);
  drawScore();
}

function getDirection(e) {
  if (e.keyCode == 37 && direction != "right") {
    direction = "left";
  } else if (e.keyCode == 38 && direction != "down") {
    direction = "up";
  } else if (e.keyCode == 39 && direction != "left") {
    direction = "right";
  } else if (e.keyCode == 40 && direction != "up") {
    direction = "down";
  }
}

function getNext(sX, sY) {
  if (direction == "left") sX--;
  else if (direction == "right") sX++;
  else if (direction == "up") sY--;
  else if (direction == "down") sY++;

  if (sX < 0 || sY < 0 || sX >= 50 || sY >= 50) {
    location.reload();
  }
  if (checkCollision(sX, sY)) {
    location.reload();
  }

  var newHead = [sX, sY];
  return newHead;
}

function eat() {
  // increase the size of the array by one
}

function makeFood() {
  foodX = Math.round(Math.random() * 49);
  foodY = Math.round(Math.random() * 49);
  food = [foodX, foodY];
  return food;
}

function checkCollision(sX, sY) {
  for (var i = 0; i < snake.length; i++) {
    if (snake[i][0] == sX && snake[i][1] == sY) {
      return true;
    }
  }
  return false;
}

function drawScore() {
  ctx.fillStyle = "yellow";
  ctx.font = "15px Verdana";
  ctx.fillText("score : " + score, 5, 495);
}
