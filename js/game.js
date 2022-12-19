/* code by Christian Greenfield */
'use strict';

let canvas;
let world;

function init() {
	canvas = document.getElementById('canvas');
	world = new World(canvas);
}
