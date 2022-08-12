function drawMainMenuBackGround(){


    // changing background colour
    background(45  + Math.sin(counter * 2 * 0.001) * 45, 64 - Math.sin(counter * 0.001) * 64, 56  + Math.sin(counter * 0.001) * 50);

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

function ifChangedGamemode(){
    if (changedGamemode == true){
        if (gamemode == "Main Menu"){
            mainMenuMusic.loop();
        }
        else {
            mainMenuMusic.stop();
        }

    }
}