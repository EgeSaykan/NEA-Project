// ------------ HEADER COMMENT ------------

// this is the main file
// it uses functions and classes declared in other files in the directory or sub directories
// using p5 module, first the initialisation of global variables is done in preload() and setup()
// and draw is the continious function that runs on repeat


// ------------ declaring global variables ------------

var mouseclicked;           // the state of if the mouse has been clicked once
var gamemode;               // keeps playerObject track of which mode the game currently is: "Main Menu", "Lift Series"
var guidesPageIndex;        // keeps playerObject track of the index of image to be displayed in guidePages array
var counter;                // increments on every iteration of the loop
var changedGamemode;        // boolean value that is true when gamemode is changed
var paused;                 // boolean value. if true, pause game
var liftSeriesTime;         // time in milliseconds since canvas is created when Lift Series is activated
var currentTime;            // time in miliseconds since canvas is created
var solidPlatforms;         // the array which has the objects of every solid platform
var hoveringPlatforms;      // the array which has the objects of every hovering platform
var cooefOfFriction;        // how fast will the acceleration decrease due to friction
const g = 8;                // gravitational constant
var fireWallSpeed;          // time difference between creation of each wall piece
var jumpingConstant;        // how fast the vertical acceleration of the player increases
var accel_vel_constant;     // how much the acceleration affects the velocity
var runningConstant;        // how fast the horizontal acceleration of the player increases
var level = 0;              // the level of current lift series
const randomAttackKeys = ["i", "j", "k", "l"]; // attack keys that will be used to randomise for player's attacks
let callStartGameOnce = false;  // makes sure startGame is called once every game

// ------ global attack variables ------
var attackDuration;         // how long will each firewall piece last
var wallSeperation;
var attackDamage;
var attackHeight;
var attackWidth;
var projectileSpeed;

// ------ images ------
var mainMenuPlatformImg;    // the platform image on main menu

// mute button images
var restSoundPicture;
var hoveredSoundPicture;
var clickedSoundPicture;

// guides button images
var guidesBookClicked;
var guidesBookHovered;
var guidesBookRest;
var guidePages

// load sound files
var mainMenuMusic;
var liftSeriesMusic;

// platform images
var solidPlatformImage;
var hoveringPlatformImage;

// pause button images
var pausedImage;
var pauseImage;
var pauseHoveredImage;


// ------ classes ------
var liftSeries;
var muteButton;
var guidesButton;
var pauseButton;
var playerObject;
var enemyObject;


// ------------ loading images ------------
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
    guidePages = [loadImage("imgs/guidesPageOne.png"), loadImage("imgs/guidesPageTwo.png")];

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


// ------------ initialisation ------------
// set up is executed once during the initialisation of p5
// I can put here initialisations of variables and creation of the canvas
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
    cooefOfFriction = 0.1;
    fireWallSpeed = 0.5;
    attackDuration = 1.5;
    jumpingConstant = 20;
    accel_vel_constant = 0.1;
    runningConstant = 2;
    wallSeperation = 4;
    attackDamage = 8;
    attackHeight = 50;
    attackWidth = 50;
    projectileSpeed = 5;

    
    
    
    // this displays an error message if user tries to use playerObject non-appropriate device, such as playerObject phone
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use playerObject computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    slider1 = [createSlider(300, 500, 400), createSlider(300, 500, 400)];
    slider2 = [createSlider(300, 500, 400), createSlider(300, 500, 400)];




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
    currentTime = millis(); // get the time passed since canvas creation

    // if main menu is active
    if (gamemode == "Main Menu"){
        drawMainMenuBackGround();           // draws the background image and the buttons for the main menu
    }
    
    // if lift series is active
    else if (gamemode == "Lift Series"){
        // run inside if statement, if controls page is over
        if (displayControlsPage(3)){
            // draw lift series
            drawLiftSeries();
        }
        
    }

    // make sure the input is cleared if user is not using any keys
    if (keyIsPressed === false){
        key = "";
    }
    
    mute();                                 // check the mute state and change volume if mute state has changed

    changeGamemode();                       // change the gamemode if playerObject stimuli is activated (such as lift series button being clicked)
    ifChangedGamemode();                    // initialise new game mode

    counter++;                              // increment the counter
    mouseclicked = false;                   // after each run, mouseclick must be set false
    changedGamemode = false;                // after each run, changedGamemode must be set false
    keyCode = 0;                            // reset keyCode
}

// this is called when mouse is clicked
function mouseClicked() {
    userStartAudio();       // sets Chrome audio to resume
    mouseclicked = true;    // playerObject global variable which is true if mouse is clicked that run

}
