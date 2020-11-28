var movingBall,database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(windowWidth,windowHeight);
    movingBall = createSprite(20 ,20 ,10,10);
    movingBall.shapeColor = "red";

    var movingBallPosition = database.ref('ball/position');
    movingBallPosition.on("value",readPosition);
}

function draw(){
    background("white");

    console.log(getFrameRate);

    if(keyDown(LEFT_ARROW)){
        writePosition(-2,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(2,0);
    }
    else if(keyDown(UP_ARROW) || touches.length < 'x'){
        writePosition(0,-2);
    }
    else if(keyDown(DOWN_ARROW) || touches.length > 'x'){
        writePosition(0,+2);
    }
    drawSprites();
}


function readPosition(data){
    position = data.val();
    movingBall.x = position.x;
    movingBall.y = position.y;
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x + x,
        'y' : position.y + y
    })

}

