// ------------ HEADER COMMENT ------------

// this file contains all background functions such as drawing background or muting
// every function is either called in another function or it is called in script.js
// this file only declares functions but does not call them


// ------------ functions ------------

// draw main menu background 
// show and operate lift series, mute and guides buttons
function drawMainMenuBackGround(){


    // changing background colour
    background(45  + Math.sin((counter * 2 * 0.001) % PI) * 45, 64 - Math.sin((counter * 0.001) % PI) * 64, 56  + Math.sin((counter * 0.001) % PI) * 50);

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

// initiate the characters when it is Lift Series
function startGame(){

    // randomly select attack keys
    const attack1 = randomAttackKeys[Math.floor(Math.random()*4)];
    let attack2 = randomAttackKeys[Math.floor(Math.random()*4)];
    while (attack2 == attack1) {attack2 = randomAttackKeys[Math.floor(Math.random()*4)];}

    // create a new player
    playerObject = new Player(35, 80, width, height, 10, [], [], [], [], 5 + Math.random() * (5 - level), 100 - (level * 10) * Math.random(), 1, [attack1, attack2], "Left");
    playerObject.position = [75 / 600 * width, 20];

    // create a new enemy
    enemyObject = new Enemy(35, 80, width, height, 10, [], [], [], [], 10, 100, -1, "Right");
    enemyObject.position = [450 / 600 * width, 120];
}


// display lift series bavkground and the platforms
// pause the game if pause button is pressed
function drawLiftSeries(){
    background(80, 80, 0);

    // display the platforms
    for (let i = 0; i < hoveringPlatforms.length; i++){
        hoveringPlatforms[i].drawPlatform(hoveringPlatformImage);
    }
    for (let i = 0; i < solidPlatforms.length; i++){
        solidPlatforms[i].drawPlatform(solidPlatformImage);
    }

    

    // pause button
    pauseButton.drawPictureButton();
    if (pauseButton.clicked == true || keyCode == 27){ paused = true; } // set paused true, if pause button is clicked or ESC is pressed

    if (paused == false){
        // operate the player
        playerObject.drawPlayer([enemyObject.attackArray]);

        // operate the enemy
        enemyObject.drawPlayer([playerObject.attackArray]);
    }
    
    if (playerObject.position[1] > height){
        playerObject.position = [75 / 600 * width, 20];
        playerObject.acceleration = [0, 0];
        playerObject.velocity = [0, 0];
    }
    if (enemyObject.position[1] > height){
        enemyObject.position = [450 / 600 * width, 120];
        enemyObject.acceleration = [0, 0];
        enemyObject.velocity = [0, 0];
    }

    push()
    fill(255, 0, 0, 120)
    rect(playerObject.position[0], playerObject.position[1], playerObject.characterWidth, playerObject.characterHeight)
    stroke(255, 255, 255)
    fill(0, 255, 0, 120)
    rect(enemyObject.position[0], enemyObject.position[1], enemyObject.characterWidth, enemyObject.characterHeight)
    stroke(255, 255, 255)

    fill(0, 0, 0)
    for (let i = 0; i < enemyObject.attackArray.length; i++){
        let borders = enemyObject.attackArray[i].returnBorders();
        rect(borders[0], borders[1], borders[2] - borders[0], borders[3] - borders[1]);
    }

    fill(0, 255, 255)
    for (let i = 0; i < playerObject.attackArray.length; i++){
        let borders = playerObject.attackArray[i].returnBorders();
        rect(borders[0], borders[1], borders[2] - borders[0], borders[3] - borders[1]);
    }

    pop();


    // check if the health of player is 0
    // if so display Game Over and stop the game
    if (playerObject.health <= 0) {

        // display Game Over
        push();
        textSize((width * 5) / textWidth("Game Over") * 12);
        fill(125, 255, 65);
        text("Game Over", width / 2, height / 2);
        pop();

        // reset the level on new game
        level = 0;

        // Go to main menu after 3 seconds
        setTimeout(() => {
            gamemode = "Main Menu"; playerObject = undefined; enemyObject = undefined;
          }, 3000);
        
        // reset creating the player and the enemy
        callStartGameOnce = false;

    }

    // restart game with higher level
    else if (enemyObject.health <= 0) {
        level++;
        changedGamemode = true; // resart game

        // reset creating the player and the enemy
        callStartGameOnce = false;
    }

    // draw pause menu
    if (paused == true) { 
        pauseButton.ghostButton = true;
        pauseGame(0.3, 0.7, 15, [235, 52, 95, 150], [150, 100, 100]);
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
    if (0.7121562930160942 * width < mouseX && mouseX < width * 0.9653391633864645 && height * 0.01757387128625279 < mouseY && mouseY < height * 0.06425921208924065 && mouseclicked === true){
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

// display the controls page that explaines randomised controls for duration many seconds
// then return true so that lift series game play can start
function displayControlsPage(duration){

    

    // if the difference of time is greater than duration seconds, end Controls Page
    if (currentTime - liftSeriesTime < duration * 1000){
        
        background(235, 125, 120);
        if (callStartGameOnce == false) {
            // create the enemy and the player
            startGame();

            // make sure the objects are created once
            callStartGameOnce = true;
        }
        push();

        // the text to display on controls page
        const healthMessage = `Your Initial Health: ${Math.round(playerObject.health)}`;
        const damageMessage = `Your Damage Per Attack: ${Math.round(playerObject.attackDamage)}`;

        const Attack1 = `Your Projectile Attack: ${playerObject.attackKeys[0]}`;
        const Attack2 = `Your Wall Attack: ${playerObject.attackKeys[1]}`;

        const enemyHealthMessage = `Enemy's Initial Health: ${Math.round(enemyObject.health)}`;
        const enemyDamageMessage = `Enemy's Damage Per Attack: ${Math.round(enemyObject.attackDamage)}`;

        // display text for player's health
        textSize(12);
        fill(0, 255,255);
        textSize(width * 0.5 / textWidth(healthMessage) * 12);
        text(healthMessage, width * 0.02 + textWidth(healthMessage) / 2, height * 0.1);
        
        // display text for player's damage
        textSize(12);
        textSize(width * 0.5 / textWidth(damageMessage) * 12);
        text(damageMessage, width * 0.02 + textWidth(damageMessage) / 2, height * 0.3);
        
        // display text for enemy's health
        textSize(12);
        fill(125, 0,255);
        textSize(width * 0.5 / textWidth(enemyHealthMessage) * 12);
        text(enemyHealthMessage, width * 0.02 + textWidth(enemyHealthMessage) / 2, height * 0.6);
        
        // display text for enemy's attack
        textSize(12);
        textSize(width * 0.5 / textWidth(enemyDamageMessage) * 12);
        text(enemyDamageMessage, width * 0.02 + textWidth(enemyDamageMessage) / 2, height * 0.8);

        // display text for player's attack keys
        textSize(12);
        fill(0, 255,125);
        textSize(width * 0.3 / textWidth(Attack1) * 12);
        text(Attack1, width * 0.62 + textWidth(Attack1) / 2, height * 0.4);
        
        textSize(12);
        fill(0, 255,125);
        textSize(width * 0.3 / textWidth(Attack2) * 12);
        text(Attack2, width * 0.62 + textWidth(Attack2) / 2, height * 0.6);

        pop();
        return false;
    }
    
    return true;
}


// initialises the new gamemode
// stop all musics
// start new music according to new gamemode 
// and uphold further actions if necessary (such as platform creation)
function ifChangedGamemode(){
    if (changedGamemode == true){
        // stop music to start the new one
        mainMenuMusic.stop(); 
        liftSeriesMusic.stop();

        // initiate main menu
        if (gamemode == "Main Menu"){
            mainMenuMusic.loop();   // start the main menu music
        }

        // initiate Lift Series
        if (gamemode == "Lift Series"){
            liftSeriesTime = millis(); // get the time when lift series is activated
            liftSeriesMusic.loop();    // start the gameplay music
            createPlatform(0.2, 0.4, 0.1, 0.2, 0.2, 0.4, 0.05, 0.05); // create a new map
        }
    }
}

// change the gamemode to "Lift Series" if lift series button on main menu is clicked
function changeGamemode(){
    if (liftSeries.clicked == true){
        gamemode = "Lift Series";
        changedGamemode = true;
        liftSeries.clicked = false;
    }       
}

// displays the pause menu
// creates the buttons for the pause menu
// and defines the actions to uphold when any of these buttons are clicked
function pauseGame(rectWidth, rectHeight, cornerRadii, rectColourFill, rectColourStroke) {

    // draw the menu
    push();
    strokeWeight(4);
    stroke(rectColourStroke);
    fill(rectColourFill);
    rect(width * (1 - rectWidth) * 0.5, height * (1 - rectHeight) * 0.5, width * rectWidth, height * rectHeight, cornerRadii);
    noStroke();
    pop();

    // instantiate the buttons
    let continueButton = new GameModeButtons(25, 200, 45, "Continue", 40, 'Comic Sans MS', [50, 182, 80]);
    let restartButton = new GameModeButtons(45, 160, 45, "Restart", 40, 'Comic Sans MS', [50, 122, 173]);
    let MainMenuButton = new GameModeButtons(60, 200, 100, "Return to\nMain Menu", 40, 'Comic Sans MS', [255, 102, 53]);

    // draw the buttons
    continueButton.drawButton();
    restartButton.drawButton();
    MainMenuButton.drawButton();

    // resume game
    if (continueButton.clicked == true) {
        paused = false;
        pauseButton.clicked = false;
        pauseButton.ghostButton = false;
    }

    // restart by re-initiating current game mode
    else if (restartButton.clicked == true) {
        changedGamemode = true;
        paused = false;
        pauseButton.clicked = false;
        pauseButton.ghostButton = false;
        callStartGameOnce = false;
    }

    // return back to main
    else if (MainMenuButton.clicked == true) {
        changedGamemode = true;
        paused = false;
        gamemode = "Main Menu";
        pauseButton.clicked = false;
        pauseButton.ghostButton = false;
        callStartGameOnce = false;
    }
}