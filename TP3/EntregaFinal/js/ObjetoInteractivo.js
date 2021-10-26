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
		this.setAnimationDelay(delay);
	}

    //Si el objeto entro en contacto con otro
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
        return false;
    }

    //Define/actualiza el delay de la animacion
    setAnimationDelay(delay)
    {
        this.div.style.setProperty("animation-delay", delay + "s");
    }

    //Elimina el delay de la animacion
    removeDelay(){
        this.div.style.removeProperty("animation-delay");
    }

    //Detiene la animacion
    stopAnimation() {
        this.div.style.setProperty("animation-play-state", "paused");   
    }

    //Si el objecto se fue de la pantalla
    isOutScreen(){
        let object = this.getPositionData();
        return (object.left < (0 - (object.width + 5))) ;
    }

} //FIN DE LA CLASE
