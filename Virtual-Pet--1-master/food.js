class Food{
    constructor(){
        this.foodStock=0
        this.lastFed;
        this.image=loadImage("virtual pet images/Milk.png")
    }
updateFoodStock(foodStock){
    this.foodStock=foodStock
}
getFeedTime(lastFed){
    this.lastFed=lastFed
}
deductFood(){
    if(this.foodStock>0){
        this.foodStock--
    }
}
getFoodStock(){
    return this.foodStock
}
display(){
    var x=80
    var y=100
    imageMode(CENTER)
    image(this.image,720,220,70,70)
    if(this.foodStock!=0){
        for(var a=0;a<this.foodStock;a++){
            if(a%10==0){
                x=80
                y=y+50
            }
            image(this.image,x,y,50,50)
            x=x+30
        }
    }
}
bedRoom(){
    background(bedroomImag,550,500)
}
garden(){
    background(gardenImag,550,500)
}
washRoom(){
    background(washRoomImag,550,500)
}
}