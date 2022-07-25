// declaring the variables
var menuBackgroundImg;      // the image for the menu's background
var mouseclicked;           // the state of if the mouse has been clicked once
var muteState;              // true if mute on, false if mute off

// loads the images to the game, every image in p5 must be loaded in this preload function
function preload(){

    //main menu images
    menuBackgroundImg = loadImage("imgs/DG.png");

    // mute button images
    restSoundPicture = loadImage("imgs/restSoundPicture.svg");
    hoveredSoundPicture = loadImage("imgs/hoveredSoundPicture.svg");
    clickedSoundPicture = loadImage("imgs/clickedSoundPicture.svg");

    // guides button images
    guidesBookClicked = loadImage("imgs/guidesBookClicked.svg");
    guidesBookHovered = loadImage("imgs/guidesBookHovered.svg");
    guidesBookRest = loadImage("imgs/guidesBookRest.svg");
}


function setup() {
    // initializing the variables
    mouseclicked = false;
    muteState = false;   
    
    // this displays an error message if user tries to use a non-appropate device, such as a phone
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use a computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    menuBackgroundImg.resize(windowWidth * 0.9, windowHeight * 0.9);                                                    // resizing the background image
    liftSeries = new GameModeButtons(10, 480, 80, "Lift Series", 90, 'Comic Sans MS', [0, 102, 153]);                   // the instance for the lift series button
    muteButton = new SmallButtons(5, 90, 50, 50, restSoundPicture, hoveredSoundPicture, clickedSoundPicture);           // the instance for mute button 
    guidesButton = new SmallButtons(90, 90, 50, 50, guidesBookRest, guidesBookHovered, guidesBookClicked);              // the instance for guides button 
}

// this function is repeated every tick by the P5 library
// so everything in this will run continuously
function draw(){
    drawBackGround();                   // draws the background image and the buttons
    mouseclicked = false;               // after each run, mouseclick must be set false
}

// makes mouseclicked variable true if mouse is clicked
function mouseClicked() {
    mouseclicked = true;
}