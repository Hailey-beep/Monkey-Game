//varables for game states
var PLAY=1, END=0, gameState = PLAY;
//varables for monkey
var monkey , monkey_running;
//varables for objects
var banana, bananaImage, obstacle, obstacleImage, ground;
//varable for groups
var foodGroup, obstacleGroup;
//varable for score
var survivalTime = 0;

function preload(){
  
  monkey_running =  loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,400);
  
  //creates monkey
  monkey = createSprite(50,302,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.12;
  monkey.setCollider("circle",0,0,240);
  //monkey.debug = true;
  
  //creates ground
  ground = createSprite(200,350,800,30);
  ground.x = ground.width/2
  ground.shapeColor = "green";
  //ground.debug = true;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  if (gameState === PLAY) {
    
    //monkeys behaviors
    //makes monkey jump
    if(keyDown("space") && (monkey.y >= 306)) {
       monkey.velocityY = -20;
       }

    //gives monkey gravity by adding to the existing velocity
    monkey.velocityY = monkey.velocityY + 1;

    //makes monkey collide with ground
    monkey.collide(ground);

    //grounds behaviors
    ground.velocityX = -3;
    //creates scrolling ground
    if(ground.x < 0) {
      ground.x = ground.width/2;
       }
    
    food();
    rock();
    
    //makes game end if monkey hits obstacle.
    if (monkey. isTouching(obstacleGroup)) {
      gameState = END;
        }
  }
  else if(gameState === END) {
    //stops everything
    ground.velocity = 0;
    foodGroup.velocityXEach = 0;
    obstacle.velocityXEach = 0;
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
          }
  
    //makes text for score
  stroke("black");
  fill("black");
  textSize(20);
  //We will use ceil because it rounds the number up to the closest integer (4.3 = 5.0), while round rounds the number to is closes integer (4.3 = 4 and 4.6 = 5).
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 120, 50);
  
  drawSprites();
}

function food() {
  if(frameCount %80 == 0) {
    banana = createSprite(405,random(120,200),20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 84;
    foodGroup.add(banana);
    
    //Makes the monkey have more depth then the banana(looks better).
    monkey.depth = banana.depth;
    monkey.depth = monkey.depth + 1;
  } 
}

function rock() {
  if(frameCount %300 == 0) {
    obstacle = createSprite(405,308,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 84;
    obstacleGroup.add(obstacle);
  } 
}