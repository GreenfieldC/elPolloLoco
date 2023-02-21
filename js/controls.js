/* =========
     KEYBOARD
==========*/
 
let keys = [
	{name: "keyup", type: true},
	{name: "keydown", type: false},
]

keys.forEach((item) => {
	window.addEventListener(item.name, (event) => {
		switch(event.keycode) {
			case 37:
				keyboard.LEFT = item.type;
				break
			case 38:
				keyboard.UP = item.type;
				break
			case 39:
				keyboard.RIGHT = item.type;
				break
			case 68:
				keyboard.D = item.type;
				break;
		}
	});

});


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
	switch(event.keycode) {
		case 37:
			keyboard.LEFT = false;
			break
		case 38:
			keyboard.UP = false;
			break
		case 39:
			keyboard.RIGHT = false;
			break
		case 68:
			keyboard.D = false;
			break;
	}
});

/* ==============================
	MOBILE NAVIGATION CHARACTER
================================*/



function mobileBtnsListener() {
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
