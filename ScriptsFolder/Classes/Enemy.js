// this file defines a class enemy that is an extension of player class
// the enemy acts as a player object that fighst against the user
// it simply have the same abilities as a player
// but it moves on its own


class Enemy extends Player {

    constructor (characterWidth, characterHeight, windowWidth, windowHeight, maxVelocity, runningAnimation, jumpingAnimation, attackAnimation, damageAnimation, attackDamage, health, direction, startDirection) {
        super(characterWidth, characterHeight, windowWidth, windowHeight, maxVelocity, runningAnimation, jumpingAnimation, attackAnimation, damageAnimation, attackDamage, health, direction, ["şıç1", "şıç2"], startDirection)
    }

    // decide movement of enemy
    processInput() {

        // get the player object
        let player = playerObject;

        // move to left it health is above 50 and player is on the right
        if (this.health > 50 && player.position[0] - 2 * this.characterWidth > this.position[0]){
            this.acceleration[0] += runningConstant;
        }

        // move to left it health is above 50 and player is on the left
        else if (this.health > 50 && player.position[0] + 2 * this.characterWidth < this.position[0]){
            this.acceleration[0] -= runningConstant;
        }

        // jump if player is above enemy
        for (let i = 0; i < hoveringPlatforms.length; i++){
            let border = hoveringPlatforms[i].getBorders();
            if (this.position[0] + this.characterHeight > player.position && this.position[1] + this.characterHeight == border[1] && this.position[0] + this.characterWidth >= border[0] && this.position[0] <= border[2]) {
                this.characterHasLanded = [];
                this.acceleration[1] -= jumpingConstant;
            }
        }

        // jump if player is above enemy
        for (let i = 0; i < solidPlatforms.length; i++){
            let border = solidPlatforms[i].getBorders();
            if (this.position[0] + this.characterHeight > player.position && this.position[1] + this.characterHeight == border[1] && this.position[0] + this.characterWidth >= border[0] && this.position[0] <= border[2]) {
                this.characterHasLanded = [];
                this.acceleration[1] -= jumpingConstant;
            }
        }

        if (Math.abs(player.position[0] - this.position[0]) > attackWidth * 1.5 && this.attackArray.length < 1) {
            this.attacking = true;    // set attacking as true so rest of the program will know player is currently attacking
            this.attackArray.push(new ProjectileAttack(this.position[0], this.position[1] + (this.characterHeight - attackHeight) / 2, attackWidth, attackHeight, attackDamage, projectileSpeed, windowWidth, this.direction));    // append a proejctile attack to attackArray
        }

        else if (key == this.attackKeys[1] && this.attackArray.length < 1) {

            this.attacking = true;    // set attacking as true so rest of the program will know player is currently attacking
            
            this.appendAttack(1, 3);  // create a wall with 3 pieces
                
        }

    }

}