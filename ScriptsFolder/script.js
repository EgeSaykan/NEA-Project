// declaring the variables
var menuBackgroundImg;      // the image for the menu's background
var mouseclicked;           // the state of if the mouse has been clicked once
var gamemode;               // keeps a track of which mode the game currently is: "Main Menu", "Lift Series"
var guidesPageIndex;        // keeps a track of the index of image to be displayed in guidePages array

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
    guidePages = [loadImage("imgs/fooImage red.png"), loadImage("imgs/fooImage green.png"), loadImage("imgs/fooImage blue.png")]
}


function setup() {
    // initializing the variables
    mouseclicked = false;
    gamemode = "Main Menu";
    guidesPageIndex = 0;
    
    // this displays an error message if user tries to use a non-appropate device, such as a phone
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use a computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    menuBackgroundImg.resize(windowWidth * 0.9, windowHeight * 0.9);                                                    // resizing the background image
    for (var i = 0; i < guidePages.length; i++) {guidePages[i].resize(windowWidth * 0.9, windowHeight * 0.9)}           // resizing the guide images
    liftSeries = new GameModeButtons(10, 480, 80, "Lift Series", 90, 'Comic Sans MS', [0, 102, 153]);                   // the instance for the lift series button
    muteButton = new SmallButtons(5, 90, 50, 50, restSoundPicture, hoveredSoundPicture, clickedSoundPicture);           // the instance for mute button 
    guidesButton = new SmallButtons(90, 90, 50, 50, guidesBookRest, guidesBookHovered, guidesBookClicked);              // the instance for guides button 
}

// this function is repeated every tick by the P5 library
// so everything in this will run continuously
function draw(){
    if (gamemode == "Main Menu"){
        drawMainMenuBackGround();           // draws the background image and the buttons for the main menu
    }
    mouseclicked = false;                   // after each run, mouseclick must be set false
}

// makes mouseclicked variable true if mouse is clicked
function mouseClicked() {
    mouseclicked = true;
}