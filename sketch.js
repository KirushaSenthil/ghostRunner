var tower
var towerImage
var door
var doorImage
var doorGroup
var climber
var climberImage
var climberGroup
var ghost
var ghostImage
var invisibleBlock
var invisibleBlockGroup

var PLAY=1
var END=0
var gameState=PLAY

function preload(){
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
  
}
function setup(){
 createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost=createSprite(200,150,10,10)
  ghost.addImage(ghostImage)
  ghost.scale=0.3
  
  
}
function draw(){
  background("white")
  if(gameState===PLAY){
    if(tower.y>400){
    tower.y=300
  }
  if(keyDown("space")){
    ghost.velocityY=-5
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3
  }
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState=END
  }
  ghost.velocityY=ghost.velocityY+0.5
  spawnDoors();
  drawSprites();
    
  }
  if(gameState===END){
    background("black")
    fill("pink")
    textSize(50)
    stroke("blue")
    strokeWeight(5)
    text("game over",200,200)
    
  }
  
}
function spawnDoors(){
  if(frameCount%250===0){
    door=createSprite(200,-50)
    door.addImage(doorImage)
    climber=createSprite(200,10)
    climber.addImage(climberImage)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    door.x=Math.round(random(150,450))
    door.velocityY=1
    climber.x=door.x
    climber.velocityY=1
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    
    doorGroup.add(door)
    climberGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
  
  
}