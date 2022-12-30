/* code by Christian Greenfield */
'use strict';

let canvas;
let world;
let keyboard;

function init() {
	keyboard = new Keyboard();
	canvas = document.getElementById('canvas');
	world = new World(canvas, keyboard);
}

window.addEventListener('keydown', event => {
	if (event.keyCode == 37) {
		keyboard.LEFT = true;
	}

	if (event.keyCode == 38) {
		keyboard.UP = true;
	}

	if (event.keyCode == 39) {
		keyboard.RIGHT = true;
	}

	if (event.keyCode == 40) {
		keyboard.DOWN = true;
	}

	if (event.keyCode == 32) {
		keyboard.SPACE = true;
	}
	/* console.log(event); */
});

window.addEventListener('keyup', event => {
	if (event.keyCode == 37) {
		keyboard.LEFT = false;
	}

	if (event.keyCode == 38) {
		keyboard.UP = false;
	}

	if (event.keyCode == 39) {
		keyboard.RIGHT = false;
	}

	if (event.keyCode == 40) {
		keyboard.DOWN = false;
	}

	if (event.keyCode == 32) {
		keyboard.SPACE = false;
	}
	/* console.log(event); */
});
