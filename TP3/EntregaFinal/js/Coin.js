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
	constructor(div, baseClase, stateClass, delay) {
		super(div, baseClase, stateClass, delay);
        this.taked = false;
        this.value = 5;
        this.setTop();
	}
    stopAnimation() {
        this.div.style.setProperty("animation-play-state", "paused");
        
    }
    runningAnimation() {
        this.div.style.setProperty("animation-play-state", "running");
    }

    //Esto se cambiara a Math random
    setTop(){
        this.div.style.top= ((Math.random() * 60 ) +20)+ "vh";
    }

    getValue(){return this.value;}

    isTouch(bird){
        let birdData = bird.getPositionData();
        let coinData = this.getPositionData();
        //Si se esta en rango en eje X
        if (birdData.left < coinData.left + coinData.width  && birdData.left + birdData.width  > coinData.left) 
        {
            //Si se esta en rango en eje Y
            if (birdData.top < coinData.top + coinData.height && birdData.top + birdData.height > coinData.top)
            {
            //  super.removeDelay();
                this.taked = true;
                this.changeStateClass("collected");
            }
        }

    }
       
    updatePosition()
	{

        this.div.style.left = this.getPositionLeft()+ "px";
	}

    changeStateClass(stateClass){
		this.updatePosition();
		super.changeStateClass(stateClass);	
	}

        
   

} //FIN DE LA CLASE
