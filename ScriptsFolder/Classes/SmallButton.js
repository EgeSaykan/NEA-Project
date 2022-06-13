


class SmallButtons extends GameModeButtons{
    constructor(x, y, givenWidth, givenHeight, name, font, pic1, pic2){
        super(y, givenWidth, givenHeight, name, font);
        this.restPicture = pic1;
        this.hoveredPicture = pic2;
    }

    drawPictureButton(){

    }
}