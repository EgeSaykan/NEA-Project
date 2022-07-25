function drawMainMenuBackGround(){
    background(menuBackgroundImg);

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

// displayes the images for guides page and handles the interactions with the guides page
function displayGuidePage(){

    image(guidePages[guidesPageIndex], 0, 0)

    // hitbox for left arrow
    if (0.8346452852032277 * width < mouseX && mouseX < width * 0.8803206982255793 && height * 0.9413685835724114 < mouseY && mouseY < height * 0.9880248821727224 && mouseclicked === true && guidesPageIndex != 0){
        guidesPageIndex -= 1;
    }
    if (0.8890670539107105 * width < mouseX && mouseX < width * 0.9318270150380187 && height * 0.9413685835724114 < mouseY && mouseY < height * 0.9880248821727224 && mouseclicked === true && guidesPageIndex != guidePages.length - 1){
        guidesPageIndex += 1;
    }
    if (0.9512633610049769 * width < mouseX && mouseX < width * 0.9959669567289808 && height * 0.0051321916595031825 < mouseY && mouseY < height * 0.07978226942000084 && mouseclicked === true){
        guidesButton.clicked = false;
    }
}