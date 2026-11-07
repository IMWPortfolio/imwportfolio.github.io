var img;
var initials ='iw'; // your initials
var choice = '1'; // starting choice, so it is not empty
var screenbg = (1,10,50); // bluish black background
var lastscreenshot=1; // last screenshot never taken

function preload() {
  img = loadImage('https://imwportfolio.github.io/images/nebula.png');
}

function setup() {
createCanvas(600, 600);  // canvas size
background(screenbg);   // use our background screen color

}

function draw() {
  if (keyIsPressed) {
    choice = key; // set choice to the key that was pressed
    clear_print(); // check to see if it is clear screen or save image
  }
  if (mouseIsPressed){
    newkeyChoice(choice);  // if the mouse is pressed call newkeyChoice
  }
}

function newkeyChoice(toolChoice) { //toolchoice is the key that was pressed
  // the key mapping if statements that you can change to do anything you want.
  // just make sure each key option has the a stroke or fill and then what type of 
  // graphic function

 if (toolChoice == '1') {   // stars
    if (frameCount % 6 == 0) {    // draws on every 6th frame. increase for denser stars
      noStroke();
      fill(255);
      circle(mouseX, mouseY, 2);
      circle(mouseX+15, mouseY-10, 2);
      circle(mouseX-12, mouseY+8, 2);
      circle(mouseX-8, mouseY-16, 2);
      circle(mouseX+10, mouseY+14, 2);
    }

} else if (toolChoice == '2') {   // background glow. place before planet. keep mouse still when switching tools to center the planet on top of the glow
    noStroke();
    for (let r = 60; r >= 50; r--) { // loop to create fading concentric circles
      let t = (r - 50) / 10; //sets the distance between concentric circles
      fill(lerpColor(color(255), color(screenbg), t));
      circle(mouseX, mouseY, r * 2);
    }

} else if (toolChoice == '3') { // dark teal planet
    noStroke();
    fill(110, 145, 125);
    circle(mouseX, mouseY, 100);

} else if (toolChoice == '4') { // dark red planet
    noStroke();
    fill(155, 75, 65);
    circle(mouseX, mouseY, 100);

} else if (key == '5') { // add craters to your planet. also kinda works as lens flares
    noStroke();
    fill(100, 90, 90, 50); // 4th number is transparency
    circle(mouseX, mouseY, 15);

} else if (toolChoice == 'g' || toolChoice == 'G') { // add a nebula!
    tint(255, 80); // color change (none) and transparency
    image(img, mouseX-225, mouseY-225, 450, 450);
  }
 }

function testbox(r, g, b) {
// this is a test function that will show you how you can put your own functions into the sketch
  x = mouseX;
  y = mouseY;
  fill(r, g, b);
  rect(x-50, y-50, 20, 20);
}

function clear_print() {
// this will do one of two things, x clears the screen by resetting the background
// p calls the routine saveme, which saves a copy of the screen
  if (key == 'x' || key == 'X') {
    background(screenbg); // set the screen back to the background color
  } else if (key == 'p' || key == 'P') {
     saveme();  // call saveme which saves an image of the screen
  }
}

function saveme(){
    //this will save the name as the intials, date, time and a millis counting number.
    // it will always be larger in value then the last one.
  filename=initials+day() + hour() + minute() +second();
  if (second()!=lastscreenshot) { // don't take a screenshot if you just took one
    saveCanvas(filename, 'jpg');
    key="";
  }
  lastscreenshot=second(); // set this to the current second so no more than one per second

}
