//Create variables here
var dog,happyDog,dogImg,happyDogImg,database,foods,foodStock
var feedTime,lastFed,Feed,addFood,foodObject
var gameState
function preload()
{
  //load images here
  dogImg=loadImage("virtual pet images/Dog.png")
  happyDogImg=loadImage("virtual pet images/Happy.png")
  gardenImag=loadImage("virtual pet images/Garden.png")
bedroomImag=loadImage("virtual pet images/Bed Room.png")
washRoomImag=loadImage("virtual pet images/Wash Room.png")
}

function setup() {
  createCanvas(1000,500);
  database=firebase.database();
  feedTime=database.ref("feedTime")
  feedTime.on("value",function (data){
    lastFed=data.val()
  })

  readState=database.ref("gameState")
 readState.on("value",function (data){
    gamestate=data.val()
  })
  foodObject=new Food()
  dog=createSprite(250,400)
  dog.addImage(dogImg);
  dog.scale=0.2
database=firebase.database();
foodStock=database.ref("food");
foodStock.on("value",readStock)
Feed=createButton("Feed Bruno")
Feed.position(700,95)
Feed.mousePressed(feedDog)
addFoods=createButton("add food")
addFoods.position(800,95)
addFoods.mousePressed(addFood)
}

function draw() {  
background(46, 139, 87) 
/*foodObject.display()
textSize(15)
fill("white")
if(lastFed>=12){
  text("last fed:"+lastFed%12+"pm",350,30)
}
else if(lastFed==0){
  text("last fed: 12 am",350,30)
}else{
  text("last fed:"+lastFed+"am",350,30)
}
if(keyWentDown(UP_ARROW)){
  writeStock(foods)
  dog.addImage(happyDogImg)
}
if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
}
  //add styles here
  fill("white")
  textSize(30)
  text("press up arrow to feed Bruno",70,50)
  text("food remaining :"+foods,120,100)
  */
 currentTime=hour()
 if(currentTime===(lastFed+1)){
   updateState("playing")
   foodObject.garden()
 }
 else  if(currentTime===(lastFed+2)){
  updateState("sleeping")
  foodObject.bedRoom()
}
else  if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  updateState("bathing")
  foodObject.washRoom()
}
else{
  updateState("hungry")
  foodObject.display()
}
if(gameState!="hungry"){
  Feed.hide()
  addFoods.hide()
  dog.remove()
}else{
  Feed.show()
  addFoods.show()
  dog.addImage(dogImg)
}
  drawSprites();
}
function readStock(data){
foods=data.val();
foodObject.updateFoodStock(foods)
}
function feedDog(){
  dog.addImage(happyDogImg)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref("/").update({
    food:foodObject.getFoodStock(),
    feedTime:hour(),
    gameState:"hungry"
  })
}
function addFood(){
  foods++
  database.ref("/").update({
    food:foods
  })
}
function updateState(state){
  database.ref("/").update({
    gameState:state
  })
}