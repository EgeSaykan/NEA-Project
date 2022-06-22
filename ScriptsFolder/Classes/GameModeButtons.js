class GameModeButtons {
    
    constructor(y, givenWidth, givenHeight, name, font){
        this.x = width * 0.5;
        this.y = y / 100 * height;
        this.width = givenWidth;
        this.height = givenHeight;
        this.text = name;
        this.font = font
    }

    ifHovered(centre){ 
        // if the hovering must be calculated from the centre, centre == true, 
        // if it is from top left corner, centre == false
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height && centre == true ) {return true;}
        else if (this.x < mouseX && mouseX < this.x + this.width && this.y <= mouseY && mouseY <= this.y + this.height && centre == false) {return true;}
        return false;
    }

    drawButton(){
        if (this.ifHovered(true) == true){ fill(0, 102, 153); }
        else { fill(0); }
        textAlign(CENTER, TOP);
        textSize(this.font);
        text(this.text, 0, this.y, width);
    }

    isClicked(centre){
        // if the hovering must be calculated from the centre, centre == true, 
        // if it is from top left corner, centre == false
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height && centre == true && mouseIsPressed === true) {return true;}
        else if (this.x < mouseX && mouseX < this.x + this.width && this.y <= mouseY && mouseY <= this.y + this.height && centre == false  && mouseIsPressed === true) {return true;}
        return false;
    }
}