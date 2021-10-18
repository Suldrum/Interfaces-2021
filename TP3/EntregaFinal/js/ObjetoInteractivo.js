'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class ObjetoInteractivo extends Objeto {
    //Constructor de la clase, da propiedades a los objetos
	constructor(div,clase, delay) {
		super(div,clase);
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
