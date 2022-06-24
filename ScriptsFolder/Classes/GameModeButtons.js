class GameModeButtons {
    
    constructor(y, givenWidth, givenHeight, name, font, Pcolour){
        this.x = width * 0.5;
        this.y = y / 100 * height;
        this.width = givenWidth;
        this.height = givenHeight;
        this.text = name;
        this.font = font
        this.colour = Pcolour
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
        if (this.ifHovered(true) == true){ fill(this.colour); }
        else { fill(0); }
        textAlign(CENTER, TOP);
        textSize(this.font);
        text(this.text, 0, this.y, width);
    }


    // if returns true if the user clicks on the button
    isClicked(centre){
        // if the hovering must be calculated from the centre, centre == true, 
        // if it is from top left corner, centre == false
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height && centre == true && mouseclicked === true) {return true;}
        else if (this.x < mouseX && mouseX < this.x + this.width && this.y <= mouseY && mouseY <= this.y + this.height && centre == false  && mouseclicked === true) {return true;}
        return false;
    }
}