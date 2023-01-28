'use strict';
class Sounds {
	walking_sound = new Audio('./audio/walking_sound.mp3');
	ouch_sound = new Audio('./audio/ouch_sound.mp3');
	smashing_bottle_sound = new Audio('./audio/smashing_bottle_sound.mp3');
	collect_sound = new Audio('./audio/collect_sound.mp3');

	setVolume() {
		this.walking_sound.volume = 0.1;
		this.ouch_sound.volume = 0.1;
		this.smashing_bottle_sound.volume = 0.1;
		this.collect_sound.volume = 0.1;
	}

	muteSounds() {
		this.walking_sound.volume = 0.0;
		this.ouch_sound.volume = 0.0;
		this.smashing_bottle_sound.volume = 0.0;
		this.collect_sound.volume = 0.0;
	}

	/**
	 * Switches for the sounds of the game
	 * @param {boolean} sounds is true or false;
	 */
	checkSetSounds() {
		soundsOn ? this.setVolume() : this.muteSounds();
	}
}
