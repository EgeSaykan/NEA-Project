
var menuBackgroundImg;

function preload(){
    menuBackgroundImg = loadImage("imgs/DG.png");
    restSoundPicture = loadImage("imgs/restSoundPicture.png");
    hoveredSoundPicture = loadImage("imgs/hoveredSoundPicture.png");
    clickedSoundPicture = loadImage("imgs/clickedSoundPicture.png");
}


function setup() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use a computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    menuBackgroundImg.resize(windowWidth * 0.9, windowHeight * 0.9);
    liftSeries = new GameModeButtons(10, 430, 80, "Lift Series", 90);
    muteButton = new SmallButtons(5, 90, 50, 50, "", 0, restSoundPicture, hoveredSoundPicture, clickedSoundPicture);
    
}


function draw(){
    
    drawBackGround();
    liftSeries.drawButton();
    muteButton.drawPictureButton();
    
}