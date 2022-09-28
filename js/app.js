// Enemies our player must avoid
const Enemy = function (x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.width = 75;
  this.x = x;
  this.y = y;
  this.border = { left: -100, right: 505 };
  this.speed = getRandomNum(200, 300);
  // this.sprite = "images/enemy-bug.png";
  this.sprite = "images/tank-icon.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  if (this.x < this.border.right) {
    this.x += dt * this.speed + Math.random();
  } else {
    this.speed = getRandomNum(200, 300);
    // from left to right
    this.x = this.border.left;
  }
};

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function () {
  this.width = 75;
  this.x = 202;
  this.y = 400;
  this.stepX = 101;
  this.stepY = 84;
  this.border = { top: -20, right: 404, bottom: 400, left: 0 };
  this.sprite = "images/char-nafo.png";
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.toStartPosition = function () {
  this.x = 202;
  this.y = 400;
};

Player.prototype.update = function () {
  if (this.y === this.border.top) {
    setTimeout(() => {
      swal(
        "Congratulations!",
        "Crimea finally under the Ukrainian flag 🇺🇦",
        "success",
        {
          button: "Слава Україні!",
        }
      );
      this.toStartPosition();
    }, 100);
  }
  this.checkEnemyCollision();
};

Player.prototype.checkEnemyCollision = function () {
  allEnemies.forEach((el) => {
    if (
      el.y == this.y &&
      this.x <= el.x + el.width &&
      this.x + this.width >= el.x
    ) {
      this.toStartPosition();
    }
  });
};

// ----------buttons-control---------

Player.prototype.handleInput = function (event) {
  if (event === "ArrowUp" && this.y !== this.border.top) {
    this.y -= this.stepY;
  } else if (event === "ArrowDown" && this.y !== this.border.bottom) {
    this.y += this.stepY;
  } else if (event === "ArrowLeft" && this.x !== this.border.left) {
    this.x -= this.stepX;
  } else if (event === "ArrowRight" && this.x !== this.border.right) {
    this.x += this.stepX;
  }
};

const player = new Player();

const enemy0 = new Enemy(-101, 64);
const enemy1 = new Enemy(-101, 148);
const enemy2 = new Enemy(-101, 232);

const allEnemies = [enemy0, enemy1, enemy2];

document.addEventListener("keyup", function (event) {
  player.handleInput(event.code);
});

// ----------touch-control---------

const controls = document.querySelector(".touch-control");
const movingPlayer = (e) => {
  let event = e.target.id;
  player.handleInput(event);
};
controls.addEventListener("click", movingPlayer);

// change bg color(hex COLOR)

const button = document.getElementById("round-btn-1");

const hex = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

button.addEventListener("click", () => {
  let hexColor = generateHex();
  document.body.style.backgroundColor = hexColor;
});

function generateHex() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }

  return hexColor;
}

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

// change bg color(BLACK & WHITE)

document.getElementById("round-btn-2").onclick = function () {
  const blackWhiteBG = document.getElementById("body").style;

  blackWhiteBG.getPropertyValue("background-color") === "black"
    ? blackWhiteBG.setProperty("background-color", "white")
    : blackWhiteBG.setProperty("background-color", "black");
};
