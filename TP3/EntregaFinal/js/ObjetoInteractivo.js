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
	constructor(div, baseClase, stateClass, delay) {
		super(div, baseClase, stateClass);
	//	this.div.style.setProperty("animation-delay", delay + "s");
	}
    stopAnimation() {
        this.div.style.setProperty("animation-play-state", "paused");
        
    }
    runningAnimation() {
        this.div.style.setProperty("animation-play-state", "running");
    }

    removeDelay(){
        this.div.style.removeProperty("animation-delay");
    }
    //Si el objeto se fue de la pantalla
    isOutScreen(){
        let object = this.getPositionData();
        return (
            object.top >= 0 &&
            object.left >= 0 &&
            object.bottom <= ( $(window).height()) && 
            object.right <= ($(window).width())
        );
    }

    isTouch(bird){}




} //FIN DE LA CLASE
