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

	//Para que no se vaya del div
	validTop()
	{
		if (this.getPositionTop() < 0)
		{
			return 0;
		}
		else
		if (this.getPositionBottom() > this.maxLow)
		{	
			return this.maxLow;
		}
		else
		{return this.getPositionTop();}
	}

	//Si esta tocando tierra
	isGrounded(){
		return(this.getPositionBottom() === this.maxLow);
	}

	updatePosition()
	{
		this.div.style.top= this.getPositionTop()+ "px";

	}

	changeStateClass(stateClass){
		this.updatePosition();
		super.changeStateClass(stateClass);	
	}
} //FIN DE LA CLASE
