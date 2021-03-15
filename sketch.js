var background1, background_img;
var ground, ground_img;
var bird, bird_img;
var pipe1,pipeNorth_image;
var pipe2,pipeSouth_image;
var pipe1Group, pipe2Group;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, r;


function preload() {
background_img = loadImage("background.png");
ground_img = loadImage("ground.png");
bird_img = loadImage("bird.png");
pipeNorth_image = loadImage("pipeNorth.png");
pipeSouth_image = loadImage("pipeSouth.png"); 
r = loadImage("restart.png");

}

function setup() {
  createCanvas(290,520);

  background1 = createSprite(160,260,15,10);
  background1.addImage(background_img);
  
  ground = createSprite(150,465,30,20);
  ground.addImage(ground_img);

  bird = createSprite(30,220,20,20);
  bird.addImage(bird_img);

  pipe1Group = new Group();
  pipe2Group = new Group();

  score = 0;

  restart = createSprite(160,179,10,10);
  restart.addImage(r);
  restart.visible = false;
  restart.scale = 0.4;
}

function draw() {
  background(0,145,150);

  if(gameState===PLAY) {
    ground.velocityX = -1;

    if(ground.x<150) {
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")) {
      bird.y = bird.y-10;
    }
    else{
      bird.velocityY = 5;
    }
  
    pipe_move();
  
    if(frameCount%70===0) {
      score++;
    }

    if(bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group) || bird.isTouching(ground)) {
      gameState = END;
    }

  }

  else if(gameState===END) {
    ground.velocityX = 0;
    bird.visible = false;
    bird.x = 30;
    bird.y = 260;
    pipe1Group.setVelocityXEach(0);
    pipe2Group.setVelocityXEach(0);
    pipe1Group.setLifetimeEach(-1);
    pipe2Group.setLifetimeEach(-1);
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }

  }
  

  

  drawSprites();

  textSize(30);
  text("score:" + score, 150, 80);

}
function pipe_move() {
  if(frameCount%70===0) {
    pipe1 = createSprite(150,5,10,10);
    pipe1.addImage(pipeNorth_image);
    pipe1.y = random(0,45);
    pipe1.velocityX = -2;
    pipe1Group.add(pipe1);
    pipe1Group.setLifetimeEach(140);

    pipe2 = createSprite(150,510,10,10);
    pipe2.addImage(pipeSouth_image);
    pipe2.y = random(450,510);
    pipe2.velocityX = -2;
    pipe2Group.add(pipe1);
    pipe2Group.setLifetimeEach(140);
          
  }

}

function reset() {
  gameState = PLAY;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score = 0;
  bird.visible = true;
  restart.visible = false;
}

