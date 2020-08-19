var bananaImage,bananagroup;
var obstacleimage,obstaclegroup;
var Background,backImage;
var invsground;

var score;
var player,player_running;

var gameover;

function preload(){
backImage= loadImage("jungle2.jpg");
player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
bananaImage = loadImage("Banana.png");
stoneImage = loadImage("stone.png");
  
//Tony obstacleimage was not preloaded  
obstacleimage=loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  
Background = createSprite(0,0,800,400);
Background.addImage(backImage);
Background.x = Background.width /2;
Background.velocityX = -6;
Background.scale = 1.5;
  
invsground = createSprite(400,350,800,10); 
invsground.visible = false;
  
monkey = createSprite(100,340,20,50);
monkey.addAnimation("Running",player_running);
monkey.scale = 0.1;
  
bananagroup = new Group();
obstaclegroup = new Group();
  
score = 0;
}

function draw() {
  background(225);
  
  if(Background.x<100){
    Background.x=Background.width/2;
  }
  
   if(bananagroup.isTouching(monkey)){
      bananagroup.destroyEach();
     score = score + 2;
     monkey.scale=monkey.scale+0.05;     
    }
  
   switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
   if(keyDown("space")&&monkey.y>=250) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.6;
  //Tony Collide command is applicable outside both states not in jumping condition
    //monkey.collide(invsground);
    spawnbanana();
    spawnObstacles();
  
    if(obstaclegroup.isTouching(monkey)){ 
        monkey.scale=0.08 ;
        score=score-2;
    }
 
  drawSprites();
  //Tony collide command was missing
  monkey.collide(invsground);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnbanana() {
  //spawn bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 120;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bananagroup.add(banana);
  }
}

function spawnObstacles(){
//spawn obstacles
  if (frameCount % 200 ===0){
  var stone = createSprite(600,340,10,10);
  stone.addImage(obstacleimage);
  stone.scale = 0.15;
  stone.velocityX = -6;
    
    //stone's lifetime
  stone.lifetime = 100;
    
  //add stone to obstacle group
    
    obstaclegroup.add(stone);
    
  }


}
