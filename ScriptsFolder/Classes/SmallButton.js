


class SmallButtons extends GameModeButtons{
    constructor(x, y, givenWidth, givenHeight, name, font, pic1, pic2, pic3){
        super(y, givenWidth, givenHeight, name, font);
        this.restPicture = pic1;
        this.hoveredPicture = pic2;
        this.clickedPicture = pic3;
        this.clickedState = false;
        this.x = x / 100 * width;
    }

    // displays the pictures for the mute button depending on the state of the button {rest, hovered or clicked}
    drawPictureButton(){
        if (this.isClicked(false) && this.clickedState == false) {this.clickedState = true}
        else if (this.isClicked(false) && this.clickedState == true) {this.clickedState = false}
        if (this.clickedState == true) {image(this.clickedPicture, this.x, this.y);}
        else if (this.ifHovered(false)){image(this.hoveredPicture, this.x, this.y);}
        else {image(this.restPicture, this.x, this.y);}
    }
}