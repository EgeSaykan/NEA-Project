
var menuBackgroundImg;

function preload(){
    menuBackgroundImg = loadImage("imgs/DG.png");
    restSoundPicture = loadImage("imgs/restSoundPicture.png");
    hoveredSoundPicture = loadImage("imgs/hoveredSoundPicture.png");
}


function setup() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use a computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    menuBackgroundImg.resize(windowWidth * 0.9, windowHeight * 0.9);
    LiftSeries = new GameModeButtons(10, 430, 80, "Lift Series", 90);
    muteButton = new SmallButtons(5, height*0.9, 50, 50, "", 0, restSoundPicture, hoveredSoundPicture);
}


function draw(){
    drawBackGround();
    LiftSeries.drawButton();
    
}