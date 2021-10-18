'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Coin extends ObjetoInteractivo {
    //Constructor de la clase, da propiedades a los objetos
	constructor(position, div,clase, delay) {
		super(position, div,clase);
		this.div.style.setProperty("animation-delay", delay + "s");
	}
    stopAnimation() {
        this.div.style.setProperty("animation-play-state", "paused");
        
    }
    runningAnimation() {
        this.div.style.setProperty("animation-play-state", "running");
    }

    isTouch(object){}


} //FIN DE LA CLASE
