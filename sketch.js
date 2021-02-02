var balloon,balloonImage;
var database;
var backgroundImage;
var position;

function preload() {
  backgroundImage=loadImage("images/Hot Air Ballon-01.png");
  balloonImage=loadImage("images/Hot Air Ballon-02.png");
}

function setup() {
  createCanvas(800,400);

  database=firebase.database();

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError);
  
  balloon=createSprite(250,200,1,1);
  balloon.addImage(balloonImage);
  balloon.scale=0.4;
}

function draw() {
  background(backgroundImage);

  if(keyDown(LEFT_ARROW)) {
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)) {
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)) {
    updateHeight(0,-10);
    balloon.addAnimation("image",balloonImage);
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)) {
    updateHeight(0,+10);
  }

  drawSprites();

  textSize(15);
  fill("blue");
  text("Use arrow keys to move the 'Hot Air Baloon'",10,30);
}

function updateHeight(x,y) {
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readHeight(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError() {
  console.log("Error in writing to the database");
}