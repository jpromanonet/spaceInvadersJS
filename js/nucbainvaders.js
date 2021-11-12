/* 

The game class

This class represents a Space Invaders game.
Create an instance of it, change any of the default values in the settings and call 'start' to run the game.

Call 'initialise' before 'start' to set the canvas the game will draw to.

Call 'moveShip' or 'shipFare' to control the ship.

Listen for 'gameWon' or 'gameLost' event to handle the game ending.

*/

// Constants for the keyboard
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_SPACE = 32;

// Create an instance of the Game class
function Game() {

    // Set the initial config
    this.config = {
        bombRate: 0.05,
        bombMinVelocity: 50,
        bombMaxVelocity: 50,
        invaderInitialVelocity: 25,
        invaderAcceleration: 0,
        invaderDropDistance: 20,
        rocketVelocity: 120,
        rocketMaxFire: 2,
        gameWidth: 400,
        gameHeight: 300,
        fps: 50,
        debugMode: false,
        invaderRanks: 5,
        invaderFiles: 10,
        shipSpeed: 120,
        levelDifficultyMultiplier: 0.2,
        pointsPerInvader: 5,
        limitLevelIncrease: 25,
    };

    // All state is in the variable below.
    this.lives = 3;
    this.width = 0;
    this.height = 0;
    this.gameBounds = {left: 0, top: 0, right: 0, bottom: 0};
    this.inveralId = 0;
    this.score = 0;
    this.level = 1;

    // The state stack
    this.stateStack = [];

    // Input/Output
    this.pressedKey = {};
    this.gameCanvas = null;

    // All sounds
    this.sounds = null;

    // The previous X position, used for touch
    this.previousX = 0;
}

// Initialise the Game with a canvas
Game.prototype.initialise = function(gameCanvas) {

    // Set the game canvas
    this.gameCanvas = gameCanvas;

    // Set the game width and height
    this.width = gameCanvas.width;
    this.height = gameCanvas.height;
    
    // Set the state game bounds.
    this.gameBounds = {
        left: gameCanvas.width / 2 - this.config.gameWidth / 2,
        right: gameCanvas.width / 2 + this.config.gameWidth / 2,
        top: gameCanvas.height / 2 - this.config.gameHeight / 2,
        bottom: gameCanvas.height / 2 + this.config.gameHeight / 2,
    };
};

Game.prototype.moveToState = function(state) {
    
    // If we are in a state, leave it.
    if(this.currentState() && this.currentState().leave) {
        this.currentState().leave(game);
        this.stateStack.pop();
    }

    // If theres's an enter function for the new state, call it
    if(state.enter){
        state.enter(game);
    }

    // Set the current game
    this.stateStack.pop();
    this.stateStack.push(state);
};

// Start the game
Game.prototype.start = function() {

    // Move into the 'welcome' state
    this.moveToState(new WelcomeState());

    // Set the game variables.
    this.lives = 3;
    this.config.debugMode = /debug=true/.test(window.location.href);

    // Set the current state.
    var game = this;
    this.intervalId = setInterval(function () { GameLoop(game);}, 1000 / this.config.fps);

};

// Returns the current state
Game.prototype.currentState = function() {
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length -1] : null;
}

// Mutes or unmute the game
Game.prototype.mute = function(mute) {

    // If we've been told to mute, mute.
    if(mute === true) {
        this.sounds.mute = true;
    } else if(mute === false) {
        this.sounds.mute = false;
    } else {
        // Toggle mute instead
        this.sounds.mute = this.sounds.mute ? false : true;
    }
}

// The main loop
function GameLoop(game) {
    
}