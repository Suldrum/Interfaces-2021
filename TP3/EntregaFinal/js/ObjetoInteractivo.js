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
        this.touched = false;
		this.setAnimationDelay(delay);
	}

    isTouch(object){
        
        let objectData = object.getPositionData();
        let thisData = this.getPositionData();
        //Si se esta en rango en eje X
        if (objectData.left < thisData.left + thisData.width  && objectData.left + objectData.width  > thisData.left) 
        {
            //Si se esta en rango en eje Y
            if (objectData.top < thisData.top + thisData.height && objectData.top + objectData.height > thisData.top)
            {
                return true;
            }
        }
        this.playAnimation();
        return false;
    }

    setAnimationDelay(delay)
    {
        this.div.style.setProperty("animation-delay", delay + "s");
    }
    stopAnimation() {
        this.div.style.setProperty("animation-play-state", "paused");
        
    }
    playAnimation() {
        this.div.style.setProperty("animation-play-state", "running");
    }

    resetAnimation(){
        this.div.style.setProperty("animation-play-state", "initial");
    }
    removeDelay(){
        this.div.style.removeProperty("animation-delay");
    }



    resetObject()
    {

    }


} //FIN DE LA CLASE
