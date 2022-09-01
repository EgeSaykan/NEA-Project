class GameModeButtons {
    
    constructor(y, givenWidth, givenHeight, name, fontSize, fontFamily, Pcolour){
        this.x = width * 0.5;           // x position of the button
        this.y = y / 100 * height;      // the y provided as the parameter is a percentage for where the y position will be on the canvas
        this.width = givenWidth;        // width of the hitbox
        this.height = givenHeight;      // height of the hitbox
        this.text = name;               // the text to display
        this.fontSize = fontSize        // font size of the text
        this.fontFamily = fontFamily;   // font family of the text
        this.colour = Pcolour           // colour of the text
        this.clicked = false            // keeps a track of if the button has been clicked or not
        this.ghostButton = false        // ignore button properties and just display it if true
    }

    // returns true if the mouse is over the button
    ifHovered(centre){ 
        // if the hovering must be calculated from the centre, centre == true, 
        // if it is from top left corner, centre == false
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height && centre == true ) {return true;}
        else if (this.x < mouseX && mouseX < this.x + this.width && this.y <= mouseY && mouseY <= this.y + this.height && centre == false) {return true;}
        return false;
    }

    // displays the text of the button for given colour
    drawButton(){
        textFont(this.fontFamily);
        if (this.ifHovered(true) == true && this.ghostButton == false){ fill(this.colour); }
        else { fill(0); }
        textAlign(CENTER, TOP);
        textSize(this.fontSize);
        text(this.text, 0, this.y, width);
        if (this.isClicked(true) == true) { this.clicked = true; }
    }


    // returns true if the user clicks on the button
    isClicked(centre){
        // if the hovering must be calculated from the centre, centre == true, 
        // if it is from top left corner, centre == false
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height && centre == true && mouseclicked === true) {return true;}
        else if (this.x < mouseX && mouseX < this.x + this.width && this.y <= mouseY && mouseY <= this.y + this.height && centre == false && mouseclicked === true) {return true;}
        return false;
    }
}