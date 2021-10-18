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

	changeClass(clase){
		console.log(this.getPositionTop());
		this.updatePosition();
		super.changeClass(clase);	
	}
} //FIN DE LA CLASE
