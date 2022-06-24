
var menuBackgroundImg;      // the image for the menu's background
var mouseclicked = false;   // the state of if the mouse has been clicked once

// loads the images to the game
function preload(){
    menuBackgroundImg = loadImage("imgs/DG.png");
    restSoundPicture = loadImage("imgs/restSoundPicture.png");
    hoveredSoundPicture = loadImage("imgs/hoveredSoundPicture.png");
    clickedSoundPicture = loadImage("imgs/clickedSoundPicture.png");
}


function setup() {
    
    // this displays an error message if user tries to use a non-appropate device, such as a phone
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use a computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    menuBackgroundImg.resize(windowWidth * 0.9, windowHeight * 0.9);                                                    // resizing the background image
    liftSeries = new GameModeButtons(10, 430, 80, "Lift Series", 90, [0, 102, 153]);                                                   // the instance for the lift series button
    muteButton = new SmallButtons(5, 90, 50, 50, "", 0, restSoundPicture, hoveredSoundPicture, clickedSoundPicture);    // the instance for mute button 

}

// this function is repeated every tick by the P5 library
// so everything in this will run continiously
function draw(){
    drawBackGround();                   // draws the bakground image and the buttons
    mouseclicked = false;               // after each run, mouseclick must be set false
}

// makes mouseclicked variable true if mouse is clicked
function mouseClicked() {
    mouseclicked = true;
}