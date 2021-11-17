//  Create the starfield.
var container = document.getElementById("starfield");
var starfield = new Starfield();
starfield.initialise(container);
starfield.start();

//  Setup the canvas.
var canvas = document.getElementById("gameCanvas");
canvas.width = 800;
canvas.height = 600;

//  Create the game.
var game = new Game();

//  Initialise it with the game canvas.
game.initialise(canvas);

//  Start the game.
game.start();

//  Listen for keyboard events.
window.addEventListener("keydown", function keydown(e) {
  var keycode = e.which || window.event.keycode;
  //  Supress further processing of left/right/space (37/29/32)
  if (keycode == 37 || keycode == 39 || keycode == 32) {
    e.preventDefault();
  }
  game.keyDown(keycode);
});
window.addEventListener("keyup", function keydown(e) {
  var keycode = e.which || window.event.keycode;
  game.keyUp(keycode);
});

window.addEventListener(
  "touchstart",
  function (e) {
    game.touchstart(e);
  },
  false
);

window.addEventListener(
  "touchend",
  function (e) {
    game.touchend(e);
  },
  false
);

window.addEventListener(
  "touchmove",
  function (e) {
    game.touchmove(e);
  },
  false
);

function toggleMute() {
  game.mute();
  document.getElementById("muteLink").innerText = game.sounds.mute
    ? "unmute"
    : "mute";
}
