// ------------ HEADER COMMENT ------------

// this file contains all background functions such as drawing background or muting
// every function is either called in another function or it is called in script.js
// this file only declares functions but does not call them


// ------------ functions ------------

// draw main menu background 
// show and operate lift series, mute and guides buttons
function drawMainMenuBackGround(){


    // changing background colour
    background(45  + Math.sin((counter * 2 * 0.001) % PI) * 45, 64 - Math.sin((counter * 0.001) % PI) * 64, 56  + Math.sin((counter * 0.001) % PI) * 50);

    // display decoration platforms
    image(mainMenuPlatformImg, 100 * width / 1382, (350 + Math.sin(counter * 0.001) * 80) * height / 642);
    image(mainMenuPlatformImg, 1000 * width / 1382, (320 + Math.sin(counter * 3 * 0.001) * 70) * height / 642);
    image(mainMenuPlatformImg, 500 * width / 1382, (550 + Math.sin(counter * 4 * 0.001) * 50) * height / 642);
    
    liftSeries.drawButton();            // draws the lift series button
    muteButton.drawPictureButton();     // draws the mute button 
    guidesButton.drawPictureButton();   // draws the guides button 

    // incapacitate buttons if guides page is on
    if (guidesButton.clicked == true){
        liftSeries.ghostButton = true;
        muteButton.ghostButton = true;
        guidesButton.ghostButton = true;

        displayGuidePage()
    }
    else{
        liftSeries.ghostButton = false;
        muteButton.ghostButton = false;
        guidesButton.ghostButton = false;
    }
}

// display lift series bavkground and the platforms
// pause the game if pause button is pressed
function drawLiftSeries(){
    background(80, 80, 0);

    // display the platforms
    for (let i = 0; i < hoveringPlatforms.length; i++){
        hoveringPlatforms[i].drawPlatform(hoveringPlatformImage);
    }
    for (let i = 0; i < solidPlatforms.length; i++){
        solidPlatforms[i].drawPlatform(solidPlatformImage);
    }

    // pause button
    pauseButton.drawPictureButton();
    if (pauseButton.clicked == true || keyCode == 27){ paused = true; } // set paused true, if pause button is clicked or ESC is pressed
    if (paused == true) { 
        pauseButton.ghostButton = true;
        pauseGame(0.3, 0.7, 15, [235, 52, 95, 150], [150, 100, 100]);
    }
}


// displays the images for guides page and handles the interactions with the guides page
function displayGuidePage(){

    image(guidePages[guidesPageIndex], 0, 0)

    // hitbox for left arrow
    if (0.8346452852032277 * width < mouseX && mouseX < width * 0.8803206982255793 && height * 0.9413685835724114 < mouseY && mouseY < height * 0.9880248821727224 && mouseclicked === true && guidesPageIndex != 0){
        guidesPageIndex -= 1;
    }

    // hitbox of right arrow
    if (0.8890670539107105 * width < mouseX && mouseX < width * 0.9318270150380187 && height * 0.9413685835724114 < mouseY && mouseY < height * 0.9880248821727224 && mouseclicked === true && guidesPageIndex != guidePages.length - 1){
        guidesPageIndex += 1;
    }

    // hitbox of the quit button
    if (0.9512633610049769 * width < mouseX && mouseX < width * 0.9959669567289808 && height * 0.0051321916595031825 < mouseY && mouseY < height * 0.07978226942000084 && mouseclicked === true){
        guidesButton.clicked = false;
    }
}

// set the volume 0 if muteButton.clicked == true
// set the volume 1 if muteButton.clicked == false
function mute(){
    if (muteButton.clicked == false){
        outputVolume(1);
    }
    else {
        outputVolume(0);
    }
}

// display the controls page that explaines randomised controls for duration many seconds
// then return true so that lift series game play can start
function displayControlsPage(duration){

    // if the difference of time is greater than duration seconds, end Controls Page
    if (currentTime - liftSeriesTime < duration * 1000){
        //console.log(currentTime, beginningTime, currentTime - beginningTime)
        background(255)
        return false;
    }
    return true;
}


// initialises the new gamemode
// stop all musics
// start new music according to new gamemode 
// and uphold further actions if necessary (such as platform creation)
function ifChangedGamemode(){
    if (changedGamemode == true){
        // stop music to start the new one
        mainMenuMusic.stop(); 
        liftSeriesMusic.stop();

        // initiate main menu
        if (gamemode == "Main Menu"){
            mainMenuMusic.loop();   // start the main menu music
        }

        // initiate Lift Series
        if (gamemode == "Lift Series"){
            liftSeriesTime = millis(); // get the time when lift series is activated
            liftSeriesMusic.loop();    // start the gameplay music
            createPlatform(0.2, 0.4, 0.1, 0.2, 0.2, 0.4, 0.05, 0.05); // create a new map
        }
    }
}

// change the gamemode to "Lift Series" if lift series button on main menu is clicked
function changeGamemode(){
    if (liftSeries.clicked == true){
        gamemode = "Lift Series";
        changedGamemode = true;
        liftSeries.clicked = false;
    }       
}

// displays the pause menu
// creates the buttons for the pause menu
// and defines the actions to uphold when any of these buttons are clicked
function pauseGame(rectWidth, rectHeight, cornerRadii, rectColourFill, rectColourStroke) {

    // draw the menu
    strokeWeight(4);
    stroke(rectColourStroke);
    fill(rectColourFill);
    rect(width * (1 - rectWidth) * 0.5, height * (1 - rectHeight) * 0.5, width * rectWidth, height * rectHeight, cornerRadii);
    noStroke();

    // instantiate the buttons
    let continueButton = new GameModeButtons(25, 200, 45, "Continue", 40, 'Comic Sans MS', [50, 182, 80]);
    let restartButton = new GameModeButtons(45, 160, 45, "Restart", 40, 'Comic Sans MS', [50, 122, 173]);
    let MainMenuButton = new GameModeButtons(60, 200, 100, "Return to\nMain Menu", 40, 'Comic Sans MS', [255, 102, 53]);

    // draw the buttons
    continueButton.drawButton();
    restartButton.drawButton();
    MainMenuButton.drawButton();

    // resume game
    if (continueButton.clicked == true) {
        paused = false;
        pauseButton.clicked = false;
        pauseButton.ghostButton = false;
    }

    // restart by re-initiating current game mode
    else if (restartButton.clicked == true) {
        changedGamemode = true;
        paused = false;
        pauseButton.clicked = false;
        pauseButton.ghostButton = false;
    }

    // return back to main
    else if (MainMenuButton.clicked == true) {
        changedGamemode = true;
        paused = false;
        gamemode = "Main Menu";
        pauseButton.clicked = false;
        pauseButton.ghostButton = false;
    }
}