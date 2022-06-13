class GameModeButtons {
    
    constructor(y, givenWidth, givenHeight, name, font){
        this.x = width * 0.5;
        this.y = y / 100 * height;
        this.width = givenWidth;
        this.height = givenHeight;
        this.text = name;
        this.font = font
    }

    ifHovered(){
        fill(255,0,0)
        rect(this.x - this.width*0.5, this.y, this.width, this.height);
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height){return true;}
        return false;
    }

    drawButton(){
        
        if (this.ifHovered() == true){ fill(0, 102, 153); }
        else { fill(0); }
        textAlign(CENTER, TOP);
        textSize(this.font);
        text(this.text, 0, this.y, width);
        console.log(this.isClicked())
    }

    isClicked(){
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height && mouseIsPressed == true){return true;}
        return false;
    }
}