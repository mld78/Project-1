console.log('Connected to this site')

//canvas stuff
var canvas = document.getElementById('gameBackground')
var gameBoard = canvas.getContext('2d')
canvas.width = canvas.scrollWidth
canvas.height = canvas.scrollHeight

//Scrolling BACKGROUND set up
var images = new function() {

	this.background = new Image()
	this.background.src = "assets/Background-image.jpg";

}
    //Overarching draw function for all objects
function Drawable() {
	this.init = function(x, y) {

		this.x = x
		this.y = y
	}
	this.speed = 0
	this.canvasWidth = 0
	this.canvasHeight = 0

	this.draw = function() {
	}
}
    //drawing background set up

function Background() {
	this.speed = 1

	this.draw = function() {

		this.x += this.speed
		this.context.drawImage(images.background, this.x, this.y)

		this.context.drawImage(images.background, this.x - this.canvasWidth, this.y )

		if (this.x >= this.canvasWidht)
			this.x = 0
	}
}

Background.prototype = new Drawable()


//Draw the background

function Game() {
	/*
	 * Gets canvas information and context and sets up all game
	 * objects.
	 * Returns true if the canvas is supported and false if it
	 * is not. This is to stop the animation script from constantly
	 * running on older browsers.
	 */
	this.init = function() {
		// Get the canvas element
		this.backGCanvas = document.getElementById('gameBackground');
		// Test to see if canvas is supported
		if (this.backGCanvas.getContext) {
			this.backGContext = this.backGCanvas.getContext('2d');
			// Initialize objects to contain their context and canvas
			// information
			Background.prototype.context = this.backGContext;
			Background.prototype.canvasWidth = this.backGCanvas.width;
			Background.prototype.canvasHeight = this.backGCanvas.height;
			// Initialize the background object
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0
			return true;
		} else {
			return false;
		}
	};
	// Start the animation loop
	this.start = function() {
		animate();
	};
}
































// var Rick = function(x, y) {
//     this.x = x;
//     this.y = y;
//     img: getImage("assets/Ship.png")
// }
//
// Rick.prototype.draw = function() {
//     fill(255, 0, 0)
//     this.y = constrain(this.y, 0, height-50)
//     image(this.img, this.x, this.y, 40, 40)
// }
//
// Rick.prototype.up = function() {
//     $('#ship').src = ("assets/Ship.png")
//     this.y -= 5
// }
//
// Rick.prototype.down = function() {
//     $('#ship').src = ("assets/Ship.png")
//     this.y += 5
// }
//
// var ship = new Rick(10, 300)
//
// draw = function() {
//     background(255, 255, 255)
//     if (keyIsPressed && keyCode === 0) {
//         ship.up()
//     } else {
//         ship.down()
//     }
//     ship.draw()
// }
