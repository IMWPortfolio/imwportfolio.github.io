var brainx = 300;
var brainy = 300;
var brainSize = 60;

var zombiex = 0;
var zombiey = 0;
var zombieSize = 60;
var zombieSpeed = 2;

var score = 0;
var gameState = "start";


function preload() {
   zombieImg = loadImage("https://imwportfolio.github.io/images/zombie.png");
   brainImg = loadImage("https://imwportfolio.github.io/images/brain2.png");
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  textSize(20);
  imageMode(CENTER);
} // end setup

function draw() {
  background(220);

  if (gameState == "start") {
    startScreen();
  }
  if (gameState == "L1") {
    levelOne();
  }
  if (gameState == "L2") {
    levelTwo();
  }
  if (gameState == "L3") {
    levelThree();
  }
  if (gameState == "win") {
    winScreen();
  }
  if (gameState == "lose") {
    loseScreen();
  }

  fill(0);
  text("score: " + score, width/2, 40);
} // end draw

// levels quick reference - playLevel(label, background color, brain size, zombie speed, score to finish, next state)
function levelOne() {
  playLevel("Level 1", color(0, 160, 120), 60, 2, 5, "L2");
}

function levelTwo() {
  playLevel("Level 2", color(150, 110, 80), 45, 3, 10, "L3");
}

function levelThree() {
  playLevel("Level 3", color(90, 40, 40), 30, 4.5, 15, "win");
}

function playLevel(label, bgColor, newBrainSize, newZombieSpeed, goal, nextState) {
  background(bgColor);
  brainSize = newBrainSize;
  zombieSpeed = newZombieSpeed;

  fill(255);
  text(label, width/2, height-20);

  // zombie movement
  var dx = mouseX - zombiex;
  var dy = mouseY - zombiey;
  var distToPlayer = dist(zombiex, zombiey, mouseX, mouseY);
  if (distToPlayer > 0) {
    zombiex = zombiex + (dx / distToPlayer) * zombieSpeed;
    zombiey = zombiey + (dy / distToPlayer) * zombieSpeed;
  }

  // of zombie catches you, game over
  if (distToPlayer < zombieSize/2) {
    gameState = "lose";
  }

  // check score, decide to advance level or move brain
  if (score >= goal) {
    gameState = nextState;
    resetZombie();
    moveBrain();
  }

  drawBrain();
  drawZombie();
} // end level

// clicking
function mousePressed() {
  if (gameState == "L1" || gameState == "L2" || gameState == "L3") {
    var distToBrain = dist(brainx, brainy, mouseX, mouseY);
    if (distToBrain < brainSize/2) {
      score = score + 1;
      moveBrain();
    }
  } else if (gameState == "start" || gameState == "win" || gameState == "lose") {
    // Start or restart the game
    score = 0;
    gameState = "L1";
    brainSize = 60;
    resetZombie();
    moveBrain();
  }
}

// zombie respawn
function resetZombie() {
  zombiex = random(width);
  zombiey = random(height);
}

// brain respawn
function moveBrain() {
  brainx = random(brainSize/2, width - brainSize/2);
  brainy = random(60 + brainSize/2, height - 40 - brainSize/2);
}

function drawBrain() {
  if (brainImg) {
    image(brainImg, brainx, brainy, brainSize, brainSize);
  } else {
    fill(255, 150, 180);
    ellipse(brainx, brainy, brainSize, brainSize);
  }
}

function drawZombie() {
  if (zombieImg) {
    image(zombieImg, zombiex, zombiey, zombieSize, zombieSize);
  } else {
    fill(0, 150, 0);
    ellipse(zombiex, zombiey, zombieSize, zombieSize);
  }
}

// start, win, and lose screens
function startScreen() {
  fill(0);
  text("ZOMBIE ESCAPE", width/2, height/2 - 40);
  text("Click the brains. Flee the zombie!", width/2, height/2);
  text("Click to start", width/2, height/2 + 40);
}

function winScreen() {
  background(80, 180, 255);
  fill(0);
  text("You survived. For now...", width/2, height/2);
  text("Click to play again", width/2, height/2 + 40);
}

function loseScreen() {
  background(0);
  fill(255, 0, 0);
  text("You died.", width/2, height/2);
  text("Click to try again", width/2, height/2 + 40);
}
