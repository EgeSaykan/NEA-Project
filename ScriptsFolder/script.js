// declaring the variables
var mouseclicked;           // the state of if the mouse has been clicked once
var gamemode;               // keeps a track of which mode the game currently is: "Main Menu", "Lift Series"
var guidesPageIndex;        // keeps a track of the index of image to be displayed in guidePages array
var mainMenuPlatformImg;    // the platform image on main menu
var counter;                // increments on every iteration of the loop
var changedGamemode;        // boolean value that is true when gamemode is changed
var paused;                 // boolean value. if true, pause game

let liftSeriesTime;      // time in milliseconds since canvas is created when Lift Series is activated
let currentTime;         // time in miliseconds since canvas is created
let solidPlatforms       // the array which has the objects of every solid platform
let hoveringPlatforms    // the array which has the objects of every hovering platform

// loads the images to the game, every image in p5 must be loaded in this preload function
function preload(){

    // load the main menu platform image
    mainMenuPlatformImg = loadImage("imgs/platform.png");

    // mute button images
    restSoundPicture = loadImage("imgs/restSoundPicture.svg");
    hoveredSoundPicture = loadImage("imgs/hoveredSoundPicture.svg");
    clickedSoundPicture = loadImage("imgs/clickedSoundPicture.svg");

    // guides button images
    guidesBookClicked = loadImage("imgs/guidesBookClicked.svg");
    guidesBookHovered = loadImage("imgs/guidesBookHovered.svg");
    guidesBookRest = loadImage("imgs/guidesBookRest.svg");
    guidePages = [loadImage("imgs/fooImage red.png"), loadImage("imgs/fooImage green.png"), loadImage("imgs/fooImage blue.png")]

    // load sound files
    mainMenuMusic = loadSound('Audio/Music/8. Teardrop Tempo.wav');
    liftSeriesMusic = loadSound('Audio/Music/7. Strange.wav');
    
    // platform images
    solidPlatformImage = loadImage("imgs/solidPlatform.png");
    hoveringPlatformImage = loadImage("imgs/hoveringPlatform.png");

    // pause button images
    pausedImage = loadImage("imgs/paused.svg");
    pauseImage = loadImage("imgs/pause.svg");
    pauseHoveredImage = loadImage("imgs/pauseHovered.svg");
}


function setup() {
    // initialising the variables
    mouseclicked = false;
    gamemode = "Main Menu";
    guidesPageIndex = 0;
    counter = 0;
    paused = false;
    changedGamemode = true;   // the game should initialise main menu first, therefore this variable starts true
    hoveringPlatforms = [];
    solidPlatforms = [];
    
    // this displays an error message if user tries to use a non-appropriate device, such as a phone
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use a computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    for (var i = 0; i < guidePages.length; i++) {guidePages[i].resize(windowWidth * 0.9, windowHeight * 0.9)}           // resizing the guide images
    mainMenuPlatformImg.resize(width * 235 / 1382, height * 38 / 742)                                                   // resizing the main menu platforms
    liftSeries = new GameModeButtons(10, 480, 80, "Lift Series", 90, 'Comic Sans MS', [0, 102, 153]);                   // the instance for the lift series button
    muteButton = new SmallButtons(5, 90, 50, 50, restSoundPicture, hoveredSoundPicture, clickedSoundPicture);           // the instance for mute button 
    guidesButton = new SmallButtons(90, 90, 50, 50, guidesBookRest, guidesBookHovered, guidesBookClicked);              // the instance for guides button 
    pauseButton = new SmallButtons(90, 5, 50, 50, pauseImage, pauseHoveredImage, pausedImage);                          // the instance for pause button 
    muteButton.clicked = true;  // set true in order to start the game muted
}

// this function is repeated every tick by the P5 library
// so everything in this will run continuously
function draw(){
    currentTime = millis();
    // if main menu is active
    if (gamemode == "Main Menu"){
        drawMainMenuBackGround();           // draws the background image and the buttons for the main menu
    }
    
    // if lift series is active
    else if (gamemode == "Lift Series"){
        // run inside if statement, if controls page is over
        if (displayControlsPage(5)){
            drawLiftSeries();
        }
    }

    
    mute();                                 // check the mute state and change volume if mute state has changed

    changeGamemode();                       // change the gamemode if a stimuli is activated (such as lift series button being clicked)
    ifChangedGamemode();                    // initialise new game mode

    counter++;                              // increment the counter
    mouseclicked = false;                   // after each run, mouseclick must be set false
    changedGamemode = false;                // after each run, changedGamemode must be set false
    keyCode = 0;                            // reset keyCode
}

// this is called when mouse is clicked
function mouseClicked() {
    userStartAudio();       // sets Chrome audio to resume
    mouseclicked = true;    // a global variable which is true if mouse is clicked that run

}