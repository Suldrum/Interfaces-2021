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
	constructor(div, clase, maxLow) {
		super(div, clase);
		//Limite de la zona de juego, sera la altura del body o del div donde se encuentre menos el espacio que ocupa dentro de el
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
		this.div.style.top = this.validTop() + "px";
	}

	changeClass(clase){
		this.updatePosition();
		super.changeClass(clase);	
	}
} //FIN DE LA CLASE
