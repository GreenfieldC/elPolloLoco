/* code by Christian Greenfield */
'use strict';

let maximalTableSize =
	window.innerWidth <= 1024 || (window.innerHeight <= 1024 && window.innerWidth <= 768);
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

/* ===========
Start Screen
==============*/

/**
 * Starts  game
 */
function startGame() {
	setsScreen();
	initLevel1();
	init();
	mobileBtnsListener();
}

function setsScreen() {
	checkMobilePlayButtonNeeded();
	openCloseMenuToggle();
	hideWholeStartScreen();
	closeGameGuide();
}



/**
 * When the user clicks on the menu,
 * toggle the class 'showNavigationBar' on the navigation
 * container.
 */
function openCloseMenuToggle() {
	document.getElementById('menuContainer').classList.toggle('showNavigationBar');
	openMenu = !openMenu
	openMenu = !openMenu ? openMenu : !openMenu
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
	element = document.getElementById("myID")
	toggleVisibility(element)
	toggleVisibility("myID")
}

/*
/ @param string element
*/
function toggleVisibility(element) {
	if(typeof(element) == "string") {
		document.getElementById(element).classList.toggle('d-none');
		return
	}
	
	new Error("please give a string to the toggleVisibility funcction")
}

//DRY-Prinzip - Don't Repeat Yourself
// GEnerische Funktionen schreiben
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
	
	playerName = storedName ? storedName : "Player 1"
	
	playerName = storedName ?? "Player 1"
	
	soundsOn ? (soundsOn = false) : (soundsOn = true);
	
	showPlayer = hasPlayer ?? "Player1"
	if(!maximalTableSize) return 
	showMobilePlayButtons()
}

/**
 * Makes mobile play buttons visible by removeing d-none
 */
function showMobilePlayButtons() {
	['rightSidePlayButtons', 'leftSidePlayButtons'].forEach((id) => {
		document.getElementById(id).classList.remove('d-none');
	});
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
 * Creates  a setIntervall with the containing function
 * and pushes its id into intervallIds
 * @param {function} fn
 * @param {number} time
 */
function setStoppableInterval(fn, time) {
	let id = setInterval(fn, time);
	intervallIds.push(id);
}
