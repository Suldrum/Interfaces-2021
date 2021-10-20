'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Bird extends Objeto {
    //Constructor de la clase, da propiedades a los objetos
	constructor(div, baseClass, stateClass, maxLow) {
		super(div, baseClass, stateClass);
		//Limite de la zona de juego
		this.maxLow = maxLow - this.height;
	}

	//Si esta tocando tierra
	isGrounded(){
		return(this.getPositionBottom() === this.maxLow);
	}

	updatePosition()
	{
		//Porque ambas animaciones se manejan en el mismo eje
		this.div.style.top= parseInt(this.getPositionTop()) + "px";
	}

	changeStateClass(stateClass){
		this.updatePosition();
		super.changeStateClass(stateClass);	
	}
} //FIN DE LA CLASE
