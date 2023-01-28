/* code by Christian Greenfield */
'use strict';

let maximalTableSize =
	window.innerWidth <= 1024 ||
	(window.innerHeight <= 1024 && window.innerWidth <= 768);
let canvas = document.getElementById('canvas');
let world;
let keyboard;
let levelRunning = false;
let fullScreen = false;
let soundsOn = true;
let openMenu = false;
let intervallIds = [''];
let gameGuideOpen = false;

function init() {
	keyboard = new Keyboard();
	canvas;
	world = new World(canvas, keyboard);
}

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

	document.getElementById('jump').ontouchstart = (e) => {
		handleEvent(e);
		keyboard.UP = true;
	};

	document.getElementById('jump').ontouchend = (e) => {
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

function startGame() {
	checkMobilePlayButtonNeeded();
	/* closeStartGameButton(); */
	openCloseMenuToggle();
	hideWholeStartScreen();
	closeGameGuide();
	initLevel1();
	init();
	buttonListener();
	levelRunning = true;
	closeStartGameButton();
}

/**
 * When the user clicks on the menu,
 * toggle the class 'showNavigationBar' on the navigation
 * container.
 */
function openCloseMenuToggle() {
	document
		.getElementById('menuContainer')
		.classList.toggle('showNavigationBar');
	!openMenu ? (openMenu = true) : (openMenu = false);
}

function hideWholeStartScreen() {
	document.getElementById('startScreen').classList.add('d-none');
}

function closeStartGameButton() {
	if (levelRunning) {
		document.getElementById('startIcon').classList.add('d-none');
	}
}

function toggleShowFullscreenButton() {
	document.getElementById('fullscreenIcon').classList.toggle('d-none');
}

function toggleSoundButton() {
	document.getElementById('soundOnIcon').classList.toggle('d-none');
}

function closeGameGuide() {
	document.getElementById('gameGuide').classList.add('d-none');
}

/**
 * Shows play buttons for mobil devices
 */
function checkMobilePlayButtonNeeded() {
	maximalTableSize ? showMobilePlayButtons() : null;
}

function showMobilePlayButtons() {
	['rightSidePlayButtons', 'leftSidePlayButtons'].forEach((id) => {
		document.getElementById(id).classList.remove('d-none');
	});
}

/* ============
	FULLSCREEN
===============*/

/**
 * toggle fullscreen
 * @param {fullScreen} is a boolean
 */
function toggleFullScreen() {
	let fullscreenTag = document.getElementById('fullscreen');
	!fullScreen ? enterFullscreen(fullscreenTag) : exitFullscreen();
	fullScreen = !fullScreen;
}

/**
 * Maximises screen to fullscreen mode
 * @param {elment} element to be put into fullscreen mode
 */
function enterFullscreen(element) {
	if (element.requestFullscreen) element.requestFullscreen();
	// for IE11 (remove June 15, 2022)
	if (element.msRequestFullscreen) element.msRequestFullscreen();
	// iOS Safari
	if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

/**
 * Minimises fullscreen to default
 */
function exitFullscreen() {
	if (document.exitFullscreen) document.exitFullscreen();
	if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

/**
 * Opens or closes game guide
 * @param {boolean} gameGuideOpen
 */
function toggleGameGuide() {
	document.getElementById('gameGuide').classList.toggle('d-none');
	!gameGuideOpen ? (gameGuideOpen = true) : (gameGuideOpen = false);
	if (gameGuide) openCloseMenuToggle();
}

/**
 * Sound switch
 * @param {boolean} soundsOn
 */
function toggleSounds() {
	soundsOn ? (soundsOn = false) : (soundsOn = true);
	toggleSoundButton();
}

function setStoppableInterval(fn, time) {
	let id = setInterval(fn, time);
	intervallIds.push(id);
}
