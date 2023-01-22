/* code by Christian Greenfield */
'use strict';

let canvas = document.getElementById('canvas');
let world;
let keyboard;
let levelRunning = false;
let fullScreen = false;
let openMenu = false;
let hiddenLegends = true;

function init() {
	keyboard = new Keyboard();
	canvas;
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

/**
 * If the event is cancelable, prevent the default action.
 * @param {e} - The event object.
 */
function handleEvent(e) {
	if (e.cancelable) {
		e.preventDefault();
	}
}

/* ===========
Start Screen
==============*/

/**
 * When the user clicks on the hamburger menu,
 * toggle the class 'showNavigationBar' on the navigation
 * container.
 */
function openCloseMenuToggle() {
	document.getElementById('menuContainer').classList.toggle('showNavigationBar');
	!openMenu ? (openMenu = true) : (openMenu = false);
}

async function startGame() {
	showHideTogglePlayButtons();
	/* levelRunning = true; */
	/* toggleShowHideStartGameButton(); */
	openCloseMenuToggle();
	hideShowKeyLegendsToggle();
	keyLegendsDefault();

	hideWholeStartScreen();
	initLevel1();
	init();
	buttonListener();
	levelRunning = true;
	toggleShowHideStartGameButton();
}

function hideNavigation() {
	document.getElementById('navigationContainer').classList.add('d-none');
}

function hideWholeStartScreen() {
	document.getElementById('startScreen').classList.add('d-none');
}

function toggleShowHideStartGameButton() {
	if (levelRunning) {
		document.getElementById('startIcon').classList.add('d-none');
	}
}

/**
 * show and hide play buttons for mobile version
 */
function showHideTogglePlayButtons() {
	if (!levelRunning && openMenu && !hiddenLegends) return;
	if (!levelRunning /* || (!hiddenLegends && openMenu && !levelRunning) */) {
		document
			.getElementById('rightSidePlayButtons')
			.classList.toggle('showSideButtons');
		document
			.getElementById('leftSidePlayButtons')
			.classList.toggle('showSideButtons');
	}

	if (openMenu && levelRunning) hideShowKeyLegendsToggle();
}

function toggleFullScreen() {
	let fullscreen = document.getElementById('fullscreen');
	enterFullscreen(fullscreen);
}

function keyLegendsDefault() {
	!hiddenLegends && openMenu && levelRunning
		? hideShowKeyLegendsToggle()
		: (hiddenLegends = true);
}

/* Fullscrenn */

function enterFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		// for IE11 (remove June 15, 2022)
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		// iOS Safari
		element.webkitRequestFullscreen();
	}
}

/* noch nicht in toggleFullScreen */
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

function hideShowKeyLegendsToggle() {
	let legends = document.getElementsByTagName('span');
	Array.from(legends).forEach((span) => {
		span.classList.toggle('d-none');
		hiddenLegends = !hiddenLegends;
	});
}
