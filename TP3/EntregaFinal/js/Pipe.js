'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Pipe extends ObjetoInteractivo{
    //Constructor de la clase, da propiedades a los objetos
	constructor(div,clase, delay) {
		super(div,clase, delay);
		
	}

    isTouch(bird){
		let birdData = bird.getPositionData();
        let pipeData = this.getPositionData();
        //Si se esta en rango en eje X
        if (birdData.right >= pipeData.left && birdData.left <= pipeData.right)
       {
           //Si se esta en rango en eje Y
           if (pipeData.top <= birdData.bottom || pipeData.bottom >= birdData.top)
            {
                return true;
            }
        }
        return false;
	}
	
	isPassed(bird)
	{
		return bird.getPositionLeft() > this.getPositionRight() ;
	}

} //FIN DE LA CLASE
