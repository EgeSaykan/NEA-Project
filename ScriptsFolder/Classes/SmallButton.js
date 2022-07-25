class SmallButtons extends GameModeButtons{
    constructor(x, y, givenWidth, givenHeight, pic1, pic2, pic3){
        super(y, givenWidth, givenHeight);  // use the super function to declare all the variables in the super class 
        this.restPicture = pic1;                        // the picture displayed when the mouse is not on the button or not muted
        this.hoveredPicture = pic2;                     // the picture displayed when the mouse is on the button or not muted
        this.clickedPicture = pic3;                     // the picture displayed when mute is on
        this.x = x / 100 * width;                       // the x provided as the parameter is a percentage for where the x position will be on the canvas
    }


    // displays the pictures for the mute button depending on the state of the button
    drawPictureButton(){
        // update muteState
        if (this.isClicked(false) && muteState == false) {muteState = true}
        else if (this.isClicked(false) && muteState == true) {muteState = false}

        // displays the pictures for the mute button depending on the state of the button {rest, hovered or clicked}
        if (muteState == true) {image(this.clickedPicture, this.x, this.y);}
        else if (this.ifHovered(false)){image(this.hoveredPicture, this.x, this.y);}
        else {image(this.restPicture, this.x, this.y);}
    }
}