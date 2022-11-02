class Attack{

    constructor(x, y, width, height, damage){
        this.x = x;                         // x position of the attack
        this.y = y;                         // x position of the attack
        this.width = width;                 // width of the attacks
        this.height = height;               // height of the attacks
        this.damage = damage;               // damage of the attacks
        this.duration = attackDuration;     // duration of the attack in seconds
        this.creationTime = currentTime;    // when is this attack created
        
    }

    // returns borders of the attack
    // [left, top, right, bottom]
    returnBorders(){
        return [this.x, this.y, this.x + this.width, this.y + this.height];
    }

}

class ProjectileAttack extends Attack {
    constructor(x, y, width, height, damage, attackSpeed, attackDistance, direction){
        super(x, y, width, height, damage);     // use the super function to declare all the variables in the super class 
        this.attackSpeed = attackSpeed;         // how fast does the attack travel
        this.attackDistance = attackDistance;   // how far will the attack travel
        this.direction = direction;             // which direction is the attack moving towards
        this.creationTime = Infinity;           // projectile attack doesn't need time
    }

    // moves attack in given speed in given direction
    moveAttack(){
        this.x += this.attackSpeed * this.direction;    // move the attack
        this.attackDistance -= this.attackSpeed;        // reduce lifetime of attack
    }
}