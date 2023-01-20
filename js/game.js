/* code by Christian Greenfield */
'use strict';

let canvas;
let world;
let keyboard;
let levelRunning = false;

function init() {
	keyboard = new Keyboard();
	canvas = document.getElementById('canvas');
	world = new World(canvas, keyboard);
}

/* 
!keyCode überarbeiten. Das ist veraltet! key! */
window.addEventListener('keydown', (event) => {
	if (event.keyCode == 37) {
		keyboard.LEFT = true;
	}

	if (event.keyCode == 38) {
		keyboard.UP = true;
	}

	if (event.keyCode == 39) {
		keyboard.RIGHT = true;
	}

	if (event.keyCode == 68) {
		keyboard.D = true;
	}
});

window.addEventListener('keyup', (event) => {
	if (event.keyCode == 37) {
		keyboard.LEFT = false;
	}

	if (event.keyCode == 38) {
		keyboard.UP = false;
	}

	if (event.keyCode == 39) {
		keyboard.RIGHT = false;
	}

	if (event.keyCode == 68) {
		keyboard.D = false;
	}
});

/* ==============================
	MOBILE NAVIGATION CHARACTER
================================*/

function buttonListener() {
	document.getElementById('right').ontouchstart = (e) => {
		handleEvent(e);
		keyboard.RIGHT = true;
	};

	document.getElementById('right').ontouchend = (e) => {
		handleEvent(e);
		keyboard.RIGHT = false;
	};

	document.getElementById('left').ontouchstart = (e) => {
		handleEvent(e);
		keyboard.LEFT = true;
	};

	document.getElementById('left').ontouchend = (e) => {
		handleEvent(e);
		keyboard.LEFT = false;
	};

	document.getElementById('jumpRightSide').ontouchstart = (e) => {
		handleEvent(e);
		keyboard.UP = true;
	};

	document.getElementById('jumpRightSide').ontouchend = (e) => {
		handleEvent(e);
		keyboard.UP = false;
	};

	document.getElementById('jumpLeftSide').ontouchstart = (e) => {
		handleEvent(e);
		keyboard.UP = true;
	};

	document.getElementById('jumpLeftSide').ontouchend = (e) => {
		handleEvent(e);
		keyboard.UP = false;
	};

	document.getElementById('throw').ontouchstart = (e) => {
		handleEvent(e);
		keyboard.D = true;
	};

	document.getElementById('throw').ontouchend = (e) => {
		handleEvent(e);
		keyboard.D = false;
	};
}

/* ===========
Start Screen
==============*/

/**
 * When the user clicks on the hamburger menu,
 * toggle the class 'showNavigationBar' on the navigation
 * container.
 */
function enableDisableSliderMenu() {
	showHideTogglePlayButtons();
	document.getElementById('menuContainer').classList.toggle('showNavigationBar');
}

async function startGame() {
	hideWholeStartScreen();
	enableDisableSliderMenu();
	showHideTogglePlayButtons();
	initLevel1();
	init();
	buttonListener();
}

function hideNavigation() {
	document.getElementById('navigationContainer').classList.add('d-none');
}

function hideWholeStartScreen() {
	document.getElementById('startScreen').classList.add('d-none');
}

/**
 * show and hide play buttons for mobile version
 */
function showHideTogglePlayButtons() {
	if (!levelRunning) {
		document.getElementById('rightSidePlayButtons').classList.toggle('showSideButtons');
		document.getElementById('leftSidePlayButtons').classList.toggle('showSideButtons');
	}
	levelRunning = true;
}

function handleEvent(e) {
	if (e.cancelable) {
		e.preventDefault();
	}
}
