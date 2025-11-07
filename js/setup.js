let player;
let walkImg, idleImg, jumpImg;
let groundY=280; //turned into a variable for collision
let walkFrames = 9; 
let frameWidth, frameHeight;
let canvas;

function preload(){
    walkImg = loadImage('walking.png');   
    idleImg = loadImage('idlejump.png');
    backgroundImage = loadImage('background.jpg');
  }
function setup(){
  canvas = createCanvas(600,300)
  canvas.parent('gamecontainer');
  player = new Player(100, groundY);
  frameWidth = walkImg.width / walkFrames; 
  frameHeight = walkImg.height;  
}

function draw (){
  background (backgroundImage);
  fill(2, 13, 44);
  // solid ground
  noStroke();
  rect(0, groundY, width, height - groundY);
  player.display();
  player.movementControls();
  player.update();
}
