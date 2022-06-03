
var menuBackgroundImg;

function preload(){
    menuBackgroundImg = loadImage("imgs/DG.png");
}


function setup() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){document.write("Use a computer to access the application.");}
    else {cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);}
    
    menuBackgroundImg.resize(windowWidth * 0.9, windowHeight * 0.9);
}


function draw(){
    drawBackGround();
    
}