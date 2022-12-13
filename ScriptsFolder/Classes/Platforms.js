// ------------ HEADER COMMENT ------------

// this file declares the Platforms class
// and createPlatform() function to fill global hoveringPlatforms and solidPlatforms with Platforms objects
// so only createPlatforms in this function will be called in other files to fill the arrays with Platforms objects


// ------------ Classes ------------

// Platforms class is used to hold the x, y values and size of a platform image
// it displays the image via drawPlatform()
// and corners of the the platforms is returned when getBorders() is called
class Platforms {
    constructor(x, y, givenWidth, givenHeight){
        this.x = x;                 // x location of the platform
        this.y = y;                 // y lovation of the platform
        this.width = givenWidth;    // width of the platform
        this.height = givenHeight;  // height of the platform
    }

    // display the platform on the screen with given sizes
    drawPlatform(platformImage){
        platformImage.resize(this.width, this.height);
        image(platformImage, this.x, this.y);
    }

    // return the edge coordinates of the platform
    // this function will be used to calculate collisions
    getBorders() {
        return [this.x, this.y, this.x + this.width, this.y + this.height]
    }
}

// createPlatform() function chooses a random number of platforms between {2, 3, 4} 
// and fills the global hoveringPlatforms and solidPlatforms arrays with platform objects
function createPlatform(solidPlatformWidth0, solidPlatformWidth1, solidPlatformHeight0, solidPlatformHeight1, hoveringPlatformWidth0, hoveringPlatformWidth1, hoveringPlatformHeight0, hoveringPlatformHeight1) {
    // all the parameters are couples of 2
    // which contain the minimum and maximum length of the platform
    // with respect to width and the height of the screen

    // clear the platforms arrays
    hoveringPlatforms = [];
    solidPlatforms = [];
    // create a random integer of 2, 3 or 4
    // this variable is how many platforms there will be in the game
    numberOfPlatforms = Math.floor(Math.random() * 3) + 2;
 
    // there must be no hovering platforms if there are only 2 platforms
    // because player can accidently fall down
    if (numberOfPlatforms == 2) {
        // create a platform at the left bottom part of the map
        solidPlatforms.push(new Platforms(Math.floor(Math.random() * 0.05 * width), Math.floor(Math.random() * height * 0.2) + Math.floor(height * 0.6), Math.floor(Math.random() * width * (solidPlatformWidth1 - solidPlatformWidth0)) + width * solidPlatformWidth0, Math.floor(Math.random() * height * (solidPlatformHeight1 - solidPlatformHeight0)) + height * solidPlatformHeight0));
 
        // create a second platform with similar parameters but on the right side of the map
        solidPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.05) + width * 0.5, Math.floor(Math.random() * height * 0.2) + Math.floor(height * 0.6), Math.floor(Math.random() * width * (solidPlatformWidth1 - solidPlatformWidth0)) + width * solidPlatformWidth0, Math.floor(Math.random() * height * (solidPlatformHeight1 - solidPlatformHeight0)) + height * solidPlatformHeight0));
    }
        
    // first two platforms will be exactly same as it was in 2 platforms,
    // and 3rd platform is a hovering type close to the middle
    if (numberOfPlatforms == 3) {
        // create solid platforms at the bottom part of the map
        solidPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.05), Math.floor(Math.random() * height * 0.2) + Math.floor(height * 0.6), Math.floor(Math.random() * width * (solidPlatformWidth1 - solidPlatformWidth0)) + width * solidPlatformWidth0, Math.floor(Math.random() * height * (solidPlatformHeight1 - solidPlatformHeight0)) + height * solidPlatformHeight0));
        solidPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.05) + Math.floor(width * 0.5), Math.floor(Math.random() * height * 0.2) + Math.floor(height * 0.6), Math.floor(Math.random() * width * (solidPlatformWidth1 - solidPlatformWidth0)) + width * solidPlatformWidth0, Math.floor(Math.random() * height * (solidPlatformHeight1 - solidPlatformHeight0)) + height * solidPlatformHeight0));
 
        // create a hovering platform at the middle, upper map
        hoveringPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.2) + Math.floor(width * 0.2), Math.floor(Math.random() * height * 0.1) + Math.floor(height * 0.4), Math.floor(Math.random() * width * (hoveringPlatformWidth1 - hoveringPlatformWidth0)) + width * hoveringPlatformWidth0, Math.floor(Math.random() * height * (hoveringPlatformHeight1 - hoveringPlatformHeight0)) + height * hoveringPlatformHeight0));
    }

    // first two platforms will be exactly same as it was in 2 platforms,
    // and 2 hovering platforms will be above them much similar to solid platforms
    if (numberOfPlatforms == 4) {
        // create solid platforms at the bottom part of the map
        solidPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.05), Math.floor(Math.random() * height * 0.2) + Math.floor(height * 0.6), Math.floor(Math.random() * width * (solidPlatformWidth1 - solidPlatformWidth0)) + width * solidPlatformWidth0, Math.floor(Math.random() * height * (solidPlatformHeight1 - solidPlatformHeight0)) + height * solidPlatformHeight0));
        solidPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.05) + Math.floor(width * 0.5), Math.floor(Math.random() * height * 0.2) + Math.floor(height * 0.6), Math.floor(Math.random() * width * (solidPlatformWidth1 - solidPlatformWidth0)) + width * solidPlatformWidth0, Math.floor(Math.random() * height * (solidPlatformHeight1 - solidPlatformHeight0)) + height * solidPlatformHeight0));
 
        // create a hovering platforms at the upper map
        hoveringPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.05), Math.floor(Math.random() * height * 0.1) + Math.floor(height * 0.4), Math.floor(Math.random() * width * (hoveringPlatformWidth1 - hoveringPlatformWidth0)) + width * hoveringPlatformWidth0, Math.floor(Math.random() * height * (hoveringPlatformHeight1 - hoveringPlatformHeight0)) + height * hoveringPlatformHeight0));
        hoveringPlatforms.push(new Platforms(Math.floor(Math.random() * width * 0.05) + Math.floor(width * 0.5), Math.floor(Math.random() * height * 0.1) + Math.floor(height * 0.4), Math.floor(Math.random() * width * (hoveringPlatformWidth1 - hoveringPlatformWidth0)) + width * hoveringPlatformWidth0, Math.floor(Math.random() * height * (hoveringPlatformHeight1 - hoveringPlatformHeight0)) + height * hoveringPlatformHeight0));
    }
}