

class Player{
    constructor(characterWidth, characterHeight, windowWidth, windowHeight, maxVelocity, runningAnimation, jumpingAnimation, attackAnimation, damageAnimation, attackDamage, health, direction){
        this.position = [0, 0];
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.characterHeight = characterHeight;
        this.characterWidth = characterWidth;
        this.velocity = [0, 0];
        this.maxVelocity = maxVelocity;
        this.acceleration = [0, 0];
        this.runningAnimation = runningAnimation;
        this.jumpingAnimation = jumpingAnimation;
        this.attackAnimation = attackAnimation;
        this.damageAnimation = damageAnimation;
        this.attackDamage = attackDamage;
        this.health = health;
        this.playerIsHit = false;
        this.attackKeys = ["a", "d"];
        this.direction = direction;
        this.attackArray = [];
        this.characterHasLanded = [];
        
    }

    // creates firewall and appends it to attackArray
    // rate is how much will the walls' damage will be reduced from initial settings
    // recur is how many wall pieces do you want
    appendAttack(rate, recur){

        // create a wall piece with given direction and rate of damage
        if (this.direction == 1){
            this.attackArray.push(new Attack((this.position[0] + this.characterWidth) + (1 - rate) * attackWidth * wallSeperation, this.position[1] + (this.characterHeight - attackHeight) / 2, attackWidth, attackHeight * (1.5 - rate / 2), attackDamage * rate));    // append a normal attack with less damage to attackArray with direction 1
        }
        else{
            this.attackArray.push(new Attack((this.position[0] - attackWidth) - (1 - rate) * attackWidth * wallSeperation, this.position[1] + (this.characterHeight - attackHeight) / 2, attackWidth, attackHeight * (1.5 - rate / 2), attackDamage * rate));    // append a normal attack with less damage to attackArray with direction -1
        }

        if (recur > 1){
            setTimeout(this.appendAttack(rate - 0.2, recur - 1), fireWallSpeed);
        }
    }


    // create Attack objects when an attack button is pressed
    attack() {
        // if user chose the first attack
        if (key == this.attackKeys[0] && this.attackArray.length < 1) {
            this.attacking = true;    // set attacking as true so rest of the program will know player is currently attacking
            this.attackArray.push(new ProjectileAttack(this.position[0], this.position[1] + (this.characterHeight - attackHeight) / 2, attackWidth, attackHeight, attackDamage, projectileSpeed, windowWidth, this.direction));    // append a proejctile attack to attackArray
        }
        // if user chose the second attack
        else if (key == this.attackKeys[1] && this.attackArray.length < 1) {


            this.attacking = true;    // set attacking as true so rest of the program will know player is currently attacking
            
            this.appendAttack(1, 3);  // create a wall with 3 pieces
                
        }
    }


    // decrease player's HP for given amount
    getDamage(givenDamage){
        this.health -= givenDamage;
    }


    // loops through attackArrays inputted and compares boundaries of each Attack 
    // to boundries of the player to see if there is collision
    // if so, gets damaged
    // badAttackArrays is an array of attack arrays of attacks that will affect the player
    isPlayerHit(badAttackArrays){
        for (let m = 0; m < badAttackArrays.length; m++){

            // loop through each attack
            for (let i = 0; i < badAttackArrays[m].length; i++){
                let boundries = badAttackArrays[m][i].returnBorders(); // get boundries of the Attacks
                
                let k = ((boundries[1] + (boundries[3] - boundries[1]) / 2) - (this.position[1] + this.characterHeight / 2)) / ((boundries[0] + (boundries[2] - boundries[0]) / 2) - (this.position[0] + this.characterWidth / 2));
            
                // length of line of shortest distance from middle of character to middle of attack inside the character
                let distCharacter = (this.characterHeight / this.characterWidth > Math.abs(k)) ? (this.characterWidth / 2 * Math.abs(k)) ** 2 + (this.characterWidth / 2) ** 2 : (this.characterHeight / 2 / k) ** 2 + (this.characterHeight / 2) ** 2;
                
                // length of line of shortest distance from middle of character to middle of attack inside the attack
                let distAttack = ((boundries[3] - boundries[1]) / (boundries[2] - boundries[0]) > Math.abs(k)) ? ((boundries[2] - boundries[0]) / 2 * Math.abs(k)) ** 2 + ((boundries[2] - boundries[0]) / 2) ** 2 : ((boundries[3] - boundries[1]) / 2 / k) ** 2 + ((boundries[3] - boundries[1]) / 2) ** 2;

                // check if player is in those boundries
                if (Math.sqrt(distAttack) + Math.sqrt(distCharacter) > Math.sqrt(((boundries[1] + (boundries[3] - boundries[1]) / 2) - (this.position[1] + this.characterHeight / 2))**2 + ((boundries[0] + (boundries[2] - boundries[0]) / 2) - (this.position[0] + this.characterWidth / 2))**2)) {
                    this.getDamage(badAttackArrays[m][i].damage);   // damage player
                    this.playerIsHit = true;                        // notify player is hit
                }
            }
        }
    }

    // Removes any attack that has fulfilled its lifetime
    checkAttackLifeTime() {
        // loop through each attack
        for (let i = 0; i < this.attackArray.length; i++) {
            
            // Remove Firewalls if they have existed long enough
            if (currentTime - this.attackArray[i].creationTime * 1000 > attackDuration) {
                this.attackArray.remove(i);
            }
            // Move projectiles
            // And remove them if they pass attackDistance
            else if (this.attackArray[i].creationTime > currentTime) {
                this.attackArray[i].moveAttack();
                if (this.attackArray[i].attackDistance <= 0) {
                    this.attackArray.pop(i);
                }
            }
        }
    }


    // this function moves the player as many pixels as magnitude of the velocity
    // it stops the player if the player lands on a platform
    // it is a recursive function, therefore it can be costful
    collide(gX, gY, gVelocity, gAcceleration, recured=[-1, -1]){


        // decrease the acceleration according to a constant
        if (gAcceleration[0] != 0){
            gAcceleration[0] += (gAcceleration[0] < 0) ? cooefOfFriction : -1 * cooefOfFriction;
        }
        if (gAcceleration[1] != g){
            gAcceleration[1] += (gAcceleration[1] < g) ? cooefOfFriction : -1 * cooefOfFriction;
        }
        
        // change velocity depending on the acceleration
        // do not change the velocity if it is higher than maxVelocity
        if ((gVelocity[0] + gAcceleration[0] * accel_vel_constant) ** 2 + (gVelocity[1] + gAcceleration[1] * accel_vel_constant)**2 < this.maxVelocity**2){
            //console.log(this.velocity, this.maxVelocity)
            gVelocity[0] += gAcceleration[0] * accel_vel_constant;
            gVelocity[1] += gAcceleration[1] * accel_vel_constant;
        }

        // if character has not yet landed on a platform
        if (this.characterHasLanded.length == 0){

            // loop through every hovering platform
            for (let i = 0; i < hoveringPlatforms.length; i++) {

                // get the bordeers of the platform
                let border = hoveringPlatforms[i].getBorders();
                
                // check if 
                //  the player is above the specified platform
                //  it is not reccurring for solid platforms currently
                //  the distance moved in this iteration is less than current speed
                if (recured[1] == -1 && gY + this.characterHeight <= border[1] && gX + this.characterWidth >= border[0] && gX <= border[2] && ((gY - this.position[1])**2 + (gX - this.position[0])**2) < (this.velocity[0]**2 + this.velocity[1]**2)) {
                    
                    // recur again after moving the player by one pixel
                    this.collide(gX + Math.sign(gVelocity[0]), gY + Math.sign(gVelocity[1]), gVelocity, gAcceleration, [i, -1]);
                }

                // if the player has passed the position platform or it has moved as much as the speed specifies
                else if (recured[0] == i) {

                    // change the X position to simulation position
                    this.position[0] = gX;

                    // if the player has passed the borders of the platform
                    if (gY + this.characterHeight > border[1]){
                        this.characterHasLanded = ["hoveringPlatforms", i];     // specify which platform has the player landed on
                        this.position[1] = border[1] - this.characterHeight;    // place the player on the platform
                    }

                    // if not yet reched the plaftform, set the position as simulation position
                    else{
                        this.position[1] = gY;
                    }
                    break;
                }
            }

            // if character has not yet landed on a hovering platform
            if (this.characterHasLanded.length == 0){
                
                // loop through every solid platform
                for (let i = 0; i < solidPlatforms.length; i++) {

                    // get the bordeers of the platform
                    let border = solidPlatforms[i].getBorders();

                    // check if 
                    //  the player is above the specified platform
                    //  it is not reccurring for hovering platforms currently
                    //  the distance moved in this iteration is less than current speed
                    if (recured[0] == -1 && gY + this.characterHeight <= border[1] && gX + this.characterWidth >= border[0] && gX <= border[2] && ((gY - this.position[1])**2 + (gX - this.position[0])**2) < (this.velocity[0]**2 + this.velocity[1]**2)) {
                        
                        // recur again after moving the player by one pixel
                        this.collide(gX + Math.sign(gVelocity[0]), gY + Math.sign(gVelocity[1]), gVelocity, gAcceleration, [-1, i]); 
                    }

                    // if the player has passed the position platform or it has moved as much as the speed specifies
                    else if (recured[1] == i) {

                        // change the X position to simulation position
                        this.position[0] = gX;
                        
                        // if the player has passed the borders of the platform
                        if (gY + this.characterHeight > border[1]){
                            this.position[1] = border[1] - this.characterHeight;    // place the player on the platform
                            this.characterHasLanded = ["solidPlatforms", i];        // specify which platform has the player landed on
                        }

                        // if not yet reched the plaftform, set the position as simulation position
                        else{
                            this.position[1] = gY;
                        }
                        break;
                    } 
                }
            }
        }

        // if the player is on a platform
        else {

            // declare border for future assignment
            let border;

            // if the player is on a solid platform
            // get the borders of thet platform
            if (this.characterHasLanded[0] == "solidPlatforms"){
                border = solidPlatforms[this.characterHasLanded[1]].getBorders();
            }

            // if the player is on a hovering platform
            // get the borders of thet platform
            else {
                border = hoveringPlatforms[this.characterHasLanded[1]].getBorders();
            }
            
            // if the player has gone out of the bound of the platform
            // notify that the player is no more standing on anything
            if (this.position[0] + this.characterWidth < border[0] || this.position[0] > border[2] || this.position[1] < border[1]){
                this.characterHasLanded = [];
            }

            // if player is still on a platform
            // do not let them accelerate
            else{
                this.acceleration = [this.acceleration[0], 0];
                this.velocity = [this.velocity[0], 0];
            }
        }

    }
    // change acceleration of the player depending on used input
    processInput(){


        if (key == "d") {
            this.acceleration[0] += runningConstant;
        }
        else if (key == "a") {
            this.acceleration[0] -= runningConstant;
        }
        
        // jump if standing on a solid platform
        for (let i = 0; i < hoveringPlatforms.length; i++){
            let border = hoveringPlatforms[i].getBorders();
            if (key == "w" && this.position[1] + this.characterHeight == border[1] && this.position[0] + this.characterWidth >= border[0] && this.position[0] <= border[2]) {
                this.characterHasLanded = [];
                this.acceleration[1] -= jumpingConstant;
            }
        }

        // jump if standig on a solid platform
        for (let i = 0; i < solidPlatforms.length; i++){
            let border = solidPlatforms[i].getBorders();
            if (key == "w" && this.position[1] + this.characterHeight == border[1] && this.position[0] + this.characterWidth >= border[0] && this.position[0] <= border[2]) {
                this.characterHasLanded = [];
                this.acceleration[1] -= jumpingConstant;
            }
        }

        // jump down a hovering platform if s key is pressed and player is standing on one
        if (key == "s") {
            for (let i = 0; i < hoveringPlatforms.length; i++){
                let border = hoveringPlatforms[i].getBorders();
                if (this.position[1] + height == border[1] && this.position[0] + width >= border[0] && this.position[0] <= border[0] + border[3]) {
                    this.characterHasLanded = [];
                    this.position[1] -= 3;
                }
            }
        }
    }
}


    