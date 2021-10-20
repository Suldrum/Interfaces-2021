'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Pipe extends Objeto{
    //Constructor de la clase, da propiedades a los objetos
	constructor(div, baseClass, stateClass,delay) {
		super(div, baseClase, stateClass,delay);

		
	}
	
	isPassed(bird)
	{
		return bird.getPositionLeft() > this.getPositionRight() ;
	}

} //FIN DE LA CLASE
