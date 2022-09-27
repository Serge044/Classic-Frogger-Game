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

let counterOfLosesAndWins = 0;

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
    // зʼявляються зліва на право
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

Player.prototype.toStartPosition = function (n) {
  if (n === 0) {
    this.x = 202;
    this.y = 400;
  } else {
    let self = this;
    setTimeout(function () {
      self.x = 202;
      self.y = 400;
      counterOfLosesAndWins += 1;
    }, n);
  }
};

console.log(counterOfLosesAndWins);

Player.prototype.update = function () {
  if (this.y === this.border.top) {
    // return;
    // counter of win, undestand how to add only 1!
    // counterOfWins += 1;
    // console.log(counterOfWins);
    this.toStartPosition(250);
    // console.log(counterOfWins);
  }
  // understand about the number(1 or another ??)
  this.checkEnemyCollision();
  // console.log("U win!");
};

Player.prototype.checkEnemyCollision = function () {
  allEnemies.forEach((element) => {
    if (
      element.y == this.y &&
      this.x <= element.x + element.width &&
      this.x + this.width >= element.x
    ) {
      this.toStartPosition();
      counterOfLosesAndWins -= 1;
      console.log(counterOfLosesAndWins);
    }
  });
};

// ----------buttons-control---------

Player.prototype.handleInput = function (key) {
  if (key === "up" && this.y !== this.border.top) {
    this.y -= this.stepY;
  } else if (key === "down" && this.y !== this.border.bottom) {
    this.y += this.stepY;
  } else if (key === "left" && this.x !== this.border.left) {
    this.x -= this.stepX;
  } else if (key === "right" && this.x !== this.border.right) {
    this.x += this.stepX;
  }
  // CHECK IT
  // if (this.y == -20) {
  //   counterOfLosesAndWins += 1;
  //   console.log(counterOfLosesAndWins);
  //   return;
  // }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 505, 606
const player = new Player();

const enemy0 = new Enemy(-101, 64);
const enemy1 = new Enemy(-101, 148);
const enemy2 = new Enemy(-101, 232);

const allEnemies = [enemy0, enemy1, enemy2];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// спрацювання на віджатті клавіші, щоб уникнути затискання і швидкого руху(чітерства)
document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// ----------touch-control---------

document.querySelector(".btn-up").onclick = function () {
  if (player.y !== player.border.top) {
    player = player.y -= player.stepY;
    // console.log("up");
    //CHECK IT
  } else if (player.y >= player.border.top) {
    counterOfLosesAndWins += 1;
    console.log(counterOfLosesAndWins);
  }
};

document.querySelector(".btn-down").onclick = function () {
  if (player.y !== player.border.bottom) {
    player = player.y += player.stepY;
    // console.log("down");
  }
};

document.querySelector(".btn-left").onclick = function () {
  if (player.x !== player.border.left) {
    player = player.x -= player.stepX;
    // console.log("left");
  }
};

document.querySelector(".btn-right").onclick = function () {
  if (player.x !== player.border.right) {
    player = player.x += player.stepX;
    // console.log("right");
  }
};

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
